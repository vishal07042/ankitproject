import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HappyClients.css';

const HappyClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://ankitproject-five.vercel.app/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  return (
    <section className="happy-clients">
      <h2>Happy Clients</h2>
      <div className="clients-grid">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <img
              src={client.image}
              alt={client.name}
              className="client-image"
            />
            <div className="client-info">
              <p className="client-description">{client.description}</p>
              <h3 className="client-name">{client.name}</h3>
              <p className="client-designation">{client.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyClients;