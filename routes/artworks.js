var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

router.get('/', function(req,res) {
    console.log(req.query['color']);
    console.log(req.query['numberofhits']);
    console.log("ixnto ");
    var color = req.query['color'];
    var hits = req.query['hits'];
    //var querystring = req.query['startdate'] + '%20TO%20' + req.query['enddate'];
    //var querystring = req.query['startdate'] + '%20TO%20' + req.query['enddate'];
    // curl -s http://172.20.1.61:8983/solr/$core/
    // select?q=$color\&fl=id,termfreq\('color_text',$color\)\&wt=csv\&indent=true\&rows=$rows\&sort=score%20desc

    querystring = color + "&fl=id,termfreq('color_text'," + color + ")&wt=json&rows=" + hits;
    if (typeof req.query['color'] !== 'undefined') {
        var options = {
            uri: 'http://172.20.1.61:8984/solr/colors/' +
            'select?q=' +querystring,
            method: 'GET'
        }

        console.log("OP" + JSON.stringify(options));

        request(options, function (err, response, data) {
            console.log("do xxreq");
            //console.log(data);
            if (err) {
                console.log(err);
            }


            //console.log('HEADERS: ' + JSON.stringify(data));
            var mData = JSON.parse(data.body);
            console.log("her ..");
            //console.log(JSON.stringify(mData))
            console.log("her ..");

            res.send('hejj');

        });
    }
});

module.exports = router;
