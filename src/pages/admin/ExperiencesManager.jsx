import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import '../../styles/admin/ExperiencesManager.css';

const ExperiencesManager = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useContent();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: '',
    category: 'Create'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editing !== null) {
      updateExperience(editing, formData);
      setEditing(null);
    } else {
      addExperience(formData);
    }
    
    setFormData({
      title: '',
      description: '',
      link: '',
      image: '',
      category: 'Create'
    });
    
    setShowForm(false);
  };
  
  const handleEdit = (index) => {
    setEditing(index);
    setFormData({ ...experiences[index] });
    setShowForm(true);
  };
  
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(index);
    }
  };
  
  const cancelEdit = () => {
    setEditing(null);
    setFormData({
      title: '',
      description: '',
      link: '',
      image: '',
      category: 'Create'
    });
    setShowForm(false);
  };
  
  return (
    <div className="experiences-manager">
      <div className="manager-header">
        <h1>Manage Experiences</h1>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add New Experience
        </button>
      </div>
      
      {showForm && (
        <div className="experience-form-container">
          <form onSubmit={handleSubmit} className="experience-form">
            <h2>{editing !== null ? 'Edit Experience' : 'Add New Experience'}</h2>
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="link">Link URL</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Create">Create</option>
                <option value="Learn">Learn</option>
                <option value="Develop">Develop</option>
                <option value="Play">Play</option>
              </select>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editing !== null ? 'Update Experience' : 'Add Experience'}
              </button>
              <button type="button" className="cancel-button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-info">
              <div className="experience-image">
                <img src={exp.image} alt={exp.title} />
              </div>
              <div className="experience-details">
                <h3>{exp.title}</h3>
                <p className="experience-category">{exp.category}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
            <div className="experience-actions">
              <button onClick={() => handleEdit(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {experiences.length === 0 && (
          <p className="no-experiences">No experiences yet. Add your first one!</p>
        )}
      </div>
    </div>
  );
};

export default ExperiencesManager;
