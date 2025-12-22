const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const upload = multer({ storage });

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT 
        id, title, file_path, summary, featured_image,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        DATE_FORMAT(modified_at, '%Y-%m-%d %H:%i:%s') as modified_at,
        is_active
        FROM catalogue_details WHERE is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
    SELECT COUNT(*) AS totalRows FROM catalogue_details WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
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



//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
    const { title, file_path, summary, content } = req.body;
    const featured_image = req.file ? `images/${req.file.filename}` : null;
    const sql = 'INSERT INTO catalogue_details (title, file_path, summary, content, featured_image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, file_path, summary, content, featured_image], (err, result) => {
        if (err) {
            console.error('Error adding catalogue item:', err);
            res.status(500).json({ error: 'Failed to add catalogue item' });
            return;
        }
        res.json({ message: 'Catalogue item added successfully', itemId: result.insertId });
    });
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
    const itemId = req.params.id;
    const { title, file_path, summary, content, is_active } = req.body;
    let sql = 'UPDATE catalogue_details SET title = ?, file_path = ?, summary = ?, content = ?, is_active = ?, modified_at = NOW()';
    const params = [title, file_path, summary, content, typeof is_active !== "undefined" ? is_active : 1];
    if (req.file) {
        sql += ', featured_image = ?';
        params.push(`images/${req.file.filename}`);
    }
    sql += ' WHERE id = ?';
    params.push(itemId);
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating catalogue item:', err);
            res.status(500).json({ error: 'Failed to update catalogue item' });
            return;
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
