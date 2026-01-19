const mysql = require('mysql2');

// const config = mysql.createPool({
//     host: 'localhost',  
//     user: 'charsioz_ceramic_shetu',
//     password: 'ceramic_shetu', 
//     database: 'charsioz_ceramic_db', 
//     port: 3306,
//     multipleStatements: true,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'charu_ceramic',
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = config;