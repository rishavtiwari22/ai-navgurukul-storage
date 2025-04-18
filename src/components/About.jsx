import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="headline">
          Explore the <span className="highlight">Future</span> of Technology
        </h1>

        <p className="subtitl">
          Welcome to Navgurukul Labs, where we explore the boundaries 
          of technology and innovation. Dive into our projects and 
          discover the future of tech with our cutting-edge research 
          and development initiatives. Join us in shaping tomorrow's 
          world.
        </p>

        <div className="cta-buttons">
          <button className="btn-primary">Explore</button>
          <button className="btn-secondary">Learn</button>
        </div>
      </div>
      
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>
          At Navgurukul Labs, we're pushing the boundaries of what's possible. 
          Our team of researchers and engineers work on cutting-edge projects 
          that have the potential to transform the way we interact with technology.
        </p>
        
        <h2>Our Story</h2>
        <p>
          Founded in 2025, Navgurukul Labs emerged from a simple idea: what if we created 
          a space where innovation could thrive without constraints? In future, we will be home 
          to dozens of experimental projects that explore emerging technologies.
        </p>
        
        <h2>Our Team</h2>
        <div className="team-grid">
          {/* Team members would be dynamically loaded here */}
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Alex Johnson</h3>
            <p>Research Director</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Jamie Smith</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Taylor Wong</h3>
            <p>AI Specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;