const express = require('express');
const router = express.Router();
const { verifySignature, handleLineWebhook } = require('../controllers/LineController');
const bodyParser = require('body-parser');

router.post('/', bodyParser.json({ verify: verifySignature }), handleLineWebhook);

module.exports = router;
