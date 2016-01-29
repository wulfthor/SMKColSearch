var commentController = function (comment) {

    var post = function(req,res) {

        if(!req.body.id) {
            res.status(400);
            res.send('id is required');
        } else {
            comment = new comment(req.body);
            console.log(comment);
            comment.save();
            res.status(201);
            res.send(comment);
        }
    };
    var get = function(req,res) {
        console.log("regurl: " + req.url);
        comment.find({},'id comment', function (err, comments) {
            if (err) {
                console.log("GOT E: " + err);
            } else {
                console.log("into jadecall");
                res.render('comments-list', { comments: comments});

                //res.send(testcomments);
            }
        }).limit(10)
    };

    return {
        post: post,
        get: get
    }

};
module.exports = commentController;
