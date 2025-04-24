import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import './HelpPage.css';

const HelpPage = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending message logic here
    console.log('Subject:', subject);
    console.log('Message:', message);
    // You can also navigate to another page after submitting, like a confirmation page
    navigate('/driver-dashboard');  // Redirect to the driver dashboard after submitting
  };

  return (
    <div className="help-container">
      <div className="help-form">
        <h2>Need Help?</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="Ride Issue">Ride Issue</option>
              <option value="Technical Support">Technical Support</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div className="input-group">
            <label>Message:</label>
            <textarea
              placeholder="Text Input Area"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="send-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
