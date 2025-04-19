import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import ExperienceCard from '../components/ExperienceCard';
import '../styles/Experience.css';

const Experience = () => {
  const { experiences } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredExperiences = activeCategory === 'All'
    ? experiences
    : experiences.filter(exp => exp.category === activeCategory);

  return (
    <div className="experience-page">
      <div className="experience-header">
        <h1>Tools for anyone to <span className="highlight">Create</span>, learn, develop and play with the future of AI</h1>
        <div className="tabs">
          {['All', 'Create', 'Learn', 'Develop', 'Play'].map(category => (
            <button
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="experience-container">
        {filteredExperiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            title={exp.title}
            description={exp.description}
            link={exp.link}
            image={exp.image}
            category={exp.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
