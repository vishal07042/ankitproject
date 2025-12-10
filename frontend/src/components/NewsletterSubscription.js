import React, { useState } from 'react';
import axios from 'axios';
import './NewsletterSubscription.css';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await axios.post('https://ankitproject-five.vercel.app/api/subscribe', { email });
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="newsletter-bar">
      <div className="newsletter-container">
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#clients">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="newsletter-form-container">
          <span className="subscribe-label">Subscribe Us</span>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;