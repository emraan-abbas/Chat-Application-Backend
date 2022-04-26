const express = require('express');
const router = express();

const userController = require('../Controllers/user.controller');


router.post('/post-user', userController.postUser);

module.exports = router;