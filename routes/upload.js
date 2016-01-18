var express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , path = require('path')
    , crypto = require('crypto')
    , mime = require('mime')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("into stor" + file.originalname);
        //cb(null, __dirname + '../public/uploads/')
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, 'colormap'+ '.' + mime.extension(file.mimetype));
            //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

var upload = multer({ storage: storage });


router.post('/', upload.single('image'), function (req, res) {
    console.log("POST");
    res.redirect('/');
});

/*
var upload = multer({dest: 'uploads/'});
var type = upload.single('image');


router.post('/', upload.single('image'), function (req, res, next) {
    console.log("doppne");
    res.send("done");

});
*/
module.exports = router



