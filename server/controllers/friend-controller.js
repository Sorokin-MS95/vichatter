var User = require('../models/user');
var _ = require('underscore');
var FriendService = require('../services/friend-service');
var UserService = require("../services/user-service");
var MessageService = require('../services/message-service');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


function requestFriend(req, res) {
    var currentUserId = req.payload.id;
    var userId = req.body.userId;
    FriendService.offerFriendship(currentUserId, userId);
    sendJsonResponse(res, 200, {
        status: 0,
        payload: {
            userId: userId,
            success: true,
            message: "Friendship requested"
        }
    });

}

function addToFriends(req, res) {
    var currentUserId = req.payload.id;
    var userId = req.body.userId;

    FriendService.addToFriends(currentUserId, userId);

    var message = {
        userId: userId,
        success: true,
        message: "User added to friends"
    };

    sendJsonResponse(res, 200, newMessage);
}


function declineRequest(req, res) {
    var currentUserId = req.payload.id;
    var userId = req.body.userId;
    FriendService.declineRequest(currentUserId, userId);

    var message = {
        success: true,
        message: "User request declined"
    }

    sendJsonResponse(res, 200, newMessage);
}


function getFriends(req, res) {
    UserService.getUserById(req.payload.id).then(function (user) {
        var friendList = [];
        var count = user.friends.length;
        if (count > 0) {
            //there are friends. Need get them all!
            _.each(user.friends, function (friend) {
                var counter = user.friends.length;
                UserService.getUserById(friend.userId).then(function (user) {
                    var lastMessage = friend.lastMessage;
                    if (lastMessage) {
                        MessageService.getMessageById(friend.lastMessage).then(function (message) {
                            friendList.push({
                                id: user._id,
                                email: user.local.email,
                                last_message: message.content,
                                last_message_time: message.date,
                                nickname: user.local.nickname,
                                unread_messages_count: friend.unreadMessages,
                                online: user.online
                            });
                            counter--;
                            if (counter === 0) {
                                sendJsonResponse(res, 200, {
                                    status: 0,
                                    payload: {
                                        friend_list: {
                                            list: friendList,
                                            count: count
                                        }
                                    }
                                })
                            }
                        });
                    } else {
                        friendList.push({
                            id: user._id,
                            email: user.local.email,
                            nickname: user.local.nickname,
                            unread_messages_count: friend.unreadMessages,
                            online: user.online
                        });
                        counter--;
                        if (counter === 0) {
                            sendJsonResponse(res, 200, {
                                status: 0,
                                payload: {
                                    friend_list: {
                                        list: friendList,
                                        count: count
                                    }
                                }
                            })
                        }
                    }
                })
            });
        } else {
            sendJsonResponse(res, 200, {
                status: 0,
                payload: {
                    friend_list: {
                        list: friendList,
                        count: 0
                    }
                }
            })
        }
    })
}


function getFriendsRequests(req, res) {
    UserService.getUserById(req.payload.id).then(function (user) {
        var requestsList = [];
        var count = user.addRequests.length;
        if (count > 0) {
            //there are friends requests!
            _.each(user.addRequests, function (request) {
                var counter = user.addRequests.length;
                UserService.getUserById(request.userId).then(user)
                {
                    requestsList.push({
                        id: user._id,
                        email: user.local.email,
                        nickname: user.local.nickname
                    });
                    counter--;
                    if (counter == 0) {
                        sendJsonResponse(res, 200, {
                            status: 0,
                            payload: {
                                add_friend_list: {
                                    list: requestsList,
                                    count: count
                                }
                            }
                        })
                    }
                }
            })
        } else {
            sendJsonResponse(res, 200, {
                status: 0,
                payload: {
                    add_friend_list: {
                        list: requestsList,
                        count: 0
                    }
                }
            })
        }
    })
}


module.exports = {
    requestFriend: requestFriend,
    addToFriends: addToFriends,
    declineRequest: declineRequest,
    getFriends: getFriends,
    getFriendsRequests: getFriendsRequests
}