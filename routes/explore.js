var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var config = require('../env.json');
var fs = require('fs');
var im = require('imagemagick');


router.post('/', function(req,res) {

    console.log(JSON.stringify(req.body));


    subquerystring = req.body.comment + "&fl=id,medium_image_url,title_dk,artist_name,object_production_date_earliest&wt=json";
    console.log(subquerystring);

    request({
        uri: 'http://' + config.development.SOLR_SEBHOST + '/solr/prod_all_dk/' + 'select?q=id:' + subquerystring,
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

                var picStream = fs.createWriteStream('public/uploads/colormaptmp.jpg');
                picStream.on('close', function() {
                    // now scale
                    im.crop({
                        srcPath: 'public/uploads/colormaptmp.jpg',
                        dstPath: 'public/uploads/colormap.jpg',
                        width: 200,
                        height: 200,
                        quality: 1,
                        gravity: "North"
                    }, function(err, stdout, stderr) {
                        if (err) {
                            console.log("err " + err);
                        } else {
                            console.log("done");
                            res.redirect('/');
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