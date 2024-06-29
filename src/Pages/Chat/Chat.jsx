import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      messages: [],
      type: "friend",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      messages: [],
      type: "friend",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Tom Brown",
      messages: [],
      type: "friend",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Tom Cruise",
      messages: [],
      type: "friend",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Emily Davis",
      messages: [],
      type: "friend",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      name: "Project Team",
      messages: [],
      type: "group",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 7,
      name: "Community Updates",
      messages: [],
      type: "community",
      avatar: "https://via.placeholder.com/50",
    },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    if (selectedChat) {
      const newMessage = { text: message, sender: "You", timestamp: new Date() };
      const updatedChats = chats.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );
      setChats(updatedChats);
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <div className="chat-header">
          <input type="text" placeholder="Search or start new chat" />
        </div>
        <div className="chat-section">
          <h2>Chats</h2>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={
                  selectedChat && selectedChat.id === chat.id ? "selected" : ""
                }
                onClick={() => setSelectedChat(chat)}
                role="button"
                aria-pressed={selectedChat && selectedChat.id === chat.id}
              >
                <img src={chat.avatar} alt={chat.name} className="avatar" />
                <div className="chat-info">
                  <h3>{chat.name}</h3>
                  <p>
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].text
                      : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="avatar"
              />
              <h2>{selectedChat.name}</h2>
            </div>
            <div className="chat-messages">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "You" ? "sent" : "received"
                  }`}
                >
                  <p>{msg.text}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
