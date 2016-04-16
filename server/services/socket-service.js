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
            socket.on('user_logged_in', function (data) {
                that.connectUser(socket, data.userId);
                console.log('User with id ' + data.userId + " connected!");
                UserService.login(data.userId);
                //notify users that i'm online

                _.each(UserService.getUserFriendsIds(data.userId), function (oneFriendId) {
                    var friendConnection = that.getConnectionByUserId(oneFriendId);
                    if (friendConnection) {
                        friendConnection.socket.emit('user_logged_in', {
                            userId: data.userId
                        })
                    }
                });

            });
            socket.on('disconnect', function () {
                var connection = that.getConnectionBySocket(socket);
                if (connection) {
                    that.disconnectUser(socket);
                    UserService.logout(connection.userId);
                    //notify friends that i'm offline
                    var friends = UserService.getUserFriendsIds(connection.userId);
                    _.each(friends, function (oneFriendId) {
                        var friendConnection = that.getConnectionByUserId(oneFriendId);
                        if (friendConnection) {
                            friendConnection.socket.emit('user_logged_out', {
                                userId: connection.userId
                            });
                        }

                    })
                }
            })

            socket.on('offer_friendship', function (data) {
                FriendService.offerFriendship(data.currentUserId, data.userId);
                console.log(data.currentUserId);
                console.log(data.userId);
                var userConnection = that.getConnectionByUserId(data.userId);
                if (userConnection) {
                    userConnection.socket.emit("friendship_request", {
                        userId: data.currentUserId
                    });
                }
            });

            socket.on('accept_friendship', function (data) {
                FriendService.addToFriends(data.currentUserId, data.userId);
                var userConnection = that.getConnectionByUserId(data.userId);
                if (userConnection) {
                    userConnection.socket.emit("friendship_request_accepted", {
                        userId: data.currentUserId
                    });
                }
            })

            //todo decline friendship

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
            return connection.socket.id === socket.id;
        })
    }

    this.getConnectionBySocket = function (socket) {
        var connection = _.find(connectedUsers, function (oneConnection) {
            return oneConnection.socket.id === socket.id;
        });
        return connection;
    }

    this.getConnectionByUserId = function (userId) {
        var connection = _.find(connectedUsers, function (oneConnection) {
            return oneConnection.userId === userId;
        });
        return connection;
    }

}

module.exports = SocketService;