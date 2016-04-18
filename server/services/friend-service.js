var User = require('../models/user');
var UserService = require('./user-service');
var _ = require('underscore');


var offerFriendship = function (currentUserId, userId) {
    UserService.getUserById(userId).then(function (user) {
        user.addRequests.push({
            userId: currentUserId
        });
        user.save();
    });
};

var addToFriends = function (currentUserId, userId) {
    UserService.getUserById(currentUserId).then(function (user) {
        user.addRequests = _.reject(user.addRequests, function (request) {
            return request.userId == userId;
        });
        user.friends.push({
            userId: userId,
            unreadMessages: 0
        })
        user.save();
        UserService.getUserById(userId).then(function (user) {
            user.friends.push({
                userId: currentUserId,
                unreadMessages: 0
            });
            user.save();
        })
    });
}


var declineRequest = function (currentUserId, userId) {

    UserService.getUserById(currentUserId).then(function (user) {
        user.addRequests = _.reject(user.addRequests, function (request) {
            return request.userId == userId;
        });
        user.save();
    });
}


module.exports = {
    offerFriendship: offerFriendship,
    addToFriends: addToFriends,
    declineRequest: declineRequest
}