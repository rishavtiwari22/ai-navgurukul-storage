import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { blogPosts } = useContent();
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If post doesn't exist, redirect to blog homepage
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);
  
  if (!post) return null;
  
  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  return (
    <div className="blog-post-container">
      <div className="back-to-blog">
        <Link to="/blog" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to All Articles
        </Link>
      </div>
      
      <article className="blog-post">
        <header className="post-header">
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-author">By {post.author}</div>
        </header>
        
        <div className="post-feature-image">
          <img 
            src={`${post.image}?auto=format&fit=crop&w=1200&q=80`} 
            alt={post.title} 
          />
        </div>
        
        <div className="post-content">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
      
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>Related Articles</h3>
          <div className="related-posts-grid">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="related-post-card">
                <Link to={`/blog/${relatedPost.id}`}>
                  <div className="related-post-image">
                    <img 
                      src={`${relatedPost.image}?auto=format&fit=crop&w=400&q=70`} 
                      alt={relatedPost.title} 
                    />
                  </div>
                  <h4>{relatedPost.title}</h4>
                  <p className="related-post-date">{relatedPost.date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
