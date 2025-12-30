const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imageDir = path.join(__dirname, '..', 'images');
const docDir = path.join(__dirname, '..', 'pdf');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, imageDir);
        } 
        else if (file.mimetype === 'application/pdf') {
            cb(null, docDir);
        } 
        // Default fallback
        else {
            cb(null, docDir); 
        }
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, unique + ext);
    }
});


const upload = multer({ storage });

module.exports = { upload };