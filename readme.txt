-- Table for storing incoming messages from users
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reply (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
