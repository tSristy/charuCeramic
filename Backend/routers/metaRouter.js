const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo, searchVariable } = req.body;

    const sql = `SELECT
    id,
    title,
    slug,
    featured_image,
    description
FROM
    meta_pages
WHERE
    ? IS NULL OR title LIKE CONCAT('%', ?, '%')
LIMIT 10 OFFSET ?;
SELECT
    COUNT(*) AS totalRows
FROM
    meta_pages
WHERE
    ? IS NULL OR title LIKE CONCAT('%', ?, '%')`;

    db.query(sql, [searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});

//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM meta_pages WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error fetching meta page:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json(result[0]);
    });
});

//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
    const { title, slug, description } = req.body;
    const featured_image = req.file ? `/images/${req.file.filename}` : null;
    const sql = 'INSERT INTO meta_pages (title, slug, description, featured_image) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, slug, description, featured_image], (err, result) => {
        if (err) {
            console.error('Error adding meta page:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Meta page added successfully', itemId: result.insertId });
    });
});

//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
    const itemId = req.params.id;
    const { title, slug, description } = req.body;
    let sql = 'UPDATE meta_pages SET title = ?, slug = ?, description = ?';
    const params = [title, slug, description];
    if (req.file) {
        sql += ', featured_image = ?';
        params.push(`/images/${req.file.filename}`);
    }
    sql += ' WHERE id = ?';
    params.push(itemId);
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating meta page:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Meta page updated successfully' });
    });
});

//-------------------------- Delete item ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'DELETE FROM meta_pages WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting meta page:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Meta page deleted successfully' });
    });
});

module.exports = router;