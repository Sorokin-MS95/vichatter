var passport = require('passport');
var jwt = require('passport-jwt');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

localLoginStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, function (req, username, password, done) {
        User.findOne({'local.email': username}, function (err, user) {
            if (err) {
                return done(err);
            } else if (!user) {
                return req.res.status(200).json({
                    message: 'Such user not registered'
                });
            } else if (!user.validatePassword(password)) {
                return req.res.status(200).json({
                    message: 'Incorrect email or password'
                });
            } else {
                //todo jwt
                return req.res.status(200).json({
                    message: 'Successful signin',
                    token: 'Token',
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
            User.findOne({"local.nickname": req.nickname}, function (err, user) {
                if (err) {
                    return done(err);
                } else if (!user) {
                    // can be created!
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.hashPassword(password);
                    newUser.local.nickname = req.nickname;
                    newUser.save();
                    return req.res.status(200).json({
                        message: "User has been created",
                        email: email
                    });
                } else {
                    return req.res.status(200).json({
                        message: "Such nickname registered"
                    });
                }
            })
        } else {
            return req.res.status(200).json({
                message: "Such email registered"
            });
        }
    });
});


passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localRegistrationStrategy);

/*passport.serializeUser(function (user, callback) {
 callback(null, user.id);
 });

 //	user deserializer
 passport.deserializeUser(function (id, callback) {
 User.findById(id, function (err, user) {
 callback(err, user);
 })
 });*/


module.exports = {
    localLoginStrategy: passport.authenticate('local-login'),
    localRegistrationStrategy: passport.authenticate('local-signup')
}
