var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

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
                    status: 0,
                    validation_status: {
                        success: false,
                        message: "Such user not registered",
                        form_error: {
                            fieldName: "email"
                        }
                    },
                    payload: {}
                });
            } else if (!user.validatePassword(password)) {
                return done(null, false, {
                    status: 0,
                    validation_status: {
                        success: false,
                        message: "Incorrect credentials",
                        form_error: {
                            fieldName: "email"
                        }
                    },
                    payload: {}
                });
            } else {
                return done(null, user);
            }
        })
    }
));

