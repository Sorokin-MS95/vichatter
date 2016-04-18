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
        });

        var result = [];

        var promise = Message.find({}).sort({"date": -1}).skip((page - 1) * count).limit(count);
        promise.then(function (messages) {
            
            if (messages.length == 0) {
                sendJsonResponse(res, 200, {
                    status: 0,
                    payload: {
                        messages: result
                    }
                });
            } else {
                var counter = messages.length;

                _.each(messages, function(message){
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
                        });
                    }
                })
            }
        })

    });
};



module.exports = {
    getMessages: getMessages
}