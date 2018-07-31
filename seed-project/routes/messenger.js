var express = require('express');
var router = express.Router();
var User=require('../models/user');
var app= require('../app');
var io = require('socket.io')(app);
io.on('connection', function (socket) {
  socket.emit('message', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);
  });
});
   
