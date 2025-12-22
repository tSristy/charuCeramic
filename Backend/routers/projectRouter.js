const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const { upload } = require('./imgRoute');


// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT 
        id, title, slug, summary,content, featured_image,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        DATE_FORMAT(modified_at, '%Y-%m-%d %H:%i:%s') as modified_at,
        is_active
        FROM project_details WHERE is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
    SELECT COUNT(*) AS totalRows FROM project_details WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching project items:', err);
            return res.status(500).json({ error: 'Failed to fetch project items' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM project_details WHERE is_active = 1 AND id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error fetching project item:', err);
            return res.status(500).json({ error: 'Failed to fetch project item' });
        }
        res.json(result[0]);
    });
});



//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
    const { title, slug, summary, content } = req.body;
    const featured_image = req.file ? `images/${req.file.filename}` : null;
    const sql = 'INSERT INTO project_details (title, slug, summary, content, featured_image) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, slug, summary, content, featured_image], (err, result) => {
        if (err) {
            console.error('Error adding project item:', err);
            res.status(500).json({ error: 'Failed to add project item' });
            return;
        }
        res.json({ message: 'Project item added successfully', itemId: result.insertId });
    });
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
    const itemId = req.params.id;
    const { title, slug, summary, content, is_active } = req.body;
    let sql = 'UPDATE project_details SET title = ?, slug = ?, summary = ?, content = ?, is_active = ?, modified_at = NOW()';
    const params = [title, slug, summary, content, typeof is_active !== "undefined" ? is_active : 1];
    if (req.file) {
        sql += ', featured_image = ?';
        params.push(`images/${req.file.filename}`);
    }
    sql += ' WHERE id = ?';
    params.push(itemId);
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating project item:', err);
            res.status(500).json({ error: 'Failed to update project item' });
            return;
        }
        res.json({ message: 'Project item updated successfully' });
    });
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE project_details SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting project item:', err);
            res.status(500).json({ error: 'Failed to delete project item' });
            return;
        }
        res.json({ message: 'Project item deleted successfully' });
    });
});

module.exports = router;
