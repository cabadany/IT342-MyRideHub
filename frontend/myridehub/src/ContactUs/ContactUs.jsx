import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>CONTACT US</h1>
        <p>
          Have questions, concerns, or need assistance with our services? Our team is here to help!
          Whether you have inquiries about bookings, ride options, or technical support, feel free to reach out to us anytime.
          We're committed to providing you with the best experience and ensuring all your needs are met.
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
              <p>myridehub@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>SEND MESSAGE</h2>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Type your Message..." rows="5" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
