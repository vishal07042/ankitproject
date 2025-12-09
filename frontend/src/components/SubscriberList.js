import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubscriberList.css';

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subscribers');
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="subscriber-list">
      <h2>Subscribed Email Addresses</h2>
      
      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <div className="subscribers-table">
          <div className="table-header">
            <div>Email Address</div>
            <div>Subscribed At</div>
          </div>
          
          <div className="table-body">
            {subscribers.map(subscriber => (
              <div key={subscriber.id} className="table-row">
                <div>{subscriber.email}</div>
                <div>{formatDate(subscriber.subscribedAt)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberList;