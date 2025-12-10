import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactDetails.css';

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://ankitproject-five.vercel.app/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="contact-details">
      <h2>Contact Form Details</h2>

      {contacts.length === 0 ? (
        <p>No contact submissions found.</p>
      ) : (
        <div className="contacts-table">
          <div className="table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Mobile</div>
            <div>City</div>
            <div>Submitted At</div>
          </div>

          <div className="table-body">
            {contacts.map(contact => (
              <div key={contact.id} className="table-row">
                <div>{contact.fullName}</div>
                <div>{contact.email}</div>
                <div>{contact.mobile}</div>
                <div>{contact.city}</div>
                <div>{formatDate(contact.submittedAt)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;