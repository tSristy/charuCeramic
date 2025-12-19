const mysql = require('mysql2');

const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'charuceramic',
    multipleStatements: true
});

module.exports = config;