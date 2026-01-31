const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { searchVariable } = req.body;

    const sql = `SELECT
    id,
    title,
    featured_image,
    description,
    is_active
FROM
    client
WHERE is_active = 1 AND (
    ? IS NULL OR title LIKE CONCAT('%', ?, '%')
    )`;

    db.query(sql, [searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({ items: results});
    });
});

//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM client WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error fetching client:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json(result[0]);
    });
});

//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
    const { title, description } = req.body;
    const featured_image = req.file ? `/images/${req.file.filename}` : null;
    const sql = 'INSERT INTO client (title, description, featured_image, is_active) VALUES (?, ?, ?, 1)';
    db.query(sql, [title, description, featured_image], (err, result) => {
        if (err) {
            console.error('Error adding client:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Client added successfully', itemId: result.insertId });
    });
});

//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
    const itemId = req.params.id;
    const { title, description, is_active } = req.body;
    let sql = 'UPDATE client SET title = ?, description = ?, is_active = ?';
    const params = [title, description, 1];
    if (req.file) {
        sql += ', featured_image = ?';
        params.push(`/images/${req.file.filename}`);
    }
    sql += ' WHERE id = ?';
    params.push(itemId);
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating client:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Client updated successfully' });
    });
});

//-------------------------- Delete item ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'UPDATE client SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting client:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Client deleted successfully' });
    });
});

module.exports = router;
