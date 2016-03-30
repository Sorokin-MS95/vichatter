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
    };
    return res.status(200).json(answer);
}

function signin(req, res){
    var body= req.body;
    var user = new User();
    //todo refactor!
    User.findOne({"email" : body.email}, function(err,user){
        if(user){
            if (user.validatePassword(body.password)){
                var answer = {
                    status : "User found!"
                }
                res.status(200).json(answer);
            } else {
                var answer = {
                    status : "No such user found!"
                }
                res.status(200).json(answer);
            }
        } else {
            var answer = {
                status : "No such user found! Err"
            }
            res.status(404).json(answer);
        }
    });
}


module.exports.signup = signup;
module.exports.signin = signin;