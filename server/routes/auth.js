var router = require('express').Router();
var authController = require('../controllers/authentication-controller');
var jwt = require('express-jwt');


var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.post('/user/signin', authController.login);
router.post('/user/signup', authController.signup);

module.exports = router;





