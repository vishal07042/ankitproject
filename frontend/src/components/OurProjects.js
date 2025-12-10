import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OurProjects.css';

const OurProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://ankitproject-five.vercel.app/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <section className="our-projects">
      <h2>Our Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img
              src={project.image}
              alt={project.name}
              className="project-image"
            />
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProjects;