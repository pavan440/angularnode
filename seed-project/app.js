var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var appRoutes = require('./routes/app');
var messageRoutes=require('./routes/messages');
var userRoutes=require('./routes/user');
var cors = require('cors');
//var messengerRoutes=require('./routes/messenger');


var app = express();
mongoose.connect('mongodb://pavan91-nodechat1-6128945:27017/node-angular');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "https://nodechat1-pavan91.c9users.io");
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    console.log("prining request un app.js");
//console.log(req);
    //console.log(req.body.content);
    next();
});

app.use('/', appRoutes);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);
//app.use('/messenger', messengerRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});



module.exports = app;
