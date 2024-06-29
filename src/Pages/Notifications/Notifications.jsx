import React, { useState } from 'react';
import './Notifications.css';

const notificationsData = [
  {
    type: 'alert',
    icon: '🔔',
    title: 'System Update',
    message: 'Your system will restart at midnight for updates.',
    time: '10 mins ago',
    details: 'This update includes security patches and performance improvements. Please save your work before the scheduled time to avoid data loss.'
  },
  {
    type: 'message',
    icon: '📩',
    title: 'New Message from John',
    message: 'Hey, are we still on for the meeting tomorrow?',
    time: '1 hour ago',
    details: 'John: Hey, are we still on for the meeting tomorrow at 10 AM? Please confirm your availability.'
  },
  {
    type: 'task',
    icon: '✅',
    title: 'Task Completed',
    message: 'You have completed the task: "Design the new homepage."',
    time: '3 hours ago',
    details: 'The task "Design the new homepage" was marked as completed. Please review the design and provide feedback if necessary.'
  },
];

const Notifications = () => {
  const [notifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notifications-page">
      <div className="header">
        <h1>Notifications</h1>
      </div>
      <div className="notifications-container">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification-card ${notification.type}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="notification-icon">{notification.icon}</div>
            <div className="notification-content">
              <h2>{notification.title}</h2>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedNotification && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNotification.title}</h2>
            <p>{selectedNotification.details}</p>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
