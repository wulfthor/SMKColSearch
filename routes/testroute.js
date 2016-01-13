var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var Promise = require('bluebird');
var async = require('async');


router.post('/', function(req,res) {

    var color = req.body.hex.replace("#","");
    color = color.toLowerCase();
    var hits = req.body.hits;
    console.log("PARAM " + color + " n " + hits);
    async.waterfall([
            function getKMSfromCol(callback) {
                var retVal = '';
                querystring = color + "&fl=id,termfreq('color_text'," + color + ")&wt=json&rows=" + hits;
                console.log("QS: " + querystring);
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
            async.map(result,function(res,cb) {
                console.log("into mm");

                subquerystring = res.id + "&fl=id,medium_image_url,title_dk,artist_name,object_production_date_earliest&wt=json";
                console.log(subquerystring);

                request({
                    uri: 'http://solr-02.smk.dk:8080/solr/prod_all_dk/' + 'select?q=id:' + subquerystring,
                    method: 'GET', //Specify the method

                }, function (error, response, body) {
                    if (error) {
                        cb(error, null);
                        console.log(error);
                    } else {

                        var info = JSON.parse(body);
                        //console.log(info);
                        if (typeof info.response.docs[0] !== 'undefined') {
                            console.log("length:" + info.response.docs.length);
                            console.log(JSON.stringify(info.response.docs[0]));
                            //console.log(JSON.stringify(info.response.docs[0]));
                            //awArray.push(info.response.docs[0]);
                            //cb(null,info.response.docs);
                        }
                    }
                    cb(null, info.response.docs);
                });


            }, function(err, result) {
                console.log("-----");
                console.log(JSON.stringify(result) + "\n");
                console.log("-----");
                console.log(result.length + "\n");
                var toSendArr = new Array();
                var artworks = new Array();
                toSendArr.concat.apply(result);

                result.forEach(function (item) {
                    //var newItem = JSON.parse(item);
                    console.log(item.length);
                    try {
                        console.log(item[0].artist_name);
                        toSendArr.push(item[0]);
                    } catch(e) {
                        console.log("err" + e);
                    }

                });

                newToSendArr = toSendArr.map(function(item) {
                    console.log("chane")
                    item.artist_name = item.artist_name[0];
                })

                res.render('artworks', {
                    titel: 'her er vi',
                    artworks: toSendArr

                 });

                //res.send(toSendArr[0]);
            });
        });

});


module.exports = router;