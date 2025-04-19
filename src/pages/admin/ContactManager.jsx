import React from 'react';
import { useContent } from '../../context/ContentContext';
import '../../styles/admin/ContactManager.css';

const ContactManager = () => {
  const { contactInfo, updateContactInfo } = useContent();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateContactInfo({ [name]: value });
  };
  
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      updateContactInfo({ 
        location: { 
          ...contactInfo.location, 
          [name]: numValue 
        } 
      });
    }
  };
  
  return (
    <div className="contact-manager">
      <h1>Manage Contact Page</h1>
      
      <div className="contact-content-section">
        <h2>Page Content</h2>
        
        <div className="content-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={contactInfo.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <textarea
              id="subtitle"
              name="subtitle"
              value={contactInfo.subtitle}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="contact-info-section">
        <h2>Contact Information</h2>
        
        <div className="content-form">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={contactInfo.address}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <textarea
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <textarea
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="map-location-section">
        <h2>Map Location</h2>
        
        <div className="content-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={contactInfo.location.lat}
                onChange={handleLocationChange}
                step="0.0001"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lng">Longitude</label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={contactInfo.location.lng}
                onChange={handleLocationChange}
                step="0.0001"
              />
            </div>
          </div>
          
          <div className="map-preview">
            <h3>Map Preview</h3>
            <div className="map-container">
              <div className="map-error-container">
                <div className="map-error-icon">!</div>
                <h3 className="map-error-heading">Map Preview</h3>
                <p className="map-error-message">Coordinates: {contactInfo.location.lat}, {contactInfo.location.lng}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
