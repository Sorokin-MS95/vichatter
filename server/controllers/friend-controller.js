var User = require('../models/user');
var _ = require('underscore');
var FriendService = require('../services/friend-service');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


function requestFriend(req, res) {
    var currentUserId = req.body.currentUserId;
    var userId = req.body.userId;

    FriendService.offerFriendship(currentUserId, userId);

    var message = {
        success: true,
        message: "Friendship requested"
    };
    sendJsonResponse(res, 200, message);
}

function addToFriends(req, res) {
    var currentUserId = req.body.currentUserId;
    var userId = req.body.userId;

    FriendService.addToFriends(currentUserId, userId);

    var message = {
        success: true,
        message: "User added to friends"
    };

    sendJsonResponse(res, 200, message);
}


function declineRequest(req, res) {
    var currentUserId = req.body.currentUserId;
    var userId = req.body.userId;
    FriendService.declineRequest(currentUserId, userId);

    var message = {
        success: true,
        message: "User request declined"
    }

    sendJsonResponse(res, 200, message);
}

module.exports = {
    requestFriend: requestFriend,
    addToFriends: addToFriends,
    declineRequest: declineRequest
}