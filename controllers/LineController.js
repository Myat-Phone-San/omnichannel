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

            // For LINE, user's display name typically requires a separate API call.
            // For now, using userId as a fallback name.
            // To get actual display names, you'd integrate a call to LINE's profile API here:
            // e.g., await linebot.getProfile(userId)
            const userName = `LINE User: ${userId.substring(0, 8)}...`; // A more user-friendly representation

            const data = {
                platform: 'line',
                user_id: userId,
                user_name: userName, // NEW: Store user ID as name fallback
                message: msg,
            };
            try {
                const [result] = await db.query('INSERT INTO messages SET ?', data);
                const messageId = result.insertId;

                console.log(`Line message from ${userName} (${userId}) saved to DB with ID: ${messageId}`);

                // Emit the data including the new message ID, explicit sender, and user_name for dashboard
                global.io.emit('new-message', { ...data, id: messageId, sender: 'user' });
            } catch (error) {
                console.error(`Error saving Line message from ${userId} to DB:`, error);
            }
        }
    }
    res.sendStatus(200);
};
