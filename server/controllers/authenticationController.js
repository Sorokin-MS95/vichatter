var mongoose = require('mongoose');

var User = require('../models/user');


function signup(req, res){
    var body = req.body;
    var user = new User();
    user.email = body.email;
    user.password = user.hashPassword(req.password);
    user.nickname = body.nickname;
    user.save();
    var answer = {
        success: "User has been created!"
    }
    return res.status(200).json(answer);
}


module.exports.signup = signup;