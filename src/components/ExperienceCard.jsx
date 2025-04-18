import React from 'react';
import '../styles/ExperienceCard.css';

const ExperienceCard = ({ title, description, link, image, category }) => {
  return (
    <div className="experience-card">
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
        <div className="category-badge">{category || 'Featured'}</div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        <div className="card-footer">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="explore-link">
              <span>Explore</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;