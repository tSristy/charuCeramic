const express = require('express');
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
	const { pageNo } = req.body;
	const sql = `SELECT 
		id, title, slug, summary, content, add_homepage, featured_image, published_at,
		is_active
		FROM blog_articles WHERE is_active = 1 LIMIT 10 OFFSET ${(pageNo - 1) * 10};
	SELECT COUNT(*) AS totalRows FROM blog_articles WHERE is_active = 1;`;
	db.query(sql, (err, results) => {
		if (err) {
			console.error('Error fetching blog items:', err);
			return res.status(500).json({ error: 'Failed to fetch blog items' });
		}
		res.json({ items: results[0], totalRows: results[1][0].totalRows });
	});
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
	const itemId = req.params.id;
	const sql = 'SELECT * FROM blog_articles WHERE is_active = 1 AND id = ?';
	db.query(sql, [itemId], (err, result) => {
		if (err) {
			console.error('Error fetching blog item:', err);
			return res.status(500).json({ error: 'Failed to fetch blog item' });
		}
		res.json(result[0]);
	});
});



//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
	const { title, slug, summary, add_homepage, content, published_at } = req.body;
	const featured_image = req.file ? `images/${req.file.filename}` : null;
	const sql = 'INSERT INTO blog_articles (title, slug, add_homepage, summary, content, featured_image, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
	db.query(sql, [title, slug, add_homepage, summary, content, featured_image, published_at], (err, result) => {
		if (err) {
			console.error('Error adding blog item:', err);
			res.status(500).json({ error: 'Failed to add blog item' });
			return;
		}
		res.json({ message: 'Blog item added successfully', itemId: result.insertId });
	});
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
	const itemId = req.params.id;
	const { title, slug, summary, add_homepage, content, published_at } = req.body;
	let sql = 'UPDATE blog_articles SET title = ?, slug = ?, summary = ?, add_homepage = ?, content = ?, published_at = ?, modified_at = NOW()';
	const params = [title, slug, summary, add_homepage, content, published_at];
	if (req.file) {
		sql += ', featured_image = ?';
		params.push(`images/${req.file.filename}`);
	}
	sql += ' WHERE id = ?';
	params.push(itemId);
	db.query(sql, params, (err, result) => {
		if (err) {
			console.error('Error updating blog item:', err);
			res.status(500).json({ error: 'Failed to update blog item' });
			return;
		}
		res.json({ message: 'Blog item updated successfully' });
	});
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
	const itemId = req.params.id;

	const sql = 'UPDATE blog_articles SET is_active = 0 WHERE id = ?';
	db.query(sql, [itemId], (err, result) => {
		if (err) {
			console.error('Error deleting blog item:', err);
			res.status(500).json({ error: 'Failed to delete blog item' });
			return;
		}
		res.json({ message: 'Blog item deleted successfully' });
	});
});

module.exports = router;

