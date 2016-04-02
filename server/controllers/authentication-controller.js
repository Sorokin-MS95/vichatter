var User = require('../models/user');


function signup(req, res) {
    var body = req.body;
    var user = new User();
    user.local.email = body.email;
    user.local.password = user.hashPassword(req.password);
    user.local.nickname = body.nickname;
    user.save(function(err, user){
        if (err){
            res.status(200).json({
                error : "Error occured",
                message : err
            });

        }
        else {
            console.log(user);
            res.status(200).json({
                success : "User has been created"
            });
        }
    });
}

function signin(req, res) {
    var body = req.body;
    console.log(body);
    var user = new User();
    User.findOne({"local.email": body.email}, function (err, user) {
        if (err) {
            res.status(500).json({
                error: err
            });
        }

        if (user) {
            if (user.validatePassword(body.password)) {
                res.status(200).json({
                    message: 'You can login!'
                });
            } else {
                res.status(200).json({
                    message: 'No such user found!'
                });
            }
        }
    });
}


module.exports.signup = signup;
module.exports.signin = signin;