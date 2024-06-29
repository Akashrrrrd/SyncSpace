import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} />
        {extended ? (
          <div className="recent">
            <p className="recent-title">Dashboard</p>
            <Link to='/project_overview' className="recent-entry no-underline">
              <img src={assets.project_overview} />
              <p>Project Overview</p>
            </Link>
            <Link to='/chat' className="recent-entry no-underline">
              <img src={assets.chat_box} />
              <p>Chat</p>
            </Link>
            <Link to='/task_management' className="recent-entry no-underline">
              <img src={assets.task_management} />
              <p>Task Management</p>
            </Link>
            <Link to='/file_explorer' className="recent-entry no-underline">
              <img src={assets.file_explorer} />
              <p>File Explorer</p>
            </Link>
            <Link to='/video_conference' className="recent-entry no-underline">
              <img src={assets.video_conference} />
              <p>Video Conference</p>
            </Link>
            <Link to='/notifications' className="recent-entry no-underline">
              <img src={assets.notifications} />
              <p>Notifications</p>
            </Link>
            <Link to='/version_control' className="recent-entry no-underline">
              <img src={assets.version_control} />
              <p>Version Control</p>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
