var User = require('../models/user');
var _ = require('underscore');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

var searchUser = function (req, res) {
    var currentUserId = req.payload.id;
    var nicknameReqex = req.query.nickname;
    console.log(nicknameReqex);
    var result = [];
    User.find(
        {
            $and: [
                {
                    "local.nickname": {$regex: new RegExp(nicknameReqex, 'i')}
                },
                {
                    "friends.userId": {$ne: currentUserId}
                }, {
                    "_id": {$ne: currentUserId}
                }
            ]
        }, function (err, users) {
            var result = [];
            if (users.length == 0) {
                sendJsonResponse(res, 200, {
                    status: 0,
                    payload: {
                        add_friend_list: {
                            list: result,
                            count: 0
                        }
                    }
                })
            } else {
                _.each(users, function (user) {
                    var requestedFlag = _.contains(user.addRequests, currentUserId);
                    result.push({
                        id: user._id,
                        email: user.local.email,
                        nickname: user.local.nickname,
                        online: user.online,
                        requested: requestedFlag
                    })
                })

                sendJsonResponse(res, 200, {
                    status: 0,
                    payload: {
                        add_friend_list: {
                            list: result,
                            count: users.length
                        }

                    }
                })
            }
        });
}

module.exports = {
    searchUsers: searchUser
}
