var express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , path = require('path')
    , crypto = require('crypto')
    , mime = require('mime')
    , im = require('imagemagick')




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("into stor" + file.originalname);
        //cb(null, __dirname + '../public/uploads/')
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, 'colormaptmp.jpg');
            //cb(null, 'colormap'+ '.' + mime.extension(file.mimetype));
            //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

var upload = multer({ storage: storage });


router.post('/', upload.single('image'), function (req, res) {
    console.log("POST");
    console.log(JSON.stringify(req.body));
    im.crop({
        srcPath: 'public/uploads/colormaptmp.jpg',
        dstPath: 'public/uploads/colormap.jpg',
        width: 200,
        height: 200,
        quality: 1,
        gravity: "North"
    }, function(err, stdout, stderr){
        if (err) {
            console.log("err " + err);
        } else {
            console.log("done");
            res.redirect('/');
        }

        // foo
    });
    /*
    im.readMetadata('uploads/colormap.jpg', function(err, metadata){
        if (err) throw err;
        console.log('Shot at '+metadata.exif.dateTimeOriginal);
    });
    */


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



