var User = require('../models/user');
var mongoose = require('mongoose');
var mongooseQ = require('mongoose-q')(mongoose);

var UserService = require('./user-service');
var _ = require('underscore');

var getProfileData = function (userId) {
    User.findById(userId, function (err, user) {
        if (err) {
            throw new Error;
        } else {
            if (user) {
                var profile_info = {
                    nickname: user.local.nickname,
                    email: user.local.email
                };
                var friend_list = [];
                _.each(user.friends, function (friend) {


                        var x = User.findById(friend.userId, function (err, result) {
                            if (user) {
                                var res = {
                                    id: result._id,
                                    email: result.local.email,
                                    unread_messages_count: friend.unreadMessages,
                                    online: result.online
                                }

                                friend_list.push(res);
                            }
                        })

                        x.then(function () {
                            var friendsCount = user.friends.length;
                            //if requests >0
                            var y = _.each(user.addRequests, function (request) {
                                User.findById(request.userId, function (err, user) {
                                    console.log(user);
                                    var friendRequest = {
                                        id: user._id,
                                        nickname: user.local.nickname,
                                        email: user.local.email
                                    }
                                    add_friend_list.push(friendRequest);
                                });
                            });

                            console.log("lol");
                            var requestCount = user.addRequests.length;
                            var add_friend_list = [];
                            var profile = {
                                status: 0,
                                payload: {
                                    friend_list: {
                                        list: friend_list,
                                        count: friendsCount
                                    },
                                    add_friend_list: {
                                        list: add_friend_list,
                                        count: requestCount
                                    },
                                    profile_info: profile_info
                                }
                            }
                            console.log(profile);

                        });

                    }
                )

            }
        }
    })
}

module.exports = {
    getProfileData: getProfileData
}