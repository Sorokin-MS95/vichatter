_ = require('underscore');
var User = require('../models/user');
var UserService = require('../services/user-service');

var SocketService = function (options) {
    var that = this;
    this.io = options.io;
    var users = [];

    this.init = function () {
        this.io.on('connection', function (socket) {
            socket.on('user_logged_in', function (data) {

                that.addUser(socket, data.userId);
                UserService.login(data.userId);
            });
            socket.on('disconnect', function () {
                UserService.logout(that.getUser(socket).userId);
            })
        });
    }


    this.addUser = function (socket, userId) {
        users.push({
            socket: socket,
            userId: userId
        });
    }

    this.getUser = function (socket) {
        var user = _.find(users, function (user) {
            return user.socket.id === socket.id;
        });
        return user;
    }

}

module.exports = SocketService;