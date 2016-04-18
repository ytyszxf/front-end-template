var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");

var app = express();

app.get('/', function(req, res, next) {
  res.redirect('index.html');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

/*
 * Development  Settings
 */
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, '../client')));

    app.use(express.static(path.join(__dirname, '../client/.tmp/serve')));
    app.use(express.static(path.join(__dirname, '../client/src')));

    //Error Handling
    app.use(function(err, req, res, next) {
        console.log(err.message);
        res.status(err.status || 500);
        res.render('err', {
            message: err.message,
            error: err
        });
    });
}

if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}



module.exports = app;