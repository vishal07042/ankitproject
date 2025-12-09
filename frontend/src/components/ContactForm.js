import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        city: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="hero-contact-card">
      <div className="card-header">
        <h3>Get a Free Consultation</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="Area, City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {submitted ? 'Sent!' : 'Get Quick Quote'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;