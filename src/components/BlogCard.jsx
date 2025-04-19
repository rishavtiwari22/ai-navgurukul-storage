import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <div className="blog-image-container">
        <img 
          src={`${post.image}?auto=format&fit=crop&w=800&q=80`} 
          alt={post.title} 
          className="blog-image" 
        />
        <div className="blog-category">{post.category}</div>
      </div>
      
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">{post.date}</span>
          <span className="blog-author">by {post.author}</span>
        </div>
        
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        <Link to={`/blog/${post.id}`} className="read-more">
          Read Article
          <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
