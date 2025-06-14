# 📬 Omnichannel Messaging System

A unified messaging backend and frontend interface that integrates **LINE**, **Telegram**, **Messenger**, and **Instagram** into a single Node.js application using official APIs. This system also stores messages in a **MySQL database**, with a modern frontend built using **HTML** and **TailwindCSS**.

---

## 📌 Features

* ✅ Unified message receiver and sender
* ✅ Support for LINE Messaging API
* ✅ Support for Telegram Bot API
* ✅ Support for Meta Messenger & Instagram Graph API
* ✅ MySQL storage for message logs
* ✅ Clean, responsive frontend using TailwindCSS
* ✅ Webhook integration for real-time updates

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------- |
| Backend      | Node.js (Express)                                                                                 |
| Database     | MySQL                                                                                             |
| LINE API     | [LINE Messaging API](https://developers.line.biz/en/)                                             |
| Telegram API | [Telegram Bot API](https://core.telegram.org/bots/api)                                            |
| Meta API     | [Meta Graph API (Messenger & Instagram)](https://developers.facebook.com/docs/messenger-platform) |
| Frontend     | HTML, TailwindCSS                                                                                 |


## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Myat-Phone-San/omnichannel.git
cd omnichannel
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add:

```env
PORT=3000

# LINE
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token

# TELEGRAM
TELEGRAM_BOT_TOKEN=your_telegram_token

# META (Messenger & Instagram)
META_VERIFY_TOKEN=your_meta_verify_token
META_PAGE_ACCESS_TOKEN=your_page_access_token

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=omnichannel_db
```

4. **Run the app**

```bash
node app.js
```

---

## 🚀 Webhooks Setup

### LINE

Set your webhook URL at LINE Developer Console:

```
https://yourdomain.com/webhook/line
```

### Telegram

Set your Telegram webhook using cURL:

```bash
curl -F "url=https://yourdomain.com/webhook/telegram" https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook
```

### Meta (Messenger & Instagram)

Use the Meta Developer Console to configure your webhook:

```
https://yourdomain.com/webhook/meta
```

Make sure to verify using:

```
?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=CHALLENGE_ACCEPTED
```

---

## 💬 Message Flow

1. User sends a message from LINE, Telegram, Messenger, or Instagram.
2. Webhook receives the message.
3. Controller processes it and stores in MySQL.
4. Optionally, a reply is sent back to the user.
5. Frontend UI displays the logged messages.

---

## 🧩 Database Structure

**messages table**

```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(20),
  sender_id VARCHAR(255),
  message_text TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎨 Frontend UI

* Built with **HTML** + **TailwindCSS**
* Displays message history with filters by platform
* Responsive layout for mobile and desktop

---

