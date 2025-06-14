// services/instagrambot.js
const axios = require('axios');

exports.sendInstagramMessage = async (senderId, text) => {
  try {
    // Make sure the API version is current. v21.0 is current as of late 2024 / early 2025.
    // Always check Facebook/Meta Developer documentation for the latest stable version.
    const response = await axios.post(`https://graph.instagram.com/v21.0/me/messages?access_token=${process.env.INSTAGRAM_PAGE_ACCESS_TOKEN}`, {
      recipient: { id: senderId },
      message: { text }
    });
    console.log('Instagram message sent:', response.data);
  } catch (error) {
    console.error('Failed to send Instagram message:', error.response?.data || error.message);
  }
};
