const mysql = require('mysql2');

// const config = mysql.createConnection({
//     host: 'localhost',  
//     user: 'charsioz_ceramic_shetu',
//     password: 'ceramic_shetu', 
//     database: 'charsioz_ceramic_db', 
//     port: 3306,
//     multipleStatements: true,
// })

const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'charuceramic',
    multipleStatements: true
});

module.exports = config;