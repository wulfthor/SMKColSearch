var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var config = require('../env.json').development;
var fs = require('fs');
var im = require('imagemagick');
var spawn = require("child_process").spawn;


// query for term-frequency
//http://172.20.1.61:8984/solr/colors/select/?fl=id,termfreq(color_text,%22111a69%22)&defType=func&q=termfreq(color_text,%22111a69%22)&fq=id:KMS8439

router.post('/', function(req,res) {

    console.log("Body " + JSON.stringify(req.body));
    var pixelunit = req.body.pixunit;
    console.log("P: " + pixelunit);

    subquerystring = req.body.comment + "&fl=id,medium_image_url,title_dk,artist_name,object_production_date_earliest&wt=json";
    console.log(subquerystring);

    request({
        uri: 'http://' + config.SOLR_SEBHOST + '/solr/prod_all_dk/' + 'select?q=id:' + subquerystring,
        method: 'GET', //Specify the method

    }, function (error, response, body) {
        if (error) {
            res.send(error);
            console.log(error);
        } else {

            var info = JSON.parse(body);
            //console.log(info);
            if (typeof info.response.docs[0] !== 'undefined') {
                console.log("length:" + info.response.docs.length);
                console.log(JSON.stringify(info.response.docs[0]));
                // now perform the wget
                var newurl = info.response.docs[0].medium_image_url;
                var prodyear = info.response.docs[0].object_production_date_earliest.split("-")[0];
                var artistname = info.response.docs[0].artist_name[0];
                var arg1 = config.HOME + '/public/uploads/colormappix.png';
                var src = config.HOME + '/public/uploads/colormap.jpg';
                //var arg1 = "/home/thw/git/colosearch/util/" + req.body.newname + ".jpg";
                var arg2 = pixelunit;
                var arg3 = "mytest";
                console.log("a1 " + arg1);
                console.log("a2 " + arg2);
                console.log("a3 " + arg3);

                var picStream = fs.createWriteStream('public/uploads/colormaptmp.jpg');
                picStream.on('close', function() {
                    // now scale
                    // doPixelate.py KMS8355.jpg 50 colormappix
                    im.crop({
                        srcPath: config.HOME + '/public/uploads/colormaptmp.jpg',
                        dstPath:  config.HOME + '/public/uploads/colormap.jpg',
//                        dstPath: 'public/uploads/' + req.body.newname + '.jpg',
                        width: 300,
                        //height: 200,
                        quality: 1,
                        gravity: "North"
                    }, function(err, stdout, stderr) {
                        if (err) {
                            console.log("err " + err);
                        } else {
                            var child = spawn('python',["util/doPixelate.py", src, arg2, arg1]);
                            console.log("done pixel ...");
                            child.stdout.on('close',
                                function (data) {
                                    console.log('done total ..');
                                    res.redirect('/?id='+req.body.comment+'&prodyear='+prodyear+'&artistname='+artistname);
                                }
                            );
                        }
                    });

                });

                request
                    .get(newurl)
                    .on('error', function(err) {
                        console.log(err)
                    })
                    .pipe(picStream);

/*
                res.render('explore', {
                    titel: info.response.docs[0].artist_name + ", " + info.response.docs[0].title_dk,
                    imgsrc: info.response.docs[0].medium_image_url
                });


                res.send("howd");
                 */
            }
        }


    });
    /*

     res.render('artworks', {
     titel: 'her er vi',
     artworks: toSendArr,
     bgcol: color

     });
     */

});


module.exports = router;
