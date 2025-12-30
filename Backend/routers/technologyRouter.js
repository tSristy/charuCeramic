const express = require('express');
const db = require('../Service/dbconfig');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.get('/show', (req, res) => {
	const sql = `SELECT name AS spec_value FROM technology WHERE is_active = 1`;
	db.query(sql, (err, results) => {
		if (err) {
			console.error('Error fetching technology items:', err);
			return res.status(500).json({ error: 'Failed to fetch technology items' });
		}
		res.json(results);
	});
});

module.exports = router;

