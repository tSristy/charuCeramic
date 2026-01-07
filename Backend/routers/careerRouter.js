const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');


router.post('/add', upload.single('file_path'), (req, res) => {
    const { name, email, phone, address, cover_letter } = req.body;

    const file_path = req.file
        ? `/pdf/${req.file.filename}`
        : null;

    const sql = 'INSERT INTO career (name, email, phone, address, cover_letter, file_path) VALUES (?,?,?,?,?,?)';

    const params = [name, email, phone || null, address || null,cover_letter || null, file_path || null];

    db.query(sql, params, (err, result) => {
        if (err) console.log(err);
        res.json({ status: true, message: 'Your resume has been uploaded.'});
    });

});



router.post('/list', (req, res) => {
	const { pageNo } = req.body;
    const sql = `SELECT * FROM career ORDER BY id DESC LIMIT 10 OFFSET ${(pageNo - 1) * 10};
	SELECT COUNT(*) AS totalRows FROM career WHERE is_active = 1;`;
	db.query(sql, (err, results) => {
		if (err) {
			console.error('Error fetching blog items:', err);
			return res.status(500).json({ error: 'Failed to fetch blog items' });
		}
		res.json({ items: results[0], totalRows: results[1][0].totalRows });
	});
});




router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE career SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) return res.status(500).json({ status: false, message: 'Database error', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ status: false, message: 'Record not found' });
        return res.json({ status: true, message: 'Career entry soft-deleted' });
    });
});

module.exports = router;

