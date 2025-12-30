const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const { readFile } = require('../Service/fileCheck');


router.post('/login', async (req, res) => {
    const user = await readFile();
    const { username, password } = req.body;
    if (user.userCode === username && user.passCode === password) {
        const token = jwt.sign({
            code: 'T5AS3n!M',
            username: 'admin',
        }, "theCharuCeramic")

        res.status(200).json({
            "user": 'admin',
            "access_token": token,
        })
    }
    else res.status(401).json({ message: "Please try again!" })
})

module.exports = router;



