const db = require('../services/db');

exports.handleTelegramMessage = async (msg, bot) => {
    const chatId = msg.chat.id;
    const text = msg.text || '[non-text message]';

    // Extract user's first name, or fallback to username, or finally to chat ID
    const userName = msg.from.first_name || msg.from.username || String(chatId);

    const data = {
        platform: 'telegram',
        user_id: chatId,
        user_name: userName, // NEW: Store the user's name
        message: text,
    };

    try {
        const [result] = await db.query('INSERT INTO messages SET ?', data);
        const messageId = result.insertId;

        console.log(`Telegram message from ${userName} (${chatId}) saved to DB with ID: ${messageId}`);

        // Emit the data including the new message ID, explicit sender, and user_name for dashboard
        global.io.emit('new-message', { ...data, id: messageId, sender: 'user' });
    } catch (error) {
        console.error(`Error saving Telegram message from ${chatId} to DB:`, error);
    }
};
