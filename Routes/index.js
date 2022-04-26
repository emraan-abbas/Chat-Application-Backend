const express = require('express');
const router = express();

const userRoutes = require('./user.routes');
const messageRoutes = require('./message.routes');

router.use('/user',  userRoutes);
router.use('/message', messageRoutes);

module.exports = router;