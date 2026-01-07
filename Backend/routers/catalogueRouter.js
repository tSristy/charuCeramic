const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo, searchVariable } = req.body;
    const sql = `SELECT * FROM catalogue_details WHERE is_active = 1 AND (
        ? IS NULL OR title LIKE CONCAT('%', ?, '%')
    ) LIMIT 10 OFFSET ?;
    SELECT COUNT(*) AS totalRows FROM catalogue_details WHERE is_active = 1 AND (
        ? IS NULL OR title LIKE CONCAT('%', ?, '%'));`;
    db.query(sql,[searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching catalogue items:', err);
            return res.status(500).json({ error: 'Failed to fetch catalogue items' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM catalogue_details WHERE is_active = 1 AND id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error fetching catalogue item:', err);
            return res.status(500).json({ error: 'Failed to fetch catalogue item' });
        }
        res.json(result[0]);
    });
});



// Change upload.single to upload.fields
const uploadFields = upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'file_path', maxCount: 1 } // This is for your PDF
]);

router.post('/add', uploadFields, (req, res) => {
    const { title, summary, content } = req.body;

    // Access files via req.files instead of req.file
    const featured_image = req.files['featured_image'] 
        ? `/images/${req.files['featured_image'][0].filename}` 
        : null;

    const file_path = req.files['file_path'] 
        ? `/pdf/${req.files['file_path'][0].filename}` 
        : null;

    const sql = 'INSERT INTO catalogue_details (title, file_path, summary, content, featured_image) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [title, file_path, summary, content, featured_image], (err, result) => {
        if (err) {
            console.error('Error adding catalogue item:', err);
            return res.status(500).json({ error: 'Failed to add catalogue item' });
        }
        res.json({ message: 'Catalogue item added successfully', itemId: result.insertId });
    });
});


//-------------------------- Update item details ---------------------------------
router.put('/update/:id', uploadFields, (req, res) => {
    const itemId = req.params.id;
    const { title, summary, content } = req.body;

    // 1. Start building the query
    let sql = 'UPDATE catalogue_details SET title = ?, summary = ?, content = ?, modified_at = NOW()';
    let params = [title, summary, content];

    // 2. Check for a new PDF file
    if (req.files && req.files['file_path']) {
        const newFilePath = `/pdf/${req.files['file_path'][0].filename}`;
        sql += ', file_path = ?';
        params.push(newFilePath);
    }

    // 3. Check for a new Featured Image
    if (req.files && req.files['featured_image']) {
        const newImagePath = `/images/${req.files['featured_image'][0].filename}`;
        sql += ', featured_image = ?';
        params.push(newImagePath);
    }

    // 4. Finalize query
    sql += ' WHERE id = ?';
    params.push(itemId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating catalogue item:', err);
            return res.status(500).json({ error: 'Failed to update catalogue item' });
        }
        res.json({ message: 'Catalogue item updated successfully' });
    });
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE catalogue_details SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting catalogue item:', err);
            res.status(500).json({ error: 'Failed to delete catalogue item' });
            return;
        }
        res.json({ message: 'Catalogue item deleted successfully' });
    });
});

module.exports = router;
