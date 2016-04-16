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
                    status: 1,
                    message : "Such user not registered",
                    payload : {
                        form_error : "email"
                    }
                });
            } else if (!user.validatePassword(password)) {
                return done(null, false, {
                    status: 1,
                    message : "Incorrect credentials",
                    payload : {
                        form_error : {
                            fieldName : "email",
                        }
                    }
                });
            } else {
                return done(null, user);
            }
        })
    }
));

