// const axios = require('axios');

// exports.sendFacebookMessage = async (senderId, text) => {
//   await axios.post(`https://graph.facebook.com/v17.0/me/messages?access_token=${process.env.FB_PAGE_TOKEN}`, {
//     recipient: { id: senderId },
//     message: { text }
//   });
// };
const axios = require('axios');

exports.sendFacebookMessage = async (senderId, text) => {
  try {
    const response = await axios.post(`https://graph.facebook.com/v17.0/me/messages?access_token=${process.env.FB_PAGE_TOKEN}`, {
      recipient: { id: senderId },
      message: { text }
    });
    console.log('Facebook message sent:', response.data);
  } catch (error) {
    console.error('Failed to send Facebook message:', error.response?.data || error.message);
  }
};
