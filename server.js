var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var AuthenticationController = require('./server/controllers/authenticationController');



mongoose.connect('mongodb://localhost:27017/vichatter');

app.use('/app', express.static(__dirname + "/app"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/public', express.static(__dirname + "/app/public"));


//Authentication
app.post('/api/user/signup', AuthenticationController.signup);


app.get('/', function (req, res) {
    res.sendfile("index.html");
})


app.listen('3000', function () {
    console.log('Server up and running on port 3000');
})