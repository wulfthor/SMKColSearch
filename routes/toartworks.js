var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var Promise = require('bluebird');
var async = require('async');
var config = require('../env.json').development;


router.post('/', function(req,res) {

    var color = req.body.hex.replace("#","");
    color = color.toLowerCase();
    var hits = req.body.hits;
    var pixel = req.body.pix;
    var years = parseInt(req.body.years);
    var year = parseInt(req.body.year);
    console.log("PARAM " + color + " n " + hits);
    async.waterfall([
            function getKMSfromCol(callback) {
                var retVal = '';
                querystring = color + "&fl=id,termfreq('color_text'," + color + ")&wt=json&rows=" + hits;
                console.log("QS: " + querystring);
                request({
                    uri: 'http://' + config.SOLR_HOST + ':' + config.SOLR_PORT + '/solr/colors/' + 'select?q=' + querystring,
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

                subquerystring = res.id + "&fl=id,medium_image_url,title_dk,artist_name,object_production_date_earliest,object_production_date_text_dk&wt=json";
                console.log("SUB: " + subquerystring);

                request({
                    uri: 'http://' + config.SOLR_SEBHOST + '/solr/prod_all_dk/' + 'select?q=id:' + subquerystring,
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
                    //"object_production_date_earliest":"1954-01-01T00:00:00Z"
                    console.log("D: " + item.object_production_date_earliest);
                    var dateYear = item.object_production_date_earliest.split("-")[0];
                    var control_year_min = year - (years / 2);
                    var control_year_max = year + (years / 2);
                    console.log("CY " + dateYear + " cc " + control_year_max);
                    if ((dateYear > control_year_min ) && (dateYear < control_year_max)) {
                        item.object_production_date_earliest = dateYear;
                    } else {
                        console.log("excluding " + item.object_production_date_earliest);
                    }

                    item.artist_name = item.artist_name[0];
                })

                newToSendArr.sort();

                res.render('artworks', {
                    pixelunit: pixel,
                    titel: 'Artworks',
                    artworks: toSendArr,
                    bgcol: color

                 });

                //res.send(toSendArr[0]);
            });
        });

});


module.exports = router;
