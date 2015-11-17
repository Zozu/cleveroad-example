var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./db/mysqlLib");
var routes = require('./routes/index');
var ImageController = require('./controllers/ImageController');
var multiparty = require('connect-multiparty');

var app = express();
var multipartyMiddleware = multiparty();




// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//test connection to the db
db.getConnection(function (err, con) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n" + err);
    }
});


app.post('/api/item/:id/image', multipartyMiddleware, ImageController.uploadFile);


//getimage
app.get('/images/:id', function (req, res) {
    var options = {
        root: __dirname + '/images/',
        dotfiles: 'deny'
    };
    var fileName = req.params.id + ".jpg";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});


app.use('/', routes);


module.exports = app;
