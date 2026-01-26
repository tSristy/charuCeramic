const express = require('express');
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo, searchVariable } = req.body;
    const sql = `SELECT 
		id, page_name, section_title, section_value, content_type, featured_image, add_homepage, sort_order, is_active
		FROM banner WHERE is_active = 1 
		AND ( ? IS NULL OR page_name LIKE CONCAT('%', ?, '%')
		OR section_title LIKE CONCAT('%', ?, '%')
		) ORDER BY sort_order, id desc LIMIT 10 OFFSET ?;
	SELECT COUNT(*) AS totalRows FROM banner WHERE is_active = 1 AND ( ? IS NULL OR page_name LIKE CONCAT('%', ?, '%')
		OR section_title LIKE CONCAT('%', ?, '%')
		) ;`;
    db.query(sql, [searchVariable, searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching banner items:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM banner WHERE is_active = 1 AND id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error fetching banner item:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({
            id: result[0].id,
            page_name: result[0].page_name,
            sectionCode: {
                section_title: result[0].section_title,
                section_value: result[0].section_value
            },
            content_type: result[0].content_type,
            featured_image: result[0].featured_image,
            add_homepage: result[0].add_homepage,
            sort_order: result[0].sort_order
        });
    });
});



//-------------------------- Get item details by page_name -----------------------------
router.get('/', (req, res) => {
    const page_name = req.query.pageName;
    const section_value = req.query.sectionValue;
    const sql = 'SELECT * FROM banner WHERE is_active = 1 AND add_homepage = 1 AND page_name = ? AND section_value = ? ORDER BY sort_order ASC, id DESC limit 3';
    db.query(sql, [page_name, section_value], (err, result) => {
        if (err) {
            console.error('Error fetching banner item:', err);
            return res.send(404);
        }
        res.json(result);
    });
});


const uploadFields = upload.fields([
    { name: 'featured_image', maxCount: 1 }
]);

//-------------------------- Add a new item ---------------------------------
router.post('/add', uploadFields, (req, res) => {
    const { page_name, section_title, section_value, content_type } = req.body;
    
    const folderName = content_type === 'Image' ? 'images' : 'pdf';
    const featured_image = req.files['featured_image']
        ? `/${folderName}/${req.files['featured_image'][0].filename}`
        : null;
    let sql = "";
    let values = [];
    if (page_name !== 'HOMEPAGE' && section_value !== 'HP01' && section_value !== 'HP03') {
        sql += `update banner set add_homepage = 0 where page_name = ? and section_value = ?;`;
        values.push(page_name, section_value);
    }
    sql += `INSERT INTO banner 
                (page_name, section_title, section_value, content_type, featured_image) 
                VALUES (?, ?, ?, ?, ?)`;

    values.push(page_name, section_title, section_value, content_type, featured_image);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding banner item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Banner item added successfully', itemId: result.insertId ? result.insertId :result[1].insertId});
    });
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', uploadFields, (req, res) => {
    const itemId = req.params.id;
    const { page_name, section_title, section_value, content_type, add_homepage, sort_order } = req.body;

    let sql = "";
    let params = [];
    if (page_name !== 'HOMEPAGE' && section_value !== 'HP01' && section_value !== 'HP03' && add_homepage == 1) {
        sql += `update banner set add_homepage = 0 where page_name = ? and section_value = ?;`;
        params.push(page_name, section_value);
    }
    sql += 'UPDATE banner SET page_name = ?, section_title = ?, section_value = ?, content_type = ?, add_homepage = ?, sort_order = ?';
    params.push(page_name, section_title, section_value, content_type, add_homepage || 0, sort_order);

    const folderName = content_type === 'Image' ? 'images' : 'pdf';

    if (req.files && req.files['featured_image']) {
        const newImagePath = `/${folderName}/${req.files['featured_image'][0].filename}`;
        sql += ', featured_image = ?';
        params.push(newImagePath);
    }

    sql += ' WHERE id = ?';
    params.push(itemId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating banner item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Banner item updated successfully' });
    });
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE banner SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting banner item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Banner item deleted successfully' });
    });
});

module.exports = router;
