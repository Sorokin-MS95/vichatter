var Message = require('../models/message');
var User = require('../models/user');
var _ = require('underscore');
var timeUtil = require('../utils/time-util');

var UserService = require('../services/user-service');

var saveMessage = function (senderId, receiverId, content) {
    var newMessage = new Message();
    newMessage.senderId = senderId;
    newMessage.receiverId = receiverId;
    newMessage.content = content;
    newMessage.date = new Date();
    //todo promise
    return newMessage.save();
};


var getMessageById = function (messageId) {
    return Message.findById(messageId);
}


module.exports = {
    saveMessage: saveMessage,
    getMessageById: getMessageById
}