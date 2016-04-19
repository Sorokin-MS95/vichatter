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

    var promise = Message.find({
        $or: [
            {
                $and: [
                    {
                        "receiverId": currentUserId
                    },
                    {
                        "senderId": userId
                    }
                ]
            },
            {
                $and: [
                    {
                        "receiverId": userId
                    },
                    {
                        "senderId": currentUserId
                    }
                ]
            }
        ]
    }).sort({"date": -1}).skip((page - 1) * count).limit(count);
    promise.then(function (messages) {
        var result = [];
        var count = messages.length;
        if (count > 0) {
            var counter = messages.length;
            _.each(messages, function (message) {
                var promise = UserService.getUserById(message.senderId);
                promise.then(function (user) {
                    result.push({
                        id: message._id,
                        sender_id: message.senderId,
                        text: message.content,
                        timestamp: message.date,
                        email: user.email
                    });
                    counter--;
                    if (counter == 0) {
                        sendJsonResponse(res, 200, {
                            status: 0,
                            payload: {
                                messages: result
                            }
                        })
                    }
                })


            })
        } else {
            sendJsonResponse(res, 200, {
                status: 0,
                payload: {
                    messages: result
                }
            })


        }

    });
}

module.exports = {
    getMessages: getMessages
}