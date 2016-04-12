var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new Schema({
    local: {
        email: {
            type: String,
            lowercase: true
        },
        nickname: {
            type: String
        },
        hash: {
            type: String
        },
        salt: {
            type: String
        }
    },
    online: {
        type: Boolean
    },
    lastLogin: {
        type: Date
    },
    friends: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            unreadMessages: {
                type: Number
            }
        }
    ],
    addRequests : [{
        userId: mongoose.Schema.Types.ObjectId
    }]
});

User.methods.hashPassword = function (password) {
    this.local.salt = crypto.randomBytes(16).toString('hex');
    this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
}

User.methods.validatePassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
    return this.local.hash === hash;
}

User.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        id: this._id,
        email: this.local.email,
        name: this.local.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', User);