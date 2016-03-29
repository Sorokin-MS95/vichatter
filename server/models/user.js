var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var User = new Schema({
    email : String,
    password : String,
    nickname : String
});

User.methods.hashPassword  = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
}

User.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);