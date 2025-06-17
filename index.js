// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const { initTelegramBot } = require('./services/telegrambot');
const pool = require('./services/db');

// Route imports
const lineRoutes = require('./routes/lineRoutes');
const facebookRoutes = require('./routes/facebookRoutes');
const telegramRoutes = require('./routes/telegramRoutes');
const instagramRoutes = require('./routes/igRoutes');
const replyRoutes = require('./routes/replyRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Make Socket.IO global
global.io = io;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Platform webhook routes
app.use('/webhook/line', lineRoutes);
app.use('/webhook/facebook', facebookRoutes);
app.use('/webhook/telegram', telegramRoutes);
app.use('/webhook/instagram', instagramRoutes);
app.use('/reply', replyRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// --- UPDATED /messages ENDPOINT to include user_name ---
app.get('/messages', async (req, res) => {
  try {
    const [allMessages] = await pool.query(`
      (SELECT
          id,
          platform,
          user_id,
          user_name, -- Fetch user_name for incoming messages
          message,
          created_at,
          "user" as sender
       FROM
          messages)
      UNION ALL
      (SELECT
          r.id,
          r.platform,
          m.user_id,
          m.user_name, -- Fetch user_name from messages table via join for outgoing messages
          r.text AS message,
          r.created_at,
          "bot" as sender
       FROM
          reply r
       JOIN
          messages m ON r.message_id = m.id)
      ORDER BY
          created_at ASC;
    `);

    res.json(allMessages);
  } catch (error) {
    console.error('Error fetching combined messages for dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Initialize bots
initTelegramBot();
// No initLineBot function is explicitly exported from services/linebot.js
// so commenting out the direct call for clarity.
// if (initLineBot) {
//   initLineBot();
// }

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Omnichannel Chat Server running at http://localhost:${PORT}`);
});
