const mysql = require('mysql');
const fs = require('fs');

const db = mysql.createConnection(process.env.JAWSDB_MARIA_URL || {
    host: process.env.DBHOST || 'localhost',
    user: process.env.DBUSER || 'root',
    password: process.env.DBPASSWORD || 'password',
    database: 'calendar'
});

let createSampleDataScript = fs.readFileSync(`scripts/create/sql/create_sample_data.sql`, 'utf8');

db.query(createSampleDataScript, (error, results, fields) => {
    if (error) throw error;
});
