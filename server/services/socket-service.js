var _ = require('underscore');
var User = require('../models/user');
var UserService = require('../services/user-service');
var MessageService = require('../services/message-service');
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


                socket.on('fe_message_notification', function (data) {
                    MessageService.saveMessage(data.userId, data.friendId, data.content).then(function (message) {
                        UserService.getUserById(data.userId).then(function (user) {
                            var friend = _.find(user.friends, function (friend) {
                                return friend.userId == data.friendId;
                            });
                            friend.messages.push(message._id);
                            friend.lastMessage = message._id;
                            user.save();
                        });


                        UserService.getUserById(data.friendId).then(function (user) {
                            var friend = _.find(user.friends, function (friend) {
                                return friend.userId == data.userId;
                            });
                            friend.messages.push(message._id);
                            friend.lastMessage = message._id;
                            user.save();
                        });

                        var userConnection = that.getConnectionByUserId(data.userId);
                        if (userConnection) {
                            userConnection.socket.emit('be_message_notification', {
                                id: message._id,
                                sender_id: message.senderId,
                                receiver_id: message.receiverId,
                                text: message.content,
                                timestamp: message.date
                            });
                        }

                        var friendConnection = that.getConnectionByUserId(data.friendId);
                        if (friendConnection) {
                            friendConnection.socket.emit('be_message_notification', {
                                id: message._id,
                                sender_id: message.senderId,
                                receiver_id: message.receiverId,
                                text: message.content,
                                date: message.date
                            });
                        } else {
                            UserService.getUserById(data.friendId).then(function (user) {
                                var friend = _.find(user.friends, function (friend) {
                                    return friend.userId == data.userId;
                                });
                                friend.unreadMessages++;
                                user.save();
                            });
                        }
                    });
                });


                socket.on('fe_add_friend_notification', function (data) {
                    var senderId = data.senderId;
                    var userId = data.userId;

                    FriendService.addToFriends(senderId, userId);
                    var receiverConnection = that.getConnectionByUserId(userId);
                    if (receiverConnection) {
                        UserService.getUserById(senderId).then(function (user) {
                            receiverConnection.socket.emit('be_add_friend_notification', {
                                id: user._id,
                                email: user.local.email,
                                nickname: user.local.nickname,
                                online: user.online
                            });
                        });
                    }
                });


                socket.on('fe_user_friendship_request', function (data) {
                    var currentUserId = data.currentUserId;
                    var userId = data.userId;
                    UserService.getUserById(userId).then(function (user) {
                        var request = _.find(user.addRequests, function (obj) {
                            return obj.userId == currentUserId
                        });
                        if (!request) {
                            user.addRequests.push({
                                userId: currentUserId
                            });
                            user.save();
                            var userConnection = that.getConnectionByUserId(userId);
                            if (userConnection) {
                                UserService.getUserById(currentUserId).then(function (user) {
                                    userConnection.socket.emit('be_user_friendship_request', {
                                        id: user._id,
                                        email: user.local.email,
                                        nickname: user.local.nickname,
                                        online: user.online
                                    });
                                });
                            }
                        }
                    })
                });


                socket.on('fe_video_call_request', function (data) {
                    var userConnection = that.getConnectionByUserId(data.friendId);
                    if (userConnection) {
                        UserService.getUserById(data.currentUserId).then(function (user) {
                            userConnection.socket.emit('be_video_call_request', {
                                id: user._id,
                                nickname: user.local.nickname
                            });
                        })

                    }

                });

                socket.on('fe_video_allowed', function (data) {
                    var currentUserId = data.currentUserId;
                    var userId = data.userId;
                    var userConnection = that.getConnectionByUserId(userId);
                    if (userConnection) {
                        userConnection.socket.emit('be_video_allowed', {
                            userId: currentUserId
                        });
                    }
                })

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


                socket.on('fe_sdp_call_offer', function (data) {
                    var userId = data.userId;

                    console.log('FE offer from' + data.currentUserId);
                    var userConnection = that.getConnectionByUserId(userId);

                    if (userConnection) {
                        userConnection.socket.emit('be_sdp_call_offer', {
                            userId: data.currentUserId,
                            sdp: data.sdp
                        });
                    }
                });

                socket.on('fe_sdp_call_answer', function (data) {
                    var userConnection = that.getConnectionByUserId(data.userId);
                    console.log('FE answer from' + data.currentUserId);

                    if (userConnection) {
                        userConnection.socket.emit('be_sdp_call_answer', {
                            userId: data.userId,
                            sdp: data.sdp
                        });
                    }


                    console.log('GOT ANSWER');
                });


                socket.on('fe_ice_candidate', function (data) {
                    var userConnection = that.getConnectionByUserId(data.userId);

                    if (userConnection) {
                        userConnection.socket.emit('be_ice_candidate', {
                            userId: data.userId,
                            candidate: data.candidate
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

            }
        );
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