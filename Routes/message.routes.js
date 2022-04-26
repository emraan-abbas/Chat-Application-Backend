const express = require('express');
const router  = express();

const messageController = require('../Controllers/message.controller');

router.post('/post-message', messageController.postMessage);
router.get('/get-messages', messageController.getMessage);

module.exports = router;