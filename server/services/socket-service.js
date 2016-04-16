var _ = require('underscore');
var User = require('../models/user');
var UserService = require('../services/user-service');
var FriendService = require('../services/friend-service');

var SocketService = function (options) {
    var that = this;
    this.io = options.io;
    var connectedUsers = [];

    this.init = function () {
        this.io.on('connection', function (socket) {
            console.log('New socket ' + socket.id);

            socket.on('fe_user_logged_in', function (data) {
                console.log('User with id ' + data.userId + " connected!");
                that.connectUser(socket, data.userId);
                console.log('Connected users: ' + connectedUsers.length);
                UserService.login(data.userId);
                UserService.getUserById(data.userId).then(function (user) {
                    var friends = user.friends;
                    _.each(friends, function (friend) {
                        var friendConnection = that.getConnectionByUserId(friend.userId);
                        if (friendConnection) {
                            console.log('Sending message to friend');
                            friendConnection.socket.emit('be_user_logged_in', {
                                userId: data.userId
                            })
                        }
                    })
                })
            });

            socket.on('disconnect', function () {
                console.log('Socket ' + socket.id + " disconnected");
                var connection = that.getConnectionBySocket(socket);
                if (connection) {
                    that.disconnectUser(socket);
                    console.log('Connected users: ' + connectedUsers.length);
                    UserService.logout(connection.userId);
                    UserService.getUserById(connection.userId).then(function (user) {
                        _.each(user.friends, function (friend) {
                            var friendConnection = that.getConnectionByUserId(friend.userId);
                            if (friendConnection) {
                                friendConnection.socket.emit('be_user_logged_out', {
                                    userId: connection.userId
                                });
                            }

                        })
                    });
                }
            });

            /*socket.on('offer_friendship', function (data) {
             FriendService.offerFriendship(data.currentUserId, data.userId);
             console.log(data.currentUserId);
             console.log(data.userId);
             var userConnection = that.getConnectionByUserId(data.userId);
             if (userConnection) {
             userConnection.socket.emit("friendship_request", {
             userId: data.currentUserId
             });
             }
             });*/

            /*socket.on('accept_friendship', function (data) {
             FriendService.addToFriends(data.currentUserId, data.userId);
             var userConnection = that.getConnectionByUserId(data.userId);
             if (userConnection) {
             userConnection.socket.emit("friendship_request_accepted", {
             userId: data.currentUserId
             });
             }
             })*/

        });
    }


    this.connectUser = function (socket, userId) {
        connectedUsers.push({
            socket: socket,
            userId: userId
        });
    }

    this.disconnectUser = function (socket) {
        connectedUsers = _.reject(connectedUsers, function (connection) {
            return connection.socket.id == socket.id;
        })
    }

    this.getConnectionBySocket = function (socket) {

        var connection = _.find(connectedUsers, function (oneConnection) {
            return oneConnection.socket.id == socket.id;
        });
        return connection;
    }

    this.getConnectionByUserId = function (userId) {
        var connection = _.find(connectedUsers, function (oneConnection) {
            return oneConnection.userId == userId;
        });
        return connection;
    }

}

module.exports = SocketService;