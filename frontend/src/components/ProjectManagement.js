import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

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
      await axios.post('https://ankitproject-five.vercel.app/api/projects', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Reset form
      setFormData({ name: '', description: '', image: '' });

      // Refresh projects list
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`https://ankitproject-five.vercel.app/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  return (
    <div className="project-management">
      <h2>Project Management</h2>

      <div className="management-content">
        <div className="form-section">
          <h3>Add New Project</h3>
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
              <label htmlFor="name">Project Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter project name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Project Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Enter project description"
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Project'}
            </button>
          </form>
        </div>

        <div className="list-section">
          <h3>Existing Projects</h3>
          {projects.length === 0 ? (
            <p className="no-data">No projects found.</p>
          ) : (
            <div className="projects-list">
              {projects.map(project => (
                <div key={project.id} className="project-item">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="project-thumb"
                  />
                  <div className="project-details">
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(project.id)}
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

export default ProjectManagement;