const crypto = require('crypto');
const db = require('../services/db');

exports.verifySignature = (req, res, buf) => {
  const signature = crypto.createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
    .update(buf)
    .digest('base64');
  const header = req.headers['x-line-signature'];
  if (signature !== header) {
    throw new Error('Invalid signature');
  }
};

exports.handleLineWebhook = async (req, res) => {
  const events = req.body.events;
  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const msg = event.message.text;
      const userId = event.source.userId;
      const data = {
        platform: 'line',
        user_id: userId,
        message: msg,
      };
      db.query('INSERT INTO messages SET ?', data);
      global.io.emit('new-message', data);
    }
  }
  res.sendStatus(200);
};
