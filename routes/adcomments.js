var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../env.json');
var Comment = require('../models/comment');


router.post('/', function(req,res) {
    console.log("Bx " + JSON.stringify(req.body));
    var resArr = new Array();
        resArr = req.body;
    resArr.forEach(function(item) {
        console.log(item);
    });

    var comment = new Comment({
        id: 'Chris',
        comment: 'password'
    });
    comment.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully!');
        res.send('ok');
    });
});

module.exports = router;
