var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./server/config/app-config');
var authRoutes = require('./server/routes/auth');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.set('socketio', io);

io.on('connection', function(socket){
    console.log('connected!');
})


app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/app', express.static(__dirname + "/app"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/public', express.static(__dirname + "/app/public"));


app.use('/api', authRoutes);

mongoose.connect(config.database.dburl.concat(config.database.dbname), function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Connected to database ' + config.database.dbname);
    }
});


app.get('/', function (req, res) {
    res.sendfile("index.html");
})


app.listen(config.app.port, function () {
    console.log('Server up and running on port ' + config.app.port);
})