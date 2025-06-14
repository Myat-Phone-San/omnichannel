const TelegramBot = require('node-telegram-bot-api');
const { handleTelegramMessage } = require('../controllers/telegramController');

let bot;
exports.initTelegramBot = () => {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
  bot.on('message', (msg) => handleTelegramMessage(msg, bot));
};
exports.getBot = () => bot;
