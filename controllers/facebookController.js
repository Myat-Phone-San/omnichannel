const pool = require('../services/db');
const { sendFacebookMessage } = require('../services/facebookbot');

exports.verifyWebhook = (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  if (mode === 'subscribe' && token == "123456") {
    console.log('Webhook verified successfully');
    return res.status(200).send(challenge);
  }
  console.log('Webhook verification failed');
  return res.sendStatus(403);
};

// exports.handleWebhook = async (req, res) => {    
//   const body = req.body;
//   if (body.object === 'page') {
//     for (const entry of body.entry) {
//       for (const event of entry.messaging) {
//         if (event.message?.text) {
//           const senderId = event.sender.id;
//           const message = event.message.text;
//           await pool.query(
//             'INSERT INTO messages (platform, user_id, message) VALUES (?, ?, ?)',
//             ['facebook', senderId, message]
//           );
//           console.log(`Received message from Facebook user ${senderId}: ${message}`);
//         }
//       }
//     }
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404);
//   }
// };

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

          console.log(`Message from Facebook user ${senderId}: ${message}`);

          await pool.query(
            'INSERT INTO messages (platform, user_id, message) VALUES (?, ?, ?)',
            ['facebook', senderId, message]
          );

          global.io.emit('new-message', {
            platform: 'facebook',
            user_id: senderId,
            message
          });
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};



