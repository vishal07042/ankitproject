import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectManagement from './ProjectManagement';
import ClientManagement from './ClientManagement';
import ContactDetails from './ContactDetails';
import SubscriberList from './SubscriberList';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      
      <nav className="admin-nav">
        <button 
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          Project Management
        </button>
        <button 
          className={activeTab === 'clients' ? 'active' : ''}
          onClick={() => setActiveTab('clients')}
        >
          Client Management
        </button>
        <button 
          className={activeTab === 'contacts' ? 'active' : ''}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Form Details
        </button>
        <button 
          className={activeTab === 'subscribers' ? 'active' : ''}
          onClick={() => setActiveTab('subscribers')}
        >
          Subscribed Emails
        </button>
      </nav>
      
      <main className="admin-content">
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'clients' && <ClientManagement />}
        {activeTab === 'contacts' && <ContactDetails />}
        {activeTab === 'subscribers' && <SubscriberList />}
      </main>
    </div>
  );
};

export default AdminPanel;