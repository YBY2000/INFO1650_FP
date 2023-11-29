import React from 'react';
import './index.css'; // Import the CSS file for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>

      <div className="contact-info">
        <div className="contact-item">
          <strong>Name:</strong> Likun
        </div>
        <div className="contact-item">
          <strong>Email:</strong> <a href="mailto:likun9452@gmail.com">likun9452@gmail.com</a>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> 781-957-8803
        </div>
        <div className="contact-item">
          <strong>Address:</strong> 190 Pleasant Street, Malden, 02148, MA
        </div>
      </div>
    </div>
  );
};

export default Contact;
