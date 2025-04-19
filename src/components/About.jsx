import React from 'react';
import { useContent } from '../context/ContentContext';
import '../styles/About.css';

const About = () => {
  const { aboutContent } = useContent();
  
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="headline">
          {aboutContent.headline.split(' ').map((word, index) => 
            word.toLowerCase() === 'future' ? 
              <span key={index} className="highlight">{word}</span> : 
              <span key={index}>{word} </span>
          )}
        </h1>

        <p className="subtitl">
          {aboutContent.subtitle}
        </p>

        <div className="cta-buttons">
          <button className="btn-primary">Explore</button>
          <button className="btn-secondary">Learn</button>
        </div>
      </div>
      
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>{aboutContent.mission}</p>
        
        <h2>Our Story</h2>
        <p>{aboutContent.story}</p>
        
        <h2>Our Team</h2>
        <div className="team-grid">
          {aboutContent.team.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-photo">
                {member.photo && 
                  <img src={member.photo} alt={member.name} />
                }
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;