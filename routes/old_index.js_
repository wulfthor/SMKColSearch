var express = require('express');
var router = express.Router();
var g = require('glob');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("into index");
    g('public/data/images/*jpg', function (er, files) {
      console.log("into glob");
        if (er) {
            console.log(er);
        }
        files.forEach(function(file) {
            console.log(file);
        });
        var mFiles = files.map(function(val) {
            return {
                'name': val.replace("public",""),
                'hiname': val.replace("public","")
            }
        });

        res.render('index', {
            galleries: mFiles,
            title: 'Color Search'
        });
    });
    console.log("trest");
});

module.exports = router;
