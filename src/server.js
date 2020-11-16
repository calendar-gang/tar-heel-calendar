const express = require('express');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const port = process.env.PORT || 8080;
const db = mysql.createConnection(process.env.JAWSDB_MARIA_URL || {
    host: process.env.DBHOST || 'localhost', // on port 3306. this doesn't need to be specified.
    user: process.env.DBUSER || 'root',
    password: process.env.DBPASSWORD || 'password',
    database: process.env.DBDATABASE || 'calendar'
});

db.connect(function(err) {
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + db.threadId);
});

const app = express();

app.use(favicon(__dirname + '/../build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/register', async(req, res) => {
    const { username, email, firstname, lastname, password } = req.body;
    // TODO: encrypt password
    if(!isStringValidLength(username, 1, 100)
            || !isStringValidLength(email, 5, 255)
            || !isStringValidLength(firstname, 1, 100)
            || !isStringValidLength(lastname, 1, 100)
            || !isStringValidLength(password, 5, 255)){
        // It would be better to specify which field is wrong but if it you get this error you probably seriously screwed up.
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    let canProcede = true;

    // TODO: this could be one query but that's a lot of work
    await db.query(`SELECT username
            FROM Users
            WHERE username=?`, username, (error, results, fields) => {
        if(error) throw error;

        if(results.length !== 0){
            res.status(400);
            res.json({
                message: "Username already used."
            });

            canProcede = false;
        }
    });

    if(!canProcede) return; // there's gotta be a better way to do but I'm too tired

    await db.query(`SELECT email
            FROM Users
            WHERE email=?`, email, (error, results, fields) => {
        if(error) throw error;

        if(results.length !== 0){
            res.status(400);
            res.json({
                message: "Email already used."
            });

            canProcede = false;
        }
    });

    if(!canProcede) return;

    await db.query(`INSERT INTO Users(username, email, firstname, lastname, password)
            VALUES (?, ?, ?, ?, ?)`, [username, email, firstname, lastname, password],
            (error, results, fields) => {
        if(error) throw error;

        res.json({
           message: "Registration complete."
        });
    });
});

function isStringValidLength(str, min, max){
    return str !== undefined && typeof(str) === "string" && str.length >= min && str.length <= max;
}

app.listen(port);
