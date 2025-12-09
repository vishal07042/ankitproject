import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post('http://localhost:5000/api/clients', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Reset form
      setFormData({ name: '', description: '', designation: '', image: '' });
      
      // Refresh clients list
      fetchClients();
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client. Please try again.');
      }
    }
  };

  return (
    <div className="client-management">
      <h2>Client Management</h2>
      
      <div className="management-content">
        <div className="form-section">
          <h3>Add New Client</h3>
          <form onSubmit={handleSubmit} className="client-form">
            <div className="form-group">
              <label htmlFor="name">Client Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter client name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                placeholder="CEO, Designer, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Client Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/client.jpg"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
                placeholder="Enter client review/description"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Client'}
            </button>
          </form>
        </div>
        
        <div className="list-section">
          <h3>Existing Clients</h3>
          {clients.length === 0 ? (
            <p className="no-data">No clients found.</p>
          ) : (
            <div className="clients-list">
              {clients.map(client => (
                <div key={client.id} className="client-item">
                  <img 
                    src={client.image} 
                    alt={client.name} 
                    className="client-thumb"
                  />
                  <div className="client-details">
                    <h4>{client.name}</h4>
                    <p className="designation">{client.designation}</p>
                    <p className="description">{client.description}</p>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;