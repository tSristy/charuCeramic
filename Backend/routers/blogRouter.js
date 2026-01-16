const express = require('express');
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
	const { pageNo, searchVariable } = req.body;
	const sql = `SELECT 
		id, title, slug, summary, content, add_homepage, featured_image, published_at,
		is_active
		FROM blog_articles WHERE is_active = 1 
		AND ( ? IS NULL OR title LIKE CONCAT('%', ?, '%')
		OR published_at LIKE CONCAT('%', ?, '%')
		) ORDER BY published_at desc LIMIT 10 OFFSET ?;
	SELECT COUNT(*) AS totalRows FROM blog_articles WHERE is_active = 1 AND ( ? IS NULL OR title LIKE CONCAT('%', ?, '%')
		OR published_at LIKE CONCAT('%', ?, '%')
		) ;`;
	db.query(sql,[searchVariable, searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable, searchVariable], (err, results) => {
		if (err) {
			console.error('Error fetching blog items:', err);
			return res.status(500).json({ error: 'Failed to fetch blog items' });
		}
		res.json({ items: results[0], totalRows: results[1][0].totalRows });
	});
});



// ---------------------DISPLAY ON HOMEPAGE------------------------------------------
router.get('/show', (req, res) => {
	const sql = `SELECT *
		FROM blog_articles WHERE is_active = 1 
		AND add_homepage = 1 ORDER BY id DESC`;
	db.query(sql, (err, results) => {
		if (err) {
			console.error('Error fetching blog items:', err);
			return res.status(500).json({ error: 'Failed to fetch blog items' });
		}
		res.send(results);
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



//-------------------------- Get item details by path -----------------------------
router.get('/', (req, res) => {
	const slug = req.query.url_path;
	const sql = 'SELECT * FROM blog_articles WHERE is_active = 1 AND slug = ?';
	db.query(sql, [slug], (err, result) => {
		if (err) {
			console.error('Error fetching blog item:', err);
			return res.send(404);
		}
		res.json(result[0]);
	});
});

const uploadFields = upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'featured_image_2', maxCount: 1 },
    { name: 'featured_image_3', maxCount: 1 }
]);


//-------------------------- Add a new item ---------------------------------
router.post('/add', uploadFields, (req, res) => {
    const { title, slug, summary, add_homepage, content, published_at } = req.body;

    // 2. Access files via req.files (plural) instead of req.file
    const featured_image = req.files['featured_image'] ? `/images/${req.files['featured_image'][0].filename}` : null;
    const featured_image_2 = req.files['featured_image_2'] ? `/images/${req.files['featured_image_2'][0].filename}` : null;
    const featured_image_3 = req.files['featured_image_3'] ? `/images/${req.files['featured_image_3'][0].filename}` : null;

    // 3. Update your SQL to include the 2 new columns
    const sql = `INSERT INTO blog_articles 
                (title, slug, add_homepage, summary, content, featured_image, featured_image_2, featured_image_3, published_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [title, slug, add_homepage, summary, content, featured_image, featured_image_2, featured_image_3, published_at];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding blog item:', err);
            res.status(500).json({ error: 'Failed to add blog item' });
            return;
        }
        res.json({ message: 'Blog item added successfully', itemId: result.insertId });
    });
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', uploadFields, (req, res) => {
    const itemId = req.params.id;
    const { title, slug, summary, add_homepage, content, published_at } = req.body;

    let sql = 'UPDATE blog_articles SET title = ?, slug = ?, summary = ?, add_homepage = ?, content = ?, published_at = ?, modified_at = NOW()';
    const params = [title, slug, summary, add_homepage, content, published_at];

    if (req.files) {
        if (req.files['featured_image']) {
            sql += ', featured_image = ?';
            params.push(`/images/${req.files['featured_image'][0].filename}`);
        }
        if (req.files['featured_image_2']) {
            sql += ', featured_image_2 = ?';
            params.push(`/images/${req.files['featured_image_2'][0].filename}`);
        }
        if (req.files['featured_image_3']) {
            sql += ', featured_image_3 = ?';
            params.push(`/images/${req.files['featured_image_3'][0].filename}`);
        }
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

