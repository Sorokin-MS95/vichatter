var User = require('../models/user');
var _ = require('underscore');
var timeUtil = require('../utils/time-util');


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
            user.lastLogin = timeUtil.getLocalDate(new Date());
            user.save();
        }
    })
}


var getUserById = function (userId) {
    return User.findById(userId);
}


module.exports = {
    login: login,
    logout: logout,
    getUserById: getUserById
}