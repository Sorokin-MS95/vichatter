var router = require('express').Router();
var authController = require('../controllers/authentication-controller');
var profileController = require('../controllers/profile-controller');
var friendController = require('../controllers/friend-controller');
var jwt = require('express-jwt');


var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken : function (req) {
        if (req.headers.access_token) {
            return req.headers.access_token;
        } else return null;
    }
});

router.post('/user/signin', authController.login);
router.post('/user/signup', authController.signup);


router.get('/profile/data', auth, profileController.getProfileData);


//todo no auth!

router.post('/friend/request/', friendController.requestFriend);
router.post('/friend/add', friendController.addToFriends);
router.post('/friend/decline', friendController.declineRequest);

module.exports = router;





