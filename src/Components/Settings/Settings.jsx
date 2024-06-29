import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      <div className="account-settings">
        <h2>Account Settings</h2>
        <form>
          {/* Account settings form fields */}
          <label>Name:</label>
          <input type="text" placeholder="Your Name" />
          {/* Add more fields as needed */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <div className="notification-settings">
        <h2>Notification Settings</h2>
        <div className="notification-options">
          {/* Notification toggles */}
          <label>
            <input type="checkbox" /> Email Notifications
          </label>
          {/* Add more toggles as needed */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
