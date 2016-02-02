var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var Promise = require('bluebird');
var async = require('async');
var config = require('../env.json').development;


var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Search SMK by Colors' });
});


module.exports = router;
