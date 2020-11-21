const mysql = require('mysql');
const fs = require('fs');

const db = mysql.createConnection(process.env.JAWSDB_MARIA_URL || {
    host: process.env.DBHOST || 'localhost',
    user: process.env.DBUSER || 'root',
    password: process.env.DBPASSWORD || 'password',
    database: 'calendar'
});

let dropTablesScript = fs.readFileSync(`scripts/delete/sql/drop_tables.sql`, 'utf8');

db.query(dropTablesScript, (error, results, fields) => {
    if (error) throw error;
});
