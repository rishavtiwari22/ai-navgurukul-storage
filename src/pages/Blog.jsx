import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import BlogCard from '../components/BlogCard';
import BlogPost from '../components/BlogPost';
import '../styles/Blog.css';

const Blog = () => {
  const { blogPosts } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Extract unique categories from blog posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  // Filter posts based on active category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Reset search when changing category
    setSearchTerm('');
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="blog-page">
          <div className="blog-header">
            <h1>Latest <span className="highlight">Insights</span> & Research</h1>
            <p className="blog-subtitle">
              Explore cutting-edge developments in AI, machine learning, and technology
              through our collection of articles, tutorials, and case studies.
            </p>
            
            <div className="blog-filters">
              <div className="categories-filter">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchTerm && (
                  <button className="clear-search" onClick={clearSearch}>
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="blog-container">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <div className="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
                <button onClick={() => {setActiveCategory('All'); setSearchTerm('');}}>
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      } />
      
      <Route path=":id" element={<BlogPost />} />
    </Routes>
  );
};

export default Blog;
