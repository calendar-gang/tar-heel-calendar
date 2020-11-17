const express = require('express');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const path = require('path');
const mysql = require('mysql');

const port = process.env.PORT || 8080;
const db = mysql.createConnection(process.env.JAWSDB_MARIA_URL || {
    host: process.env.DBHOST || 'localhost',
    user: process.env.DBUSER || 'root',
    password: process.env.DBPASSWORD || 'password',
    database: 'calendar'
});

db.connect(function(err) {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected to database as id ' + db.threadId);
});

const app = express();

// the __dirname is the current directory from where the script is running
app.use(favicon(__dirname + '/../build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/***
 * REQUESTS
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/register', async(req, res) => {
    const { username, email, firstname, lastname, password } = req.body;
    if(!isStringValidLength(username, 1, 100)
            || !isStringValidLength(email, 5, 255)
            || !isStringValidLength(firstname, 1, 100)
            || !isStringValidLength(lastname, 1, 100)
            || !isStringValidLength(password, 5, 255)){
        // It would be better to specify which field is wrong but this is considered an internal error
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    let f = db.query(`SELECT username, email
            FROM Users
            WHERE username=? OR email=?`, [username, email], (error, results, fields) => {
        if(error) throw error;

        if(results.length !== 0){
            res.status(400);
            res.json({
                message: results[0].username === username ?
                    "Username already used." : "Email already used."
            });

            return;
        }

        let encryptedPassword = crypto.createHash('sha256').update(password).digest('base64');

        db.query(`INSERT INTO Users(username, email, firstname, lastname, password)
                VALUES (?, ?, ?, ?, ?)`, [username, email, firstname, lastname, encryptedPassword],
                (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Registration complete."
            });
        });
    });
});

function isStringValidLength(str, min, max){
    return str !== undefined && typeof(str) === "string" && str.length >= min && str.length <= max;
}

app.listen(port);
