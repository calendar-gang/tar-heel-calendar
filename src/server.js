const express = require('express');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');

const port = process.env.PORT || 8080;
const db = module.exports.db = mysql.createConnection(process.env.JAWSDB_MARIA_URL || {
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
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({strict: false}));
app.use(cookieParser());

/*
*****************
* REQUESTS
******************
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const {register} = require('./server/register');
app.post('/register', register);

const {login} = require('./server/login');
app.post('/login', login);

const {logout} = require('./server/logout');
app.post('/logout', logout);

const {getInfo} = require('./server/getInfo');
app.post('/getinfo', getInfo);

const {makeEvent} = require('./server/makeEvent');
app.post('/makeevent', makeEvent);

const {viewEvents} = require('./server/viewEvents');
app.post('/viewevents', viewEvents);

const {deleteEvent} = require('./server/deleteEvent');
app.delete('/deleteevent', deleteEvent);

const {editEvent} = require('./server/editEvent');
app.post('/editevent', editEvent);

app.listen(port);

console.log("App listening on port " + port)
