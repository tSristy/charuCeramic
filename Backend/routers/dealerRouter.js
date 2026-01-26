const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo , searchVariable={} } = req.body;
    const { find, district, division } = searchVariable;
    const limit = 12;
    const offset = (pageNo - 1) * limit;

    let conditions = ["is_active = 1"];
    let params = [];

    if (find && find.trim() !== '') {
        conditions.push("(name LIKE ? OR thana LIKE ? OR address Like ? or phone like ?)");
        params.push(`%${find}%`, `%${find}%`, `%${find}%`,`%${find}%`);
    }

    if (district && district.trim() !== '') {
        conditions.push("district LIKE ?");
        params.push(`%${district}%`);
    }

    if (division && division.trim() !== '') {
        conditions.push("division LIKE ?");
        params.push(`%${division}%`);
    }

    const whereClause = conditions.join(" AND ");

    const sql = `
        SELECT id, name, address, phone, division, district, thana, is_active
        FROM dealer_details 
        WHERE ${whereClause} 
        ORDER BY id ASC
        LIMIT ? OFFSET ?;

        SELECT COUNT(*) AS totalRows 
        FROM dealer_details 
        WHERE ${whereClause};
    `;

    const finalParams = [...params, limit, offset, ...params];

    db.query(sql, finalParams, (err, results) => {
        if (err) {
            console.error('Error fetching dealers:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({ 
            items: results[0], 
            totalRows: results[1][0].totalRows 
        });
    });
});


// -------------------------- Get dealer details by id -----------------------------
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




// --------------------------- Add a new dealer ---------------------------------
router.post('/add', (req, res) => {
    const { name, address, phone, division, district, thana } = req.body;
    const sql = 'INSERT INTO dealer_details (name, address, phone, division, district, thana) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, address, phone, division, district, thana], (err, result) => {
        if (err) {
            console.error('Error adding dealer:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Dealer added successfully', dealerId: result.insertId });
    }
    );
});



// -------------------------- Update dealer details ---------------------------------
router.put('/update/:id', (req, res) => {
    const dealerId = req.params.id;
    const { name, address, phone, division, district, thana } = req.body;
    const sql = 'UPDATE dealer_details SET name = ?, address = ?, phone = ?, division = ?, district = ?, thana = ?, modified_at = NOW() WHERE id = ?';
    db.query(sql, [name, address, phone, division, district, thana, dealerId], (err, result) => {
        if (err) {
            console.error('Error updating dealer:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Dealer updated successfully' });
    });
});



// ------------------------- Delete dealer (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const dealerId = req.params.id;

    const sql = 'UPDATE dealer_details SET is_active = 0 WHERE id = ?';
    db.query(sql, [dealerId], (err, result) => {
        if (err) {
            console.error('Error deleting dealer:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Dealer deleted successfully' });
    });
});


module.exports = router;