var router = require('express').Router();
var authController = require('../controllers/authentication-controller');
var profileController = require('../controllers/profile-controller');
var friendController = require('../controllers/friend-controller');
var messageController = require('../controllers/message-controller');
var userController = require('../controllers/user-controller');
var jwt = require('express-jwt');


var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken: function (req) {
        if (req.headers.access_token) {
            return req.headers.access_token;
        } else return null;
    }
});

//AuthController
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

//ProfileController
router.get('/profile', auth, profileController.getProfile);

//FriendController
router.get('/friends', auth, friendController.getFriends);
router.post('/friend/request/', auth, friendController.requestFriend);
router.post('/friend/add', auth, friendController.addToFriends);
router.post('/friend/decline', auth, friendController.declineRequest);

//MessageController
router.get('/users/:userId/messages', auth, messageController.getMessages);

//UserController
router.get('/users/search', auth, userController.searchUsers);

module.exports = router;





