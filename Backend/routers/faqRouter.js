const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo, searchVariable } = req.body;
    const sql = `SELECT 
        id, question, answer, is_active
        FROM faq WHERE is_active = 1 AND (
        ? IS NULL OR question LIKE CONCAT('%', ?, '%')) LIMIT 15 OFFSET ?;
    SELECT COUNT(*) AS totalRows FROM faq WHERE is_active = 1 AND (
        ? IS NULL OR question LIKE CONCAT('%', ?, '%')) ;`;
    db.query(sql, [searchVariable, searchVariable, ((pageNo - 1) * 15), searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching faq:', err);
            return res.status(500).json({ error: 'Failed to fetch faq' });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});



// --------------------------- Add a new faq ---------------------------------
router.post('/add', (req, res) => {
    const { question, answer } = req.body;
    const sql = 'INSERT INTO faq (question, answer) VALUES (?, ?)';
    db.query(sql, [question, answer], (err, result) => {
        if (err) {
            console.error('Error adding faq:', err);
            res.status(500).json({ error: 'Failed to add faq' });
            return;
        }
        res.json({ message: 'faq added successfully', faqId: result.insertId });
    }
    );
});




// -------------------------- Update faq details ---------------------------------
router.put('/update/:id', (req, res) => {
    const faqId = req.params.id;
    const { question, answer } = req.body;
    const sql = 'UPDATE faq SET question = ?, answer = ?, modified_at = NOW() WHERE id = ?';
    db.query(sql, [question, answer, faqId], (err, result) => {
        if (err) {
            console.error('Error updating faq:', err);
            res.status(500).json({ error: 'Failed to update faq' });
            return;
        }
        res.json({ message: 'faq updated successfully' });
    });
});




// -------------------------- Get faq details by id -----------------------------
router.get('/:id', (req, res) => {
    const faqId = req.params.id;

    const sql = 'SELECT * FROM faq WHERE is_active = 1 AND id = ?';
    db.query(sql, [faqId], (err, result) => {
        if (err) {
            console.error('Error fetching faq details:', err);
            return res.status(500).json({ error: 'Failed to fetch faq details' });
        }
        res.json(result[0]);
    });
});



// ------------------------- Delete faq (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const faqId = req.params.id;
    const sql = 'UPDATE faq SET is_active = 0, modified_at = NOW() WHERE id = ?';
    db.query(sql, [faqId], (err, result) => {
        if (err) {
            console.error('Error deleting faq:', err);
            res.status(500).json({ error: 'Failed to delete faq' });
            return;
        }
        res.json({ message: 'faq deleted successfully' });
    });
});

module.exports = router;