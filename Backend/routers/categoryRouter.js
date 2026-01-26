const express = require('express');
const router = express.Router();
const db = require('../Service/dbconfig');
const { upload } = require('./imgRoute');

// ------------------------- Get ALL Items -------------------------------------
router.post('/list', (req, res) => {
    const { pageNo, searchVariable } = req.body;

    const sql = `SELECT
    id,
    parent_id,
    name,
    slug,
    description,
    featured_image,
    add_menu,
    add_homepage,
    is_active
FROM
    category_details
WHERE
    is_active = 1 AND (
        ? IS NULL OR name LIKE CONCAT('%', ?, '%')
    )
LIMIT 10 OFFSET ?;
SELECT
    COUNT(*) AS totalRows
FROM
    category_details
WHERE
    is_active = 1 AND (
        ? IS NULL OR name LIKE CONCAT('%', ?, '%')
    )`;

    db.query(sql, [searchVariable, searchVariable, ((pageNo - 1) * 10), searchVariable, searchVariable], (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json({ items: results[0], totalRows: results[1][0].totalRows });
    });
});


//--------------------------- Get by menu or homepage -----------------------------
router.get('/show', (req, res) => {
    const displayVar = req.query.displayVar;
    var queryExtended;
    if (displayVar === "all") {
        queryExtended = "SELECT A.id AS cID, A.name AS cName, A.slug FROM category_details AS A WHERE is_active = 1";
    }
    else if ( displayVar === "child") {
        queryExtended = "SELECT A.id AS cID, A.name AS cName, A.slug FROM category_details AS A WHERE is_active = 1 AND (parent_id IS NOT NULL AND parent_id NOT IN (0))";
    }
    else queryExtended = `SELECT * FROM category_details WHERE is_active = 1 AND ${displayVar} = 1 ORDER BY homepage_sequence ASC`;

    db.query(queryExtended, (err, results) => {
        if (err) {
            console.error('Error fetching items by displayVar:', err);
        }
        res.json(results);
    });
});




//--------------------------- Get Parent items -----------------------------
router.get('/parent', (req, res) => {
    const sql = 'SELECT id AS parent_id, name AS parent_name FROM category_details WHERE is_active = 1 AND (parent_id IS NULL OR parent_id = 0)';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching parent items:', err);
            return res.status(500).json({ error: "Something is not working. Please Try again later." });
        }
        res.json(results);
    });
});



//-------------------------- Get item details by id -----------------------------
router.get('/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT c.*, p.name AS parent_name FROM category_details c LEFT JOIN category_details p ON c.parent_id = p.id where c.id = ? AND c.is_active = 1';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error updating category item:', err);
            return;
        }
        res.json({ parentCategory: { parent_id: result[0].parent_id || null, parent_name: result[0].parent_name || null }, ...result[0] });
    });
});




//-------------------------- Add a new item ---------------------------------
router.post('/add', upload.single('featured_image'), (req, res) => {
    const { parent_id, name, slug, description, add_menu, add_homepage, homepage_sequence } = req.body;
    const featured_image = req.file ? `/images/${req.file.filename}` : null;
    const sql = 'INSERT INTO category_details (parent_id, name, slug, description, featured_image, add_menu, add_homepage,homepage_sequence, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [parent_id || null, name, slug, description, featured_image, add_menu, add_homepage, homepage_sequence, 1], (err, result) => {
        if (err) {
            console.error('Error adding category item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'category item added successfully', itemId: result.insertId });
    }
    );
});



//-------------------------- Update item details ---------------------------------
router.put('/update/:id', upload.single('featured_image'), (req, res) => {
    const itemId = req.params.id;
    const { parent_id, name, slug, description, add_menu, add_homepage, homepage_sequence } = req.body;
    let sql = 'UPDATE category_details SET parent_id = ?, name = ?, slug = ?, description = ?, add_menu = ?, add_homepage = ?,homepage_sequence=?, modified_at = NOW()';
    const params = [parent_id, name, slug, description, add_menu || 0, add_homepage || 0, homepage_sequence || null];
    if (req.file) {
        sql += ', featured_image = ?';
        params.push(`/images/${req.file.filename}`);
    }
    sql += ' WHERE id = ?';
    params.push(itemId);
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating category item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'category item updated successfully' });
    });
});



//-------------------------- Delete item (soft delete) ---------------------------------
router.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'UPDATE category_details SET is_active = 0 WHERE id = ?';
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting category item:', err);
             res.status(500).json({ error: "Something is not working. Please Try again later." });
            return;
        }
        res.json({ message: 'category item deleted successfully' });
    });
});

module.exports = router;