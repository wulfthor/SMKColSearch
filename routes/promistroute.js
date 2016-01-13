var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    Promise.try(function(){
        return doSomeAsyncThing();
    }).then(function(value){
        return doAnotherAsyncThing(value);
    }).then(function(newValue){
        res.send("Done!");
    }).catch(function(err){
        next(err);
    });
});

module.exports = router;
