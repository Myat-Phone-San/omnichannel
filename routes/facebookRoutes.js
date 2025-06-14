const express = require('express');
const router = express.Router();
const fb = require('../controllers/facebookController');

router.get('/', fb.verifyWebhook);
router.post('/', fb.handleWebhook);

module.exports = router;
