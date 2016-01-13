var expressPromiseRouter = require("express-promise-router");
var router = expressPromiseRouter();

router.get("/", function(req, res){
    return Promise.try(function(){
        return doSomeAsyncThing();
    }).then(function(value){
        return doAnotherAsyncThing(value);
    }).then(function(newValue){
        res.send("Done!");
    });
});

module.exports = router;
