const express = require('express');
const router = express.Router();
const { replyToUser } = require('../controllers/messageController');

router.post('/', replyToUser);

module.exports = router;
