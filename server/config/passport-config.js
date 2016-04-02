var passport = require('passport');
var appConfig = require('./app-config');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');


localLoginStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            } else if (!user) {
                return req.res.status(200).json({
                    error: 'Such user not registered'
                });
            } else if (!user.validatePassword(password)) {
                return req.res.status(200).json({
                    error: 'Incorrect email or password'
                });
            } else {
                var token = jwt.sign(user, appConfig.jwt.secret, {
                    expiresIn : 10
                });
                console.log(token);
                user.token = token;
                user.save();
                return req.res.status(200).json({
                    success: 'Successful signin',
                    token: token,
                    userId: user._id
                });
            }
        })
    }
);

localRegistrationStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, function (req, email, password, done) {
    User.findOne({"local.email": email}, function (err, user) {
        if (err) {
            return done(err)
        } else if (!user) {
            User.findOne({"local.nickname": req.body.nickname}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (!user) {
                    // can be created!
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.hashPassword(password);
                    newUser.local.nickname = req.body.nickname;
                    newUser.save();
                    return req.res.status(200).json({
                        success: "User has been created",
                        email: email
                    });
                } else {
                    return req.res.status(200).json({
                        error: "Such nickname registered"
                    });
                }
            })
        } else {
            return req.res.status(200).json({
                error: "Such email registered"
            });
        }
    });
});


passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localRegistrationStrategy);


module.exports = {
    localLoginStrategy: passport.authenticate('local-login'),
    localRegistrationStrategy: passport.authenticate('local-signup')
}
