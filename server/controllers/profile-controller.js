var UserService = require("../services/user-service");
var _ = require("underscore");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


var getProfile = function (req, res) {
    var userId = req.payload.id;
    UserService.getUserById(userId).then(function (user) {
        sendJsonResponse(res, 200, {
            status: 0,
            payload: {
                profile_info: {
                    nickname: user.local.nickname,
                    email: user.local.email
                }
            }
        });
    })
}


var updateProfile = function(req, res){
    var userId = req.payload.id;
    UserService.getUserById(userId).then(function(user){

    })
}


module.exports = {
    getProfile: getProfile,
    updateProfile : updateProfile
}