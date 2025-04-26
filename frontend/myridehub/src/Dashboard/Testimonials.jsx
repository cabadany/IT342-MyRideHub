import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: "John Doe",
    message: "MyRideHub made booking a ride so easy! I was able to rent a motorcycle for my weekend adventure without any hassle.",
    location: "Quezon City, Philippines"
  },
  {
    name: "Jane Smith",
    message: "I rented a car for a business trip, and the experience was seamless. Highly recommend MyRideHub for anyone looking for reliable transport.",
    location: "Makati, Philippines"
  },
  {
    name: "Carlos Reyes",
    message: "Great service! The app is very user-friendly, and the customer support team was really helpful when I had questions. Will use again!",
    location: "Cebu City, Philippines"
  },
  {
    name: "Carlos Reyes",
    message: "Great service! The app is very user-friendly, and the customer support team was really helpful when I had questions. Will use again!",
    location: "Cebu City, Philippines"
  },

  {
    name: "Carlos Reyes",
    message: "Great service! The app is very user-friendly, and the customer support team was really helpful when I had questions. Will use again!",
    location: "Cebu City, Philippines"
  },

   {
    name: "Carlos Reyes",
    message: "Great service! The app is very user-friendly, and the customer support team was really helpful when I had questions. Will use again!",
    location: "Cebu City, Philippines"
  }

];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Customers Say</h2>
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <p className="testimonial-message">"{testimonial.message}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
            <p className="testimonial-location">{testimonial.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
