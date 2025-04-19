import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Link } from 'react-router-dom';
import '../../styles/admin/Dashboard.css';

const Dashboard = () => {
  const { experiences, blogPosts, aboutContent } = useContent();
  
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="dashboard-welcome">Welcome to your content management system</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Experiences</h3>
          <p className="stat-number">{experiences.length}</p>
          <Link to="/admin/experiences" className="stat-link">Manage</Link>
        </div>
        
        <div className="stat-card">
          <h3>Blog Posts</h3>
          <p className="stat-number">{blogPosts.length}</p>
          <Link to="/admin/blog" className="stat-link">Manage</Link>
        </div>
        
        <div className="stat-card">
          <h3>Team Members</h3>
          <p className="stat-number">{aboutContent.team.length}</p>
          <Link to="/admin/about" className="stat-link">Manage</Link>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Recent Content</h2>
        
        <div className="activity-section">
          <h3>Latest Experiences</h3>
          <div className="activity-list">
            {experiences.slice(-3).reverse().map((exp, index) => (
              <div key={index} className="activity-item">
                <h4>{exp.title}</h4>
                <p>{exp.category}</p>
              </div>
            ))}
            {experiences.length === 0 && <p className="no-items">No experiences yet</p>}
          </div>
        </div>
        
        <div className="activity-section">
          <h3>Latest Blog Posts</h3>
          <div className="activity-list">
            {blogPosts.slice(-3).reverse().map((post) => (
              <div key={post.id} className="activity-item">
                <h4>{post.title}</h4>
                <p>{post.category} • {post.date}</p>
              </div>
            ))}
            {blogPosts.length === 0 && <p className="no-items">No blog posts yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
