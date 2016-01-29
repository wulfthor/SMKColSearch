var mongoose = require('mongoose');
var CommSchema = mongoose.Schema;

var commentModel = new CommSchema({
    id: String,
    comment: String,
    updated_at : Date
});

module.exports = mongoose.model('Comment',commentModel, 'smkdata');
