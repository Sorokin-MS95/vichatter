var User = require('../models/user');
var _ = require('underscore');


var offerFriendship = function (currentUserId, userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            if (user) {
                user.addRequests.push({
                    userId: currentUserId
                });
                user.save();
            }

        }
    })
};

var addToFriends = function (currentUserId, userId) {
    User.findById(currentUserId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            if (user) {
                user.addRequests = _.reject(user.addRequests, function (request) {
                    return request.userId == userId;
                });

                user.friends.push({
                    userId: userId,
                    unreadMessages: 0
                });
                user.save();

                User.findById(userId, function (err, user) {
                    if (err) {
                        throw new Error;
                    } else {
                        user.friends.push({
                            userId: currentUserId,
                            unreadMessages: 0
                        })

                        user.save();
                    }
                })
            }


        }
    })
}

var declineRequest = function (currentUserId, userId) {
    User.findById(currentUserId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            if (user) {
                user.addRequests = _.reject(user.addRequests, function (request) {
                    return request.userId == userId;
                });

                user.save();
            }
        }
    })
}

module.exports = {
    offerFriendship: offerFriendship,
    addToFriends: addToFriends,
    declineRequest : declineRequest
}