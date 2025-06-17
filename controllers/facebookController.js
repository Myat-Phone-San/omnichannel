const pool = require('../services/db');
const { sendFacebookMessage } = require('../services/facebookbot');

exports.verifyWebhook = (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  if (mode === 'subscribe' && token == "123456") { // Consider using process.env.FB_VERIFY_TOKEN
    console.log('Webhook verified successfully');
    return res.status(200).send(challenge);
  }
  console.log('Webhook verification failed');
  return res.sendStatus(403);
};

exports.handleWebhook = async (req, res) => {
  console.log('Facebook Webhook triggered');

  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        console.log('Facebook Event:', event);

        if (event.message?.text) {
          const senderId = event.sender.id;
          const message = event.message.text;

          // For Facebook, user's display name typically requires a separate API call.
          // For now, using senderId as a fallback name.
          // To get actual display names, you'd integrate a call to Facebook Graph API here:
          // e.g., await facebookbot.getProfile(senderId)
          const userName = `FB User: ${senderId.substring(0, 8)}...`; // A more user-friendly representation

          console.log(`Message from Facebook user ${userName} (${senderId}): ${message}`);

          try {
            const [result] = await pool.query(
              'INSERT INTO messages (platform, user_id, user_name, message) VALUES (?, ?, ?, ?)',
              ['facebook', senderId, userName, message] // NEW: Include user_name
            );
            const messageId = result.insertId;

            console.log(`Facebook message from ${userName} (${senderId}) saved to DB with ID: ${messageId}`);

            // Emit the data including the new message ID, explicit sender, and user_name for dashboard
            global.io.emit('new-message', {
              platform: 'facebook',
              user_id: senderId,
              user_name: userName, // NEW: Include user_name
              message: message,
              id: messageId,
              sender: 'user'
            });
          } catch (error) {
            console.error('Error inserting Facebook message into DB:', error);
          }
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
