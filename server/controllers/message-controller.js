var Message = require('../models/message');
var User = require('../models/user');
var _ = require('underscore');
var MessageService = require('../services/message-service');
var UserService = require('../services/user-service');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


var getMessages = function (req, res) {
    var currentUserId = req.payload.id;
    var userId = req.params.userId;
    var page = req.query.page;
    var count = req.query.count;

    UserService.getUserById(currentUserId).then(function (user) {
        var friend = _.find(user.friends, function (friend) {
            return friend.userId == userId;
        })

        var result = [];
        var messages = friend.messages.reverse().slice((page - 1) * count, count);
        var counter = messages.length;
        if (counter == 0) {
            sendJsonResponse(res, 200, {
                status: 0,
                payload: {
                    messages: result
                }
            })
        } else {
            _.each(messages, function (message) {
                Message.getMessageById(message).then(function (message) {
                    UserService.getUserById(message.senderId).then(function (user) {
                        result.push({
                            id: message._id,
                            sender_id: user._id,
                            content: message.content,
                            date: message.date,
                            email: user.email
                        });
                        counter--;
                        if (counter == 0) {
                            sendJsonResponse(res, 200, {
                                status: 0,
                                payload: {
                                    messages: result
                                }
                            });
                        }
                    });
                });
            })
        }


    })


}


module.exports = {
    getMessages: getMessages
}