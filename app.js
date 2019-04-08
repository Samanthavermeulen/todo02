var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var createError = require('http-errors');

var mysql = require('mysql');


//require the controllers
var noteController = require('./routes/index.js');
var userController = require('./routes/users.js');

//create the database connection
var db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todojs'
});
global.db = db;

//CONFIGURATION OF THE APP --- STARTS HERE

//create the app;
var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// set the view engine to ejs
app.set('view engine', 'ejs');



/* Using the sessions */
app.use(session({secret: 'todotopsecret'}));


app.use('/todo', noteController);
app.use('/user', userController);

app.get('/', function(req, res, next) {
    res.redirect('/todo')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(8080);