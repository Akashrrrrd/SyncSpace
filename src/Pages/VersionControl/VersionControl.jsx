import React, { useState } from 'react';
import './VersionControl.css';
import { FaRegClock, FaUser, FaCodeBranch } from 'react-icons/fa';

const commits = [
  {
    id: 1,
    author: 'Jane Smith',
    date: '2024-06-28',
    message: 'Initial commit',
    details: 'Added project setup files and initial structure.',
    avatar: 'https://via.placeholder.com/40', 
  },
  {
    id: 2,
    author: 'John Doe',
    date: '2024-06-29',
    message: 'Implemented task management feature',
    details: 'Added task creation, editing, and deletion functionalities.',
    avatar: 'https://via.placeholder.com/40', 
  },
  {
    id: 3,
    author: 'Alice Johnson',
    date: '2024-06-30',
    message: 'Added real-time chat feature',
    details: 'Integrated WebSocket for real-time messaging and notifications.',
    avatar: 'https://via.placeholder.com/40', 
  },
  {
    id: 4,
    author: 'Bob Martin',
    date: '2024-07-01',
    message: 'Developed video conferencing module',
    details: 'Implemented video call functionality using WebRTC.',
    avatar: 'https://via.placeholder.com/40', 
  },
  {
    id: 5,
    author: 'Emily Davis',
    date: '2024-07-02',
    message: 'Enhanced file explorer',
    details: 'Added drag-and-drop file upload and folder creation features.',
    avatar: 'https://via.placeholder.com/40', 
  }
];

const VersionControl = () => {
  const [selectedCommit, setSelectedCommit] = useState(null);

  const handleCommitClick = (commit) => {
    setSelectedCommit(commit);
  };

  return (
    <div className="version-control">
      <div className="header">
        <h1>Version Control</h1>
      </div>
      <div className="content">
        <div className="commit-list">
          {commits.map((commit) => (
            <div
              key={commit.id}
              className="commit-item"
              onClick={() => handleCommitClick(commit)}
            >
              <img src={commit.avatar} alt={commit.author} className="avatar" />
              <div className="commit-info">
                <p className="commit-message">{commit.message}</p>
                <p className="commit-author">
                  <FaUser className="icon" /> {commit.author}
                </p>
                <p className="commit-date">
                  <FaRegClock className="icon" /> {commit.date}
                </p>
              </div>
              <button className="view-details-button">View Details</button>
            </div>
          ))}
        </div>
        {selectedCommit && (
          <div className="commit-details">
            <h2>Commit Details</h2>
            <p>
              <strong>Author:</strong> {selectedCommit.author}
            </p>
            <p>
              <strong>Date:</strong> {selectedCommit.date}
            </p>
            <p>
              <strong>Message:</strong> {selectedCommit.message}
            </p>
            <p>
              <strong>Details:</strong> {selectedCommit.details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionControl;
