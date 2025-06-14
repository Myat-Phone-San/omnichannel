// controllers/instagramController.js
const pool = require('../services/db');
const { sendInstagramMessage } = require('../services/instagrambot');

exports.verifyWebhook = (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  // It's recommended to store the verify token in an environment variable.
  // Using process.env.INSTAGRAM_VERIFY_TOKEN for consistency
  if (mode === 'subscribe' && token ==123456) {
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
      // Ensure 'messaging' array exists and is iterable
      if (entry.messaging && Array.isArray(entry.messaging)) {
        for (const messaging of entry.messaging) {
          // Check for text messages and valid sender ID
          if (messaging.message?.text && messaging.sender?.id) {
            const senderId = messaging.sender.id;
            const message = messaging.message.text;

            console.log(`Message from Instagram user ${senderId}: ${message}`);

            try {
              await pool.query(
                'INSERT INTO messages (platform, user_id, message) VALUES (?, ?, ?)',
                ['instagram', senderId, message]
              );
              console.log('Message inserted into DB');
            } catch (error) {
              console.error('Error inserting Instagram message into DB:', error);
            }

            // Emit the new message to connected Socket.IO clients (dashboard)
            global.io.emit('new-message', {
              platform: 'instagram',
              user_id: senderId,
              message,
            });

            // Optional: Send a response (uncomment and implement if needed)
            // try {
            //   await sendInstagramMessage(senderId, `Echo: ${message}`);
            //   console.log('Echo message sent to Instagram user');
            // } catch (sendError) {
            //   console.error('Error sending echo message to Instagram user:', sendError);
            // }
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
