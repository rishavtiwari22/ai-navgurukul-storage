import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import '../../styles/admin/SiteSettingsManager.css';

const SiteSettingsManager = () => {
  const { siteSettings, updateSiteSettings } = useContent();
  const [formData, setFormData] = useState({...siteSettings});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      colors: {
        ...formData.colors,
        [name]: value
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Update settings in ContentContext
    updateSiteSettings(formData);
    
    // Show success message briefly
    setSuccessMessage('Site settings updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      setIsSubmitting(false);
    }, 3000);
  };
  
  return (
    <div className="site-settings-manager">
      <h1>Site Settings</h1>
      <p className="settings-description">
        Customize the global settings for your website. Changes will apply site-wide.
      </p>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h2>Basic Information</h2>
          <div className="content-form">
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="siteTagline">Tagline</label>
              <input
                type="text"
                id="siteTagline"
                name="siteTagline"
                value={formData.siteTagline}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="logoUrl">Logo URL</label>
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
              {formData.logoUrl && (
                <div className="logo-preview">
                  <img src={formData.logoUrl} alt="Logo preview" />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="faviconUrl">Favicon URL</label>
              <input
                type="url"
                id="faviconUrl"
                name="faviconUrl"
                value={formData.faviconUrl}
                onChange={handleChange}
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Colors & Branding</h2>
          <div className="content-form">
            <div className="form-row">
              <div className="form-group color-input-group">
                <label htmlFor="primaryColor">Primary Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.colors.primaryColor}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    aria-label="Primary color hex value"
                    value={formData.colors.primaryColor}
                    onChange={handleColorChange}
                    name="primaryColor"
                  />
                </div>
              </div>
              
              <div className="form-group color-input-group">
                <label htmlFor="secondaryColor">Secondary Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={formData.colors.secondaryColor}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    aria-label="Secondary color hex value"
                    value={formData.colors.secondaryColor}
                    onChange={handleColorChange}
                    name="secondaryColor"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group color-input-group">
                <label htmlFor="textColor">Text Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="textColor"
                    name="textColor"
                    value={formData.colors.textColor}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    aria-label="Text color hex value"
                    value={formData.colors.textColor}
                    onChange={handleColorChange}
                    name="textColor"
                  />
                </div>
              </div>
              
              <div className="form-group color-input-group">
                <label htmlFor="backgroundColor">Background Color</label>
                <div className="color-input-container">
                  <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formData.colors.backgroundColor}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    aria-label="Background color hex value"
                    value={formData.colors.backgroundColor}
                    onChange={handleColorChange}
                    name="backgroundColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Social Media</h2>
          <div className="content-form">
            <div className="form-group">
              <label htmlFor="twitterUrl">Twitter URL</label>
              <input
                type="url"
                id="twitterUrl"
                name="twitterUrl"
                value={formData.social.twitterUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  social: {
                    ...formData.social,
                    twitterUrl: e.target.value
                  }
                })}
                placeholder="https://twitter.com/youraccount"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="facebookUrl">Facebook URL</label>
              <input
                type="url"
                id="facebookUrl"
                name="facebookUrl"
                value={formData.social.facebookUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  social: {
                    ...formData.social,
                    facebookUrl: e.target.value
                  }
                })}
                placeholder="https://facebook.com/youraccount"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.social.linkedinUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  social: {
                    ...formData.social,
                    linkedinUrl: e.target.value
                  }
                })}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="instagramUrl">Instagram URL</label>
              <input
                type="url"
                id="instagramUrl"
                name="instagramUrl"
                value={formData.social.instagramUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  social: {
                    ...formData.social,
                    instagramUrl: e.target.value
                  }
                })}
                placeholder="https://instagram.com/youraccount"
              />
            </div>
          </div>
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsManager;
