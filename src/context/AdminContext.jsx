import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      if (adminUser) {
        setUser(JSON.parse(adminUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (credentials) => {
    // In a real app, you would validate against a backend
    // This is a simple mock implementation
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const user = { username: 'admin', role: 'administrator' };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
