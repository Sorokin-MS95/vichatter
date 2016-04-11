var User = require('../models/user');


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
    console.log(userId);
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


module.exports = {
    login : login,
    logout : logout
}