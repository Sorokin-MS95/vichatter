var User = require('../models/user');
var _ = require('underscore');


var login = function (userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            user.online = true;
            user.save();
        }
    })
}

var logout = function (userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            user.online = false;
            user.lastLogin = new Date();
            user.save();
        }
    })
}

var getUserFriendsIds = function (userId) {
    var result = [];
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            _.each(user.friends, function (friend) {
                result.push(friend.userId);
            });
            return result;
        }
    })
};


module.exports = {
    login: login,
    logout: logout,
    getUserFriendsIds: getUserFriendsIds
}