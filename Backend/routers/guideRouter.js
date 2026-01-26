const express = require('express');
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');
const router = express.Router();

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
	const { pageNo, searchVariable } = req.body;
	const sql = `SELECT 
		id, title, slug, content, featured_image, is_active, created_at
		FROM buying_guide WHERE is_active = 1 
		AND ( ? IS NULL OR title LIKE CONCAT('%', ?, '%')
		OR slug LIKE CONCAT('%', ?, '%')
		) ORDER BY id desc LIMIT 10 OFFSET ?;
	SELECT COUNT(*) AS totalRows FROM buying_guide WHERE is_active = 1 AND ( ? IS NULL OR title LIKE CONCAT('%', ?, '%')
		OR slug LIKE CONCAT('%', ?, '%')
		) ;`;
	db.query(sql,[searchVariable, searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable, searchVariable], (err, results) => {
		if (err) {
			console.error('Error fetching buying guide items:', err);
			return res.status(500).json({ error: "Something is not working. Please Try again later." });
		}
		res.json({ items: results[0], totalRows: results[1][0].totalRows });
	});
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
	const itemId = req.params.id;
	const sql = 'SELECT * FROM buying_guide WHERE is_active = 1 AND id = ?';
	db.query(sql, [itemId], (err, result) => {
		if (err) {
			console.error('Error fetching buying guide item:', err);
			return res.status(500).json({ error: "Something is not working. Please Try again later." });
		}
		res.json(result[0]);
	});
});



//-------------------------- Get item details by slug -----------------------------
router.get('/', (req, res) => {
	const slug = req.query.url_path;
	const sql = 'SELECT * FROM buying_guide WHERE is_active = 1 AND slug = ?';
	db.query(sql, [slug], (err, result) => {
		if (err) {
			console.error('Error fetching buying guide item:', err);
			return res.send(404);
		}
		res.json(result[0]);
	});
});


const uploadFields = upload.fields([
    { name: 'featured_image', maxCount: 1 }
]);

//-------------------------- Add a new item ---------------------------------
router.post('/add', uploadFields, (req, res) => {
    const { title, slug, content } = req.body;

    const featured_image = req.files['featured_image'] 
        ? `/images/${req.files['featured_image'][0].filename}` 
        : null;
   

    const sql = `INSERT INTO buying_guide 
                (title, slug, content, featured_image) 
                VALUES (?, ?, ?, ?)`;
    const values = [title, slug, content, featured_image];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding buying guide item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Buying guide item added successfully', itemId: result.insertId });
    });
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', uploadFields, (req, res) => {
    const itemId = req.params.id;
    const { title, slug, content } = req.body;

    let sql = 'UPDATE buying_guide SET title = ?, slug = ?, content = ?';
    let params = [title, slug, content];

    
    if (req.files && req.files['featured_image']) {
        const newImagePath = `/images/${req.files['featured_image'][0].filename}`;
        sql += ', featured_image = ?';
        params.push(newImagePath);
    }

    sql += ' WHERE id = ?';
    params.push(itemId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating buying guide item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'Buying guide item updated successfully' });
    });
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
	const itemId = req.params.id;

	const sql = 'UPDATE buying_guide SET is_active = 0 WHERE id = ?';
	db.query(sql, [itemId], (err, result) => {
		if (err) {
			console.error('Error deleting buying guide item:', err);
			 res.status(500).json({ error: "Something is not working. Please Try again later." });
			return;
		}
		res.json({ message: 'Buying guide item deleted successfully' });
	});
});

module.exports = router;
