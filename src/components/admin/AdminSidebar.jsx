import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/admin/AdminSidebar.css';

const AdminSidebar = () => {
  const { logout, user } = useAdmin();
  
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <div className="admin-user">
          <span className="user-avatar">👤</span>
          <span className="user-name">{user?.username || 'Admin'}</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          Dashboard
        </NavLink>
        
        <NavLink to="/admin/experiences" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          Experiences
        </NavLink>
        
        <NavLink to="/admin/blog" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          Blog Posts
        </NavLink>
        
        <NavLink to="/admin/about" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          About Page
        </NavLink>
        
        <NavLink to="/admin/contact" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          Contact Info
        </NavLink>
        
        <NavLink to="/admin/settings" className={({ isActive }) => 
          isActive ? "sidebar-link active" : "sidebar-link"
        }>
          Site Settings
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
        
        <NavLink to="/" className="view-site-link">
          View Site
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
