const express = require('express');
const router = express.Router();
// Only for webhook mode if used
router.post('/', (req, res) => {
  res.sendStatus(200);
});
module.exports = router;
