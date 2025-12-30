const express = require('express');
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT A.id, A.name, A.model_number, A.SKU, A.brand_name, B.image_url, C.name AS cat_name FROM products AS A INNER JOIN product_images AS B ON A.id = B.product_id AND A.single_image = B.sort_order INNER JOIN category_details AS C On C.id = A.category_id WHERE A.is_active = 1 AND B.is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
	    SELECT COUNT(*) AS totalRows FROM products WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching blog items:', err);
            return res.status(500).json({ error: 'Failed to fetch blog items' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});


router.post('/list-by-cat', (req, res) => {
    const { pageNo, category, searchVar } = req.body;
    const pageSize = 12;
    const offset = (pageNo - 1) * pageSize;

    let filterSql = "";
    let params = [];

    if (category && category.trim() !== '') {
        filterSql += ` AND (C.slug = ? OR C.parent_id = (SELECT id FROM category_details WHERE slug = ? LIMIT 1)) `;
        params.push(category, category);
    }

    if (searchVar && searchVar.trim() !== '') {
        const searchTerm = `%${searchVar}%`;
        filterSql += ` AND (P.name LIKE ? OR P.model_number LIKE ? OR C.name LIKE ?) `;
        params.push(searchTerm, searchTerm, searchTerm);
    }

    const sql = `SELECT P.id, P.name, P.model_number, P.SKU, P.url_path,
               C.name AS category_name, C.slug AS category_slug, 
               I.image_url, I.alt_text 
        FROM products AS P 
        INNER JOIN product_images AS I ON P.id = I.product_id AND P.single_image = I.sort_order 
        INNER JOIN category_details AS C ON P.category_id = C.id 
        WHERE P.is_active = 1 AND I.is_active = 1 ${filterSql}
        ORDER BY P.id DESC
        LIMIT ? OFFSET ?;
        
        SELECT COUNT(*) AS totalRows 
        FROM products AS P
        INNER JOIN category_details AS C ON P.category_id = C.id
        WHERE P.is_active = 1 ${filterSql};
    `;

    const finalParams = [...params, pageSize, offset, ...params];

    db.query(sql, finalParams, (err, results) => {
        if (err) {
            console.error('Error fetching search items:', err);
            return res.status(500).json({ error: 'Failed to fetch items' });
        }

        res.json({
            items: results[0],
            totalRows: results[1][0].totalRows,
            pageNo: pageNo
        });
    });
});


const getDataFunc = (itemId, res) => {
    const sql = `SELECT A.*, B.id AS cID, B.name AS cName, B.slug FROM products AS A INNER JOIN category_details AS B ON A.category_id = B.id WHERE A.is_active = 1 AND A.id = ?;SELECT * FROM product_images WHERE is_active = 1 AND product_id = ?;SELECT A.id AS spec_id, A.spec_label, A.spec_value, T.feature_image FROM  product_spec AS A LEFT JOIN technology AS T ON A.spec_value = T.name WHERE A.product_id =? AND A.is_active = 1`;
    db.query(sql, [itemId, itemId, itemId], (err, result) => {
        if (err) {
            console.error('Error fetching blog item:', err);
            return res.status(500).json({ error: 'Failed to fetch blog item' });
        }

        if (!result[0] || result[0].length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const productData = result[0][0];

        res.json({
            product: {
                id: productData.id,
                name: productData.name,
                model_number: productData.model_number,
                SKU: productData.SKU,
                size: productData.size,
                color: productData.color,
                brand_name: productData.brand_name,
                spec_pdf: productData.spec_pdf,
                single_image: productData.single_image,
                first_image: productData.first_image,
                description: productData.description,
                category: {
                    cID: productData.cID,
                    cName: productData.cName,
                    slug: productData.slug
                }
            },
            images: result[1] || [],
            specList: result[2] || []
        });
    });
}

//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    getDataFunc(itemId, res);
});


router.get('/', (req, res) => {
    const url_path = req.query.url_path;
    db.query(`SELECT id FROM products WHERE url_path = ? AND is_active = 1`, [url_path], (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            const itemId = (data[0].id);
            getDataFunc(itemId, res);
        }
    })
})


//-------------------------- Add a new product with multiple images ---------------------------------
const uploadFields = upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'spec_pdf', maxCount: 1 }
]);

router.post('/add', uploadFields, (req, res) => {
    const pdfFile = req.files['spec_pdf'] ? `/pdf/${req.files['spec_pdf'][0].filename}` : null;
    const images = req.files['images'] || [];

    const { category_id, name, description, model_number, SKU, url_path, brand_name, single_image, first_image, sort_order, specLabel, specValue } = req.body;

    const specLabelList = Array.isArray(specLabel) ? specLabel : [specLabel];
    const specValueList = Array.isArray(specValue) ? specValue : [specValue];

    const productSql = 'INSERT INTO products (category_id, name, description, model_number, SKU, url_path, spec_pdf, brand_name, single_image, first_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(productSql, [category_id, name, description, model_number, SKU, url_path, pdfFile, brand_name, single_image, first_image], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Failed to add product' });
        }

        const productId = result.insertId;

        specLabelList.map((item, index) => {
            db.query(`INSERT INTO product_spec (product_id, spec_label, spec_value) VALUES (?,?,?)`, [productId, item, specValueList[index]], (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
        })

        // Handle multiple images
        if (images.length > 0) {
            const sequencesArray = Array.isArray(sort_order) ? sort_order : [sort_order];
            let completed = 0;
            let hasError = false;

            images.forEach((file, index) => {
                const image_url = `/images/${file.filename}`;
                const sort_order = sequencesArray[index] || index + 1;

                const imageSql = 'INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)';

                db.query(imageSql, [productId, image_url, name, sort_order], (err) => {
                    if (err) {
                        console.error('Error adding product image:', err);
                        hasError = true;
                    }

                    completed++;
                    if (completed === images.length) {
                        if (hasError) {
                            return res.status(500).json({ error: 'Product added but some images failed to upload' });
                        }
                        res.status(200).json({ message: 'Product and images added successfully', productId: productId });
                    }
                });
            });
        } else {
            res.json({ message: 'Product added successfully (no images)', productId: productId });
        }
    });
});



//-------------------------- Update product with multiple images ---------------------------------
router.put('/update/:id', uploadFields, (req, res) => {
    const productId = req.params.id;
    const pdfFile = req.files['spec_pdf'] ? `/pdf/${req.files['spec_pdf'][0].filename}` : null;

    const images = req.files['images'] || [];

    const { category_id, name, description, model_number, SKU, url_path, spec_pdf, brand_name, single_image, first_image, sort_order, existing_images, existing_sort_order, delValues, specId, specLabel, specValue, specDel } = req.body;

    const specIDList = Array.isArray(specId) ? specId : [specId];
    const specDelList = Array.isArray(specDel) ? specDel : [specDel];
    const specLabelList = Array.isArray(specLabel) ? specLabel : [specLabel];
    const specValueList = Array.isArray(specValue) ? specValue : [specValue];

    specDelList.forEach(id => {
        if (id) {
            db.query(`UPDATE product_spec SET is_active = 0 WHERE id = ?`, [id], (err, result) => {
                if (err) console.error("Spec delete error:", err);
            });
        }
    });

    specIDList.forEach((id, index) => {
        if (!id) {
            db.query(`INSERT INTO product_spec (product_id, spec_label, spec_value) VALUES (?,?,?)`,
                [productId, specLabelList[index], specValueList[index]], (err, result) => {
                    if (err) console.error("Spec insert error:", err);
                });
        } else {
            db.query(`UPDATE product_spec SET spec_label=?, spec_value=? WHERE id =?`,
                [specLabelList[index], specValueList[index], id], (err, result) => {
                    if (err) console.error("Spec update error:", err);
                });
        }
    });

    const delValuesArr = Array.isArray(delValues) ? delValues : [delValues];
    if (delValuesArr.length !== 0) {
        delValuesArr.map((id) =>
            db.query(`UPDATE product_images SET is_active = 0 WHERE id =?`, [id], (err, result) => {
                if (err) console.error(err)
                return;
            }))
    }

    const productSql = 'UPDATE products SET category_id = ?, name = ?, description = ?, model_number = ?, SKU = ?, url_path = ?, spec_pdf = ?, brand_name = ?, single_image =?, first_image = ?, modified_at = NOW() WHERE id = ?';

    db.query(productSql, [category_id, name, description, model_number, SKU, url_path, pdfFile, brand_name, single_image, first_image, productId], (err) => {
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
                const image_url = `/images/${file.filename}`;
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
                res.status(200).json({ message: 'Product and images updated successfully' });
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
        res.status(200).json({ message: 'Product item deleted successfully' });
    });
});


module.exports = router;