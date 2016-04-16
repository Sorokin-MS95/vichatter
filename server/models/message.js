var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    senderId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Schema.Types.ObjectId,
    content: String,
    date: Date
})


module.exports = mongoose.model('Message', Message);