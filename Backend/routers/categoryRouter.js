const express = require('express');
const router = express.Router();
const db = require('../dbconfig');

// Get all  items +pagination
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT 
        id, name, slug, description,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        DATE_FORMAT(modified_at, '%Y-%m-%d %H:%i:%s') as modified_at,
        is_active
        FROM product_category WHERE is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
    SELECT COUNT(*) AS totalRows FROM product_category WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: 'Failed to fetch items' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});

// Add a new item
router.post('/add', (req, res) => {
    const { name, slug, description } = req.body;
    const sql = 'INSERT INTO product_category (name, slug, description) VALUES (?, ?, ?)';
    db.query(sql, [name, slug, description ], (err, result) => {
        if (err) {
            console.error('Error adding category item:', err);
            res.status(500).json({ error: 'Failed to add category item' });
            return;
        }
        res.json({ message: 'category item added successfully', itemId: result.insertId });
    }
    );
});

// Update item details
router.put('/update/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, slug, description } = req.body;
    const sql = 'UPDATE product_category SET name = ?, slug = ?, description = ?, modified_at = NOW() WHERE id = ?';
    db.query(sql, [name, slug, description, itemId], (err, result) => {
        if (err) {
            console.error('Error updating category item:', err);
            res.status(500).json({ error: 'Failed to update category item' });
            return;
        }
        res.json({ message: 'category item updated successfully' });
    });
});

//  item id details
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    
    const sql = 'SELECT * FROM product_category WHERE is_active = 1 AND id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error updating category item:', err);
            return;
        }
        res.json(result[0]);
    });
});

//delete item
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE product_category SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting category item:', err);
            res.status(500).json({ error: 'Failed to delete category item' });
            return;
        }
        res.json({ message: 'category item deleted successfully' });
    });
});

module.exports = router;