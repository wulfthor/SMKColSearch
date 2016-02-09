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
    var sourceid = "";

    if ( typeof req.query.id !== 'undefined' && req.query.id ) {
        console.log(req.query.id);
        sourceid = req.query.id;
    } else {
        console.log("No id");
        sourceid = "KMS0";

    }

    res.render('index', {
            title: 'Search SMK by Colors',
            source: sourceid
        });
});


module.exports = router;
