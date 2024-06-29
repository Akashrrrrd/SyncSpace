import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Help & Support</h1>
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {/* FAQ items go here */}
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>Instructions on resetting password...</p>
          </div>
          {/* Add more FAQs as needed */}
        </div>
      </div>
      <div className="contact-section">
        <h2>Contact Support</h2>
        <p>If you need further assistance, please contact our support team:</p>
        <ul>
          <li>Email: support@yourcompany.com</li>
          <li>Phone: +1-123-456-7890</li>
        </ul>
        {/* Add contact form if necessary */}
      </div>
    </div>
  );
};

export default Help;
