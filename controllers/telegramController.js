const db = require('../services/db');

exports.handleTelegramMessage = (msg, bot) => {
  const chatId = msg.chat.id;
  const text = msg.text || '[non-text message]';
  const data = {
    platform: 'telegram',
    user_id: chatId,
    message: text,
  };
  db.query('INSERT INTO messages SET ?', data);
  global.io.emit('new-message', data);
};
