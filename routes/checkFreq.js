var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

//curl -s http://172.20.1.61:8984/solr/colors/terms?terms.fl=color_text\&terms.sort=count\&terms.limit=$limit\&terms.prefix=$prefix


router.get('/', function(req,res) {
    console.log((req));
    //var color = req.color.replace("#","");
    var color = "e8e5e0";
    color = color.toLowerCase();
    var lookupCol = color;
    if ((color.length) == 6) {
        lookupCol = color.slice(0, -1);
    }
    //var hits = req.body.hits;
    var hits = 20;
    console.log("PARAM " + color + " n " + hits);
    var retVal = '';
    querystring = "terms?terms.fl=color_text\&terms.sort=count\&terms.limit="+hits+"\&terms.prefix="+ lookupCol + "&indent=true&wt=json&omitHeader=true";
    console.log("QS: " + querystring);
    request({
        uri: 'http://172.20.1.61:8984/solr/colors/' + querystring,
        method: 'GET'
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(body);
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
            res.send('howdy');
        }
        console.log("out");
    });
});

module.exports = router;