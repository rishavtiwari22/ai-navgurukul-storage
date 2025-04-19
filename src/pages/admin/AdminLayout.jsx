import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import '../../styles/admin/AdminLayout.css';

const AdminLayout = () => {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
