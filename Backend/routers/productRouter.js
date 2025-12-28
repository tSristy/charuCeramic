const express = require('express');
const db = require('../dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT A.id, A.name, A.model_number, A.SKU, A.size, A.color, A.brand_name, B.image_url, C.name AS cat_name FROM products AS A INNER JOIN product_images AS B ON A.id = B.product_id INNER JOIN category_details AS C On C.id = A.category_id WHERE A.is_active = 1 GROUP BY B.product_id LIMIT 10 OFFSET ${(pageNo - 1) * 10};
	    SELECT COUNT(*) AS totalRows FROM products WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching blog items:', err);
            return res.status(500).json({ error: 'Failed to fetch blog items' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
	const itemId = req.params.id;
	const sql = `SELECT A.*, B.id AS cID, B.name AS cName, B.slug FROM products AS A INNER JOIN category_details AS B ON A.category_id = B.id WHERE A.is_active = 1 AND A.id = ?;SELECT * FROM product_images WHERE is_active = 1 AND product_id = ?;`;
	db.query(sql, [itemId,itemId], (err, result) => {
		if (err) {
			console.error('Error fetching blog item:', err);
			return res.status(500).json({ error: 'Failed to fetch blog item' });
		}
		res.json({
            product:{
            id: result[0][0].id,
            name: result[0][0].name,
            model_number: result[0][0].model_number,
            SKU: result[0][0].SKU,
            size: result[0][0].size,
            color: result[0][0].color,
            brand_name: result[0][0].brand_name,
            category:{
                cID: result[0][0].cID,
                cName: result[0][0].cName,
                slug: result[0][0].slug
            }
            }, images: result[1]});
	});
});



//-------------------------- Add a new product with multiple images ---------------------------------
router.post('/add', upload.array('images', 10), (req, res) => {
    const { category_id, name, description, model_number, SKU, size, color, brand_name, sequences } = req.body;
    
    // Insert product details
    const productSql = 'INSERT INTO products (category_id, name, description, model_number, SKU, size, color, brand_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(productSql, [category_id, name, description, model_number, SKU, size, color, brand_name], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Failed to add product' });
        }
        
        const productId = result.insertId;
        
        // Handle multiple images
        if (req.files && req.files.length > 0) {
            const sequencesArray = Array.isArray(sort_order) ? sort_order : [sort_order];
            let completed = 0;
            let hasError = false;
            
            req.files.forEach((file, index) => {
                const image_url = `images/${file.filename}`;
                const sort_order = sequencesArray[index] || index + 1;
                
                const imageSql = 'INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)';
                
                db.query(imageSql, [productId, image_url, name, sort_order], (err) => {
                    if (err) {
                        console.error('Error adding product image:', err);
                        hasError = true;
                    }
                    
                    completed++;
                    if (completed === req.files.length) {
                        if (hasError) {
                            return res.status(500).json({ error: 'Product added but some images failed to upload' });
                        }
                        res.json({ message: 'Product and images added successfully', productId: productId });
                    }
                });
            });
        } else {
            res.json({ message: 'Product added successfully (no images)', productId: productId });
        }
    });
});



//-------------------------- Update product with multiple images ---------------------------------
router.put('/update/:id', upload.array('images', 10), (req, res) => {
    const productId = req.params.id;
    const { category_id, name, description, model_number, SKU, size, color, brand_name, sort_order, existing_images, existing_sort_order, delValues } = req.body;
    
    
    const delValuesArr = Array.isArray(delValues) ? delValues : [delValues];
    if(delValuesArr.length !== 0 ){
        delValuesArr.map((id)=>
        db.query(`UPDATE product_images SET is_active = 0 WHERE id =?`,[id],(err,result)=>{
            return;
        }))
    }

    // Update product details
    const productSql = 'UPDATE products SET category_id = ?, name = ?, description = ?, model_number = ?, SKU = ?, size = ?, color = ?, brand_name = ?, modified_at = NOW() WHERE id = ?';
    
    db.query(productSql, [category_id, name, description, model_number, SKU, size, color, brand_name, productId], (err) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
        }
        
        let imageOperationsCompleted = 0;
        let imageOperationsTotal = 0;
        let hasImageError = false;
        
        // Handle existing images (update sort_order only)
        if (existing_images) {
            const existingImagesArray = Array.isArray(existing_images) ? existing_images : [existing_images];
            const existingSequencesArray = Array.isArray(existing_sort_order) ? existing_sort_order : [existing_sort_order];
            
            imageOperationsTotal += existingImagesArray.length;
            
            existingImagesArray.forEach((image_url, index) => {
                const sort_order = existing_sort_order[index] || index + 1;
                
                const updateImageSql = 'UPDATE product_images SET sort_order = ? WHERE product_id = ? AND image_url = ?';
                
                db.query(updateImageSql, [sort_order, productId, image_url], (err) => {
                    if (err) {
                        console.error('Error updating image sort order:', err);
                        hasImageError = true;
                    }
                    
                    imageOperationsCompleted++;
                    checkCompletion();
                });
            });
        }
        
        // Handle new images
        if (req.files && req.files.length > 0) {
            const sequencesArray = Array.isArray(sort_order) ? sort_order : [sort_order];
            
            imageOperationsTotal += req.files.length;
            
            req.files.forEach((file, index) => {
                const image_url = `images/${file.filename}`;
                const sort_order = sequencesArray[index] || index + 1;
                
                const insertImageSql = 'INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)';
                
                db.query(insertImageSql, [productId, image_url, name, sort_order], (err) => {
                    if (err) {
                        console.error('Error adding new product image:', err);
                        hasImageError = true;
                    }
                    
                    imageOperationsCompleted++;
                    checkCompletion();
                });
            });
        }
        
        // Check if all image operations are complete
        function checkCompletion() {
            if (imageOperationsCompleted === imageOperationsTotal) {
                if (hasImageError) {
                    return res.status(500).json({ error: 'Product updated but some images failed to process' });
                }
                res.json({ message: 'Product and images updated successfully' });
            }
        }
        
        // If no images to process, send success response immediately
        if (imageOperationsTotal === 0) {
            res.json({ message: 'Product updated successfully (no images)' });
        }
    });
});




//-------------------------- Delete product ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE products SET is_active = 0 WHERE id = ?; UPDATE product_images SET is_active = 0 WHERE product_id = ?';
    db.query(sql, [itemId, itemId], (err, result) => {
        if (err) {
            console.error('Error deleting product item:', err);
            res.status(500).json({ error: 'Failed to delete product item' });
            return;
        }
        res.json({ message: 'Product item deleted successfully' });
    });
});


module.exports = router;