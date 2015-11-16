var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./db/mysqlLib");
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//app.use('/images', express.static(__dirname + '/images'));
//app.use(multer({dest: './images/'}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//start connection to the db
db.getConnection(function (err, con) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n" + err);
    }
});

app.use('/', routes);



/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('404.html');
    });
}
*/

// production error handler
// no stacktraces leaked to user
/*
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('404.html', {
        message: err.message,
        error: {}
    });
});
*/


module.exports = app;
