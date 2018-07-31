var express = require('express');
var router = express.Router();
var User=require('../models/user');
var app= require('../app');

   

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
