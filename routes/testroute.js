var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var Promise = require('bluebird');
var async = require('async');


router.get('/', function(req,res) {

    //var color = req.query['color'];
    //var hits = req.query['hits'];
    var awArray = new Array();
    var color = 'e8e5e0';
    var hits = 20;

    async.waterfall([
            function getKMSfromCol(callback) {
                var retVal = '';
                querystring = color + "&fl=id,termfreq('color_text'," + color + ")&wt=json&rows=" + hits;
                request({
                    uri: 'http://172.20.1.61:8983/solr/colors/' + 'select?q=' + querystring,
                    method: 'GET'
                }, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        callback(error, null);
                        return;
                    } else {
                        var retval = JSON.parse(body);
                        console.log(response.statusCode, JSON.stringify(retval.response.docs));
                    }
                    console.log("out");
                    callback(null,retval.response.docs);
                });

            }],
        function (err, result) {
            console.log("done");
            //console.log(JSON.stringify(result));
            result.forEach(function(item) {
                console.log(JSON.stringify(item));
            })

        });

    res.send("hall");


});


module.exports = router;
