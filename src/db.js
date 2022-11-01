const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'spotify_data'
})

module.exports = pool;