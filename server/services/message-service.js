var Message = require('../models/message');
var User = require('../models/user');
var _ = require('underscore');

var UserService = require('../services/user-service');

var saveMessage = function (senderId, receiverId, content) {
    var newMessage = new Message();
    newMessage.senderId = senderId;
    newMessage.receiverId = receiverId;
    newMessage.content = content;
    newMessage.date = new Date();
    //todo promise
    newMessage.save(function (err) {
        UserService.getUserById(senderId).then(function (user) {
            var friend = _.find(user.friends, function (friend) {
                return friend.userId == receiverId;
            });
            friend.messages.push(newMessage._id);
            friend.lastMessage = message._id;
            friend.save();
        });
        UserService.getUserById(receiverId).then(function (user) {
            var friend = _.find(user.friends, function (friend) {
                return friend.userId == senderId;
            })
            friend.messages.push(newMessage._id);
            friend.lastMessage = message._id;
            friend.save();
        })
    });
};


var getMessageById = function (messageId) {
    return Message.findById(messageId);
}


module.exports = {
    saveMessage: saveMessage,
    getMessageById : getMessageById
}