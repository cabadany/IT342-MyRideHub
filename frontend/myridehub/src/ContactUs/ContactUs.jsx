import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_qjtctpm',
      'template_cdfktrr',
      {
        from_name: formData.fullName,
        from_email: formData.email,
        message: formData.message,
        to_email: 'myridehub.team@gmail.com'
      },
      'amfqsOzG5FitWxMF_'
    ).then((result) => {
      alert('Message sent successfully!');
      setFormData({ fullName: '', email: '', message: '' });
    }).catch((error) => {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    });
  };

  const handleBackButtonClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <button className="back-button" onClick={handleBackButtonClick}>Back to Home</button>
        <h1>CONTACT US</h1>
        <p>
          Have questions, concerns, or need assistance with our services? Our team is here to help!
          Whether you have inquiries about bookings, ride options, or technical support, feel free to reach out to us anytime.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-block">
            <span className="icon">🏠</span>
            <div>
              <h3>Address</h3>
              <p>Natalio B. Bacalso Ave.<br />Cebu</p>
            </div>
          </div>
          <div className="info-block">
            <span className="icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>0912-345-6789</p>
            </div>
          </div>
          <div className="info-block">
            <span className="icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>myridehub.team@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>SEND MESSAGE</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type your Message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;