require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// passport


var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(4000);

var SocketService = require('./server/services/socket-service');
new SocketService({io : io}).init();

var passport = require('passport');
require('./server/config/passport-config');
var apiRoutes = require('./server/routes/apiRoutes');


app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/app', express.static(__dirname + "/app"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/public', express.static(__dirname + "/app/public"));
app.use('/api', apiRoutes);


app.use(function (err, req, res, next) {
    console.error(err);
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

//connecting db
mongoose.connect(process.env.DATABASE_URL.concat(process.env.DATABASE_NAME), function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Connected to database ' + process.env.DATABASE_NAME);
    }
});

//serve static page
app.get('/', function (req, res) {
    res.sendfile("index.html");
})

//starting server
app.listen(process.env.APP_PORT, function () {
    console.log('Server up and running on port ' + process.env.APP_PORT);
})


/*var server = require('http').createServer(app);
 var io = require('socket.io').listen(server);


 app.set('socketio', io);

 io.on('connection', function (socket) {
 console.log('connected!');
 });*/