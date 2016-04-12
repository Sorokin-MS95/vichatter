var User = require('../models/user');
var _ = require('underscore');


var offerFriendship = function (currentUserId, userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            user.addRequests.push({
                userId: currentUserId
            });
            user.save();
        }
    })
};

var addToFriends = function (currentUserId, userId) {
    User.findById(currentUserId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            //todo test!
            user.addRequests = _.reject(user.addRequests, function (request) {
                return request.userId === userId;
            });

            user.friends.push({
                userId: userId,
                unreadMessages: 0
            });
            user.save();
        }
    })
}


module.exports = {
    offerFriendship: offerFriendship,
    addToFriends: addToFriends
}