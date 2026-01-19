const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');


// -------------------------- Get dealer details by id -----------------------------
router.get('/:id', (req, res) => {
    const dealerId = req.params.id;

    const sql = 'SELECT * FROM terms_policy WHERE id = ?';
    db.query(sql, [dealerId], (err, result) => {
        if (err) {
            console.error('Error updating dealer:', err);
            return;
        }
        res.json(result[0]);
    });
});



// -------------------------- Update dealer details ---------------------------------
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    const sql = 'UPDATE terms_policy SET content = ? WHERE id = ?';
    db.query(sql, [content, id], (err, result) => {
        if (err) {
            console.error('Error updating dealer:', err);
            res.send(500);
            return;
        }
        res.json({ message: 'Your change has been updated successfully' });
    });
});




module.exports = router;