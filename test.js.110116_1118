var async = require('async');

function onRequest(req, res) {
    res.writeHead(200, {
        "Content-Type" : "text/plain"
    });

    async.parallel([ function(callback) {
        var testS = "kurt";
        console.log(testS);
        res.write('a');
        res.write('b');
        res.write('c\n');
        callback(null, testS);
    }, function(callback) {
        console.log("dsaf");
        res.write('x');
        res.write('y');
        res.write('z\n');
        callback(null, res);
    } ], function done(err, results) {
        if (err) {
            throw err;
        }
        res.end("\nDoxxne!");
        console.log(results[0]);
    });

}

var server = require('http').createServer(onRequest);
server.listen(9000);
