var passport = require('passport');
var User = require('../models/user');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}


module.exports.signup = function (req, res) {
    User.findOne({"local.email": req.body.email}, function (err, user) {
        if (user) {
            sendJsonResponse(res, 400, {
                status: 0,
                validation_status: {
                    success: false,
                    message: "Such email registered",
                    form_error: {
                        fieldName: "email"
                    }
                },
                payload: {}
            });
        } else {
            User.findOne({"local.nickname": req.body.nickname}, function (err, user) {
                if (user) {
                    sendJsonResponse(res, 400, {
                        status: 0,
                        validation_status: {
                            success: false,
                            message: "Such nickname registered",
                            form_error: {
                                fieldName: "nickname"
                            }
                        },
                        payload: {}
                    });
                } else {
                    //can be created
                    var user = new User();
                    user.local.email = req.body.email;
                    user.local.nickname = req.body.nickname;
                    user.hashPassword(req.body.password);
                    user.save(function (err) {
                        if (err) {
                            sendJsonResponse(res, 404, err);
                        } else {
                            sendJsonResponse(res, 200, {
                                status: 0,
                                validation_status: {
                                    success: true,
                                    message: "You have been successfully registered",
                                    form_error: {}
                                },
                                payload: {
                                    token: user.generateJwt(),
                                    userId: user_id
                                }
                            });
                        }
                    })
                }
            })
        }
    })

}


module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            sendJsonResponse(res, 404, err);
        }
        if (user) {
            sendJsonResponse(res, 200, {
                status: 0,
                validation_status: {
                    success: true,
                    message: "Successfully logged in",
                    form_error: {}
                },
                payload: {
                    token: user.generateJwt(),
                    userId: user._id
                }
            });
        } else {
            sendJsonResponse(res, 401, info);
        }
    })(req, res);
}

