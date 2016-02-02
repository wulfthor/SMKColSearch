var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var config = require('../env.json').development;

//curl -s http://172.20.1.61:8984/solr/colors/terms?terms.fl=color_text\&terms.sort=count\&terms.limit=$limit\&terms.prefix=$prefix


router.get('/', function(req,res) {
    console.log("R: " + req.query.color);
    console.log(JSON.stringify(config) );
    //R: /?color=e8e5e0&hits=20

    //var color = req.urlreplace("#","");
    //var color = "e8e5e0";
    var color = req.query.color.toLowerCase();
    var lookupCol = color.replace("#","");
    if ((color.length) == 6) {
        lookupCol = color.slice(0, -1);
    }
    //var hits = req.body.hits;
    var hits = req.query.hits;
    console.log("PARAM " + color + " n " + hits);
    var retVal = '';
    querystring = "terms?terms.fl=color_text\&terms.sort=count\&terms.limit="+hits+"\&terms.prefix="+ lookupCol + "&indent=true&wt=json&omitHeader=true";
    console.log("QS: " + querystring);
    request({
        uri: 'http://' + config.SOLR_HOST + ':' + config.SOLR_PORT + '/solr/colors/' + querystring,
        method: 'GET'
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("BO: ");
            //var retval = JSON.parse(body);
            /*
            parseString(body, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("RES:::");
                    console.log(JSON.stringify(result));
                }

            });
            */
            //console.log(response.statusCode, JSON.stringify(body));
            res.send(body);
        }
        console.log("out");
    });
});

module.exports = router;
