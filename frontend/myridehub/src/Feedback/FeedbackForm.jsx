import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const { addFeedback } = useFeedback(); // Get the addFeedback function from context
  const navigate = useNavigate(); // Use navigate hook to redirect to /testimonials

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (feedback.trim()) {
      const newFeedback = {
        message: feedback,
        name: 'Anonymous',
        location: 'Quezon City, Philippines',
      };
      addFeedback(newFeedback); // Add feedback to context
      setFeedback(''); // Clear the textarea after submitting
      navigate('/testimonials'); // Navigate to /testimonials page
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
    </div>
  );
};

export default FeedbackForm;
