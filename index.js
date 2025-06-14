// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const { initTelegramBot } = require('./services/telegrambot');
const { initLineBot } = require('./services/linebot');
const pool = require('./services/db');

// Route imports
const lineRoutes = require('./routes/lineRoutes');
const facebookRoutes = require('./routes/facebookRoutes');
const telegramRoutes = require('./routes/telegramRoutes');
const instagramRoutes = require('./routes/igRoutes'); // This maps to igRoutes.js
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
app.use('/webhook/instagram', instagramRoutes); // This is the path your Meta webhook MUST hit
app.use('/reply', replyRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, message AS message, platform, created_at FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Initialize bots
initTelegramBot();
// Check if initLineBot exists before calling it
if (initLineBot) {
  initLineBot();
}

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Unified Bot Server running at http://localhost:${PORT}`);
});