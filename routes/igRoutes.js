// routes/igRoutes.js
const express = require('express');
const router = express.Router();
const ig = require('../controllers/instagramController'); // Correctly points to the controller file

router.get('/', ig.verifyWebhook);
router.post('/', ig.handleWebhook);

module.exports = router;