const { replyLine } = require('../services/linebot');
const { getBot } = require('../services/telegrambot');
const { sendFacebookMessage } = require('../services/facebookbot');

exports.replyToUser = async (req, res) => {
  const { platform, user_id, reply } = req.body;

  if (platform === 'line') {
    await replyLine(user_id, reply);
  } else if (platform === 'telegram') {
    const tgBot = getBot();
    tgBot.sendMessage(user_id, reply);
  } else if (platform === 'facebook') {
    console.log('Sending reply to Facebook user:', user_id, reply);
    await sendFacebookMessage(user_id, reply);
  }
  else if (platform === 'instagram') {
    console.log('Sending reply to Instagram user:', user_id, reply);
    await sendInstagramMessage(user_id, reply);
  }

  res.sendStatus(200);
};