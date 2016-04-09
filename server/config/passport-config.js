var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function (username, password, done) {
        User.findOne({'local.email': username}, function (err, user) {
            if (err) {
                return done(err);
            } else if (!user) {
                return done(null, false, {
                    error: 'Such user not registered'
                });
            } else if (!user.validatePassword(password)) {
                return done(null, false, {
                    error: 'Incorrect credentials'
                });
            } else {
                return done(null, user);
            }
        })
    }
));

