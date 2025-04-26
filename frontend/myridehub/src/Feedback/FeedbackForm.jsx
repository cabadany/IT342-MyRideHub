import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (feedback.trim()) {
      setSubmittedFeedback({
        message: feedback,
        name: 'Anonymous',
        location: 'Quezon City, Philippines',
      });
      setFeedback(''); // Clear the textarea after submitting
    }
  };

  return (
    <div className="feedback-container">
      <h2>Leave Your Feedback</h2>
      <div className="feedback-form">
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={handleChange}
          rows="4"
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>

      {submittedFeedback && (
        <div className="submitted-feedback">
          <p className="feedback-message">"{submittedFeedback.message}"</p>
          <p className="feedback-name">- {submittedFeedback.name}</p>
          <p className="feedback-location">{submittedFeedback.location}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
