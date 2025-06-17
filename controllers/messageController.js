const pool = require('../services/db');
const { replyLine } = require('../services/linebot');
const { getBot } = require('../services/telegrambot');
const { sendFacebookMessage } = require('../services/facebookbot');
const { sendInstagramMessage } = require('../services/instagrambot');

exports.replyToUser = async (req, res) => {
  const { platform, user_id, reply, last_incoming_message_id } = req.body; // Added last_incoming_message_id

  try {
    let sentSuccessfully = false;

    if (platform === 'line') {
      await replyLine(user_id, reply);
      sentSuccessfully = true;
    } else if (platform === 'telegram') {
      const tgBot = getBot();
      await tgBot.sendMessage(user_id, reply); // Await this call
      sentSuccessfully = true;
    } else if (platform === 'facebook') {
      console.log('Sending reply to Facebook user:', user_id, reply);
      await sendFacebookMessage(user_id, reply);
      sentSuccessfully = true;
    } else if (platform === 'instagram') {
      console.log('Sending reply to Instagram user:', user_id, reply);
      await sendInstagramMessage(user_id, reply);
      sentSuccessfully = true;
    } else {
      console.warn('Attempted to reply to an unsupported platform:', platform);
      return res.status(400).send({ error: 'Unsupported platform' });
    }

    if (sentSuccessfully) {
      // Store the reply message in the 'reply' table
      const replyData = {
        message_id: last_incoming_message_id, // This links to the original incoming message
        platform: platform,
        text: reply
      };

      // Ensure message_id is not null as per schema, if it's missing, handle gracefully
      if (replyData.message_id === undefined || replyData.message_id === null) {
          console.warn(`last_incoming_message_id was not provided for a reply to ${platform} user ${user_id}. Not logging to 'reply' table.`);
          // You might choose to throw an error or store it with a NULL message_id if your schema allowed it.
          // For now, if it's NOT NULL, we skip insertion or crash, depending on strictness.
          return res.status(200).send({ message: 'Reply sent, but message_id missing for DB log.' });
      }

      try {
        await pool.query('INSERT INTO reply SET ?', replyData);
        console.log('Reply message logged to DB:', replyData);
      } catch (dbError) {
        console.error('Error logging reply message to DB:', dbError);
        // Do not return 500 here, as the message was successfully sent to the platform.
        // The error is only in logging.
      }
    }

    res.status(200).send({ message: 'Reply sent and processed.' });

  } catch (error) {
    console.error(`Error sending message to ${platform} user ${user_id}:`, error);
    // Send a 500 if the platform API call failed
    res.status(500).send({ error: `Failed to send message to ${platform}`, details: error.message });
  }
};
