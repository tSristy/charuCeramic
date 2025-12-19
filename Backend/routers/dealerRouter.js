const express = require('express');
const router = express.Router();
const db = require('../dbconfig');

// Get all dealers +pagination
router.post('/list', (req, res) => {
    const { pageNo } = req.body;
    const sql = `SELECT 
        id, name, address, phone, division, district, thana, 
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        DATE_FORMAT(modified_at, '%Y-%m-%d %H:%i:%s') as modified_at,
        is_active
        FROM dealer_details WHERE is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
    SELECT COUNT(*) AS totalRows FROM dealer_details WHERE is_active = 1;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching dealers:', err);
            return res.status(500).json({ error: 'Failed to fetch dealers' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});


// Add a new dealer
router.post('/add', (req, res) => {
    const { name, address, phone, division, district, thana } = req.body;
    const sql = 'INSERT INTO dealer_details (name, address, phone, division, district, thana) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, address, phone, division, district, thana], (err, result) => {
        if (err) {
            console.error('Error adding dealer:', err);
            res.status(500).json({ error: 'Failed to add dealer' });
            return;
        }
        res.json({ message: 'Dealer added successfully', dealerId: result.insertId });
    }
    );
});

// Update dealer details
router.put('/update/:id', (req, res) => {
    const dealerId = req.params.id;
    const { name, address, phone, division, district, thana } = req.body;
    const sql = 'UPDATE dealer_details SET name = ?, address = ?, phone = ?, division = ?, district = ?, thana = ?, modified_at = NOW() WHERE id = ?';
    db.query(sql, [name, address, phone, division, district, thana, dealerId], (err, result) => {
        if (err) {
            console.error('Error updating dealer:', err);
            res.status(500).json({ error: 'Failed to update dealer' });
            return;
        }
        res.json({ message: 'Dealer updated successfully' });
    });
});

//  dealer id details
router.get('/:id', (req, res) => {
    const dealerId = req.params.id;
    
    const sql = 'SELECT * FROM dealer_details WHERE is_active = 1 AND id = ?';
    db.query(sql, [dealerId], (err, result) => {
        if (err) {
            console.error('Error updating dealer:', err);
            return;
        }
        res.json(result[0]);
    });
});
//delete dealer
router.delete('/delete/:id', (req, res) => {
    const dealerId = req.params.id;

    const sql = 'UPDATE dealer_details SET is_active = 0 WHERE id = ?';
    db.query(sql, [dealerId], (err, result) => {
        if (err) {
            console.error('Error deleting dealer:', err);
            res.status(500).json({ error: 'Failed to delete dealer' });
            return;
        }
        res.json({ message: 'Dealer deleted successfully' });
    });
});



// Soft delete a dealer
module.exports = router;