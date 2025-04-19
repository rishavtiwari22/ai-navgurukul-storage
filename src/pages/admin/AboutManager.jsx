import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import '../../styles/admin/AboutManager.css';

const AboutManager = () => {
  const { aboutContent, updateAboutContent, updateTeamMember, addTeamMember, deleteTeamMember } = useContent();
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    photo: ''
  });
  
  const handleContentChange = (e) => {
    const { name, value } = e.target;
    updateAboutContent({ [name]: value });
  };
  
  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData({
      ...teamFormData,
      [name]: value
    });
  };
  
  const handleTeamSubmit = (e) => {
    e.preventDefault();
    
    if (editingTeam !== null) {
      updateTeamMember(editingTeam, teamFormData);
    } else {
      addTeamMember(teamFormData);
    }
    
    setTeamFormData({
      name: '',
      role: '',
      photo: ''
    });
    
    setEditingTeam(null);
  };
  
  const handleEditTeam = (index) => {
    const member = aboutContent.team[index];
    setTeamFormData({ ...member });
    setEditingTeam(index);
  };
  
  const handleDeleteTeam = (index) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeamMember(index);
    }
  };
  
  const cancelTeamEdit = () => {
    setEditingTeam(null);
    setTeamFormData({
      name: '',
      role: '',
      photo: ''
    });
  };
  
  return (
    <div className="about-manager">
      <h1>Manage About Page</h1>
      
      <div className="about-content-section">
        <h2>Page Content</h2>
        
        <div className="content-form">
          <div className="form-group">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={aboutContent.headline}
              onChange={handleContentChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <textarea
              id="subtitle"
              name="subtitle"
              value={aboutContent.subtitle}
              onChange={handleContentChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="mission">Mission</label>
            <textarea
              id="mission"
              name="mission"
              value={aboutContent.mission}
              onChange={handleContentChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="story">Story</label>
            <textarea
              id="story"
              name="story"
              value={aboutContent.story}
              onChange={handleContentChange}
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="section-header">
          <h2>Team Members</h2>
        </div>
        
        <form onSubmit={handleTeamSubmit} className="team-form">
          <h3>{editingTeam !== null ? 'Edit Team Member' : 'Add Team Member'}</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={teamFormData.name}
                onChange={handleTeamChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={teamFormData.role}
                onChange={handleTeamChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="photo">Photo URL (optional)</label>
            <input
              type="url"
              id="photo"
              name="photo"
              value={teamFormData.photo}
              onChange={handleTeamChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              {editingTeam !== null ? 'Update Member' : 'Add Member'}
            </button>
            {editingTeam !== null && (
              <button type="button" className="cancel-button" onClick={cancelTeamEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
        
        <div className="team-members-list">
          {aboutContent.team.map((member, index) => (
            <div key={index} className="team-member-item">
              <div className="member-info">
                <div className="member-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <div className="photo-placeholder">👤</div>
                  )}
                </div>
                <div className="member-details">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
              <div className="member-actions">
                <button onClick={() => handleEditTeam(index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteTeam(index)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {aboutContent.team.length === 0 && (
            <p className="no-members">No team members yet. Add your first one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutManager;
