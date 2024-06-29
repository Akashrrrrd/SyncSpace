import React from 'react';
import './Activity.css';

const Activity = () => {
  return (
    <div className="activity-page">
      <div className="activity-header">
        <h1>Recent Activity</h1>
      </div>
      <div className="activity-feed">
        {/* Activity feed items */}
        <div className="activity-item">
          <p>User A completed Task B</p>
          <span>2 hours ago</span>
        </div>
        {/* Add more activity items as needed */}
      </div>
      <div className="collaboration-insights">
        <h2>Collaboration Insights</h2>
        {/* Add analytics and graphs here */}
      </div>
    </div>
  );
};

export default Activity;
