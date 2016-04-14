ProfileService = require("../services/profile-service");
var _ = require("underscore");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


var getProfileData = function (req, res) {
    var userId = req.payload.id;
    var profile = ProfileService.getProfileData(userId);
    sendJsonResponse(res, 200, profile);

}


module.exports = {
    getProfileData: getProfileData
}