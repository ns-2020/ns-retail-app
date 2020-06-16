'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express'),
  app = express(),
  port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const debug = require('debug')('app');
const path = require('path');
const env = app.get('env');

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(errorHandler());
require('./route/index')(app);

app.listen(port);

console.log('ns-retail-app restful api server started on: ' + port);

exports = module.exports = app;

