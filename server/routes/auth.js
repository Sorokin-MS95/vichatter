var router = require('express').Router();
var passportConfig = require('../config/passport-config');

router.post('/user/signin', passportConfig.localLoginStrategy);
router.post('/user/signup', passportConfig.localRegistrationStrategy);

module.exports = router;





