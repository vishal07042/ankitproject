import React from 'react';
import Navbar from './Navbar';
import OurProjects from './OurProjects';
import HappyClients from './HappyClients';
import ContactForm from './ContactForm';
import NewsletterSubscription from './NewsletterSubscription';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page" id="home">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Consultation,<br />Design,<br />& Marketing</h1>
          </div>
          <div className="hero-form-wrapper">
             <ContactForm />
          </div>
        </div>
      </section>
      
      <main>
        <div id="projects" className="section-container">
          <OurProjects />
        </div>
        
        {/* "Not Your Average Realtor" Section - Static Placeholder based on image */}
        <section className="info-section">
           <div className="info-container">
              <div className="info-text"> 
                <h4 className="blue-subtitle">Not Your Average Realtor</h4>
                <p>Real trust eyes for seeing property's potential, renovating design, and effective marketing to get homeowners top dollar within weeks.</p>
              </div>
              <div className="info-visuals">
                 {/* Placeholders for the circular images in the reference */}
                 <div className="circle-img-group">
                   <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Professional 1" className="circle-img main-circle" />
                   <img src="https://images.unsplash.com/photo-1573496359-136d475fd11f?auto=format&fit=crop&w=300&q=80" alt="Professional 2" className="circle-img sub-circle-1" />
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" alt="Professional 3" className="circle-img sub-circle-2" />
                 </div>
              </div>
           </div>
        </section>

        <div id="clients" className="section-container">
          <HappyClients />
        </div>
      </main>
      
      {/* Newsletter doubles as the footer/bottom CTA in the design */}
      <NewsletterSubscription />
    </div>
  );
};

export default LandingPage;