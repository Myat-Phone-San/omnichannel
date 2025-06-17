const pool = require('../services/db');
const { sendInstagramMessage } = require('../services/instagrambot');

exports.verifyWebhook = (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  // It's recommended to store the verify token in an environment variable.
  if (mode === 'subscribe' && token == "123456") { // Consider using process.env.INSTAGRAM_VERIFY_TOKEN
    console.log('Webhook verified successfully');
    return res.status(200).send(challenge);
  }
  console.log('Webhook verification failed');
  return res.sendStatus(403);
};

exports.handleWebhook = async (req, res) => {
  console.log('Instagram Webhook triggered');

  const body = req.body;
  if (body.object === 'instagram') {
    for (const entry of body.entry) {
      if (entry.messaging && Array.isArray(entry.messaging)) {
        for (const messaging of entry.messaging) {
          if (messaging.message?.text && messaging.sender?.id) {
            const senderId = messaging.sender.id;
            const message = messaging.message.text;

            // For Instagram, user's display name typically requires a separate API call.
            // For now, using senderId as a fallback name.
            // To get actual display names, you'd integrate a call to Instagram Graph API here:
            // e.g., await instagrambot.getProfile(senderId)
            const userName = `IG User: ${senderId.substring(0, 8)}...`; // A more user-friendly representation

            console.log(`Message from Instagram user ${userName} (${senderId}): ${message}`);

            try {
              const [result] = await pool.query(
                'INSERT INTO messages (platform, user_id, user_name, message) VALUES (?, ?, ?, ?)',
                ['instagram', senderId, userName, message] // NEW: Include user_name
              );
              const messageId = result.insertId;

              console.log(`Instagram message from ${userName} (${senderId}) saved to DB with ID: ${messageId}`);

              // Emit the data including the new message ID, explicit sender, and user_name for dashboard
              global.io.emit('new-message', {
                platform: 'instagram',
                user_id: senderId,
                user_name: userName, // NEW: Include user_name
                message: message,
                id: messageId,
                sender: 'user'
              });
            } catch (error) {
              console.error('Error inserting Instagram message into DB:', error);
            }
          } else {
            console.log('Received non-text message or invalid sender in Instagram webhook:', JSON.stringify(messaging));
          }
        }
      } else {
        console.log('Instagram webhook entry has no messaging array or is not iterable:', JSON.stringify(entry));
      }
    }
    return res.status(200).send('EVENT_RECEIVED');
  }
  console.log('Received webhook for non-instagram object:', body.object);
  return res.sendStatus(404);
};
