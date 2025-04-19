import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import '../../styles/admin/BlogManager.css';

const BlogManager = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useContent();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Technology'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editing !== null) {
      updateBlogPost(editing, formData);
      setEditing(null);
    } else {
      addBlogPost(formData);
    }
    
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: 'Technology'
    });
    
    setShowForm(false);
  };
  
  const handleEdit = (id) => {
    const post = blogPosts.find(post => post.id === id);
    if (post) {
      setEditing(id);
      setFormData({ ...post });
      setShowForm(true);
    }
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
    }
  };
  
  const cancelEdit = () => {
    setEditing(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: 'Technology'
    });
    setShowForm(false);
  };
  
  return (
    <div className="blog-manager">
      <div className="manager-header">
        <h1>Manage Blog Posts</h1>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add New Post
        </button>
      </div>
      
      {showForm && (
        <div className="blog-form-container">
          <form onSubmit={handleSubmit} className="blog-form">
            <h2>{editing !== null ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="10"
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Technology">Technology</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Ethics">Ethics</option>
                  <option value="NLP">NLP</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Future of AI">Future of AI</option>
                  <option value="Social Impact">Social Impact</option>
                </select>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editing !== null ? 'Update Post' : 'Add Post'}
              </button>
              <button type="button" className="cancel-button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="blog-posts-list">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td className="post-actions">
                  <button onClick={() => handleEdit(post.id)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {blogPosts.length === 0 && (
          <p className="no-posts">No blog posts yet. Add your first one!</p>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
