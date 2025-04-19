import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Experience from './pages/Experience';
import About from './components/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import { useTheme } from './components/ThemeContext';
import './styles/App.css';

// Admin components
import { AdminProvider } from './context/AdminContext';
import { ContentProvider } from './context/ContentContext';
import LoginForm from './components/admin/LoginForm';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ExperiencesManager from './pages/admin/ExperiencesManager';
import BlogManager from './pages/admin/BlogManager';
import AboutManager from './pages/admin/AboutManager';
import ContactManager from './pages/admin/ContactManager';
import SiteSettingsManager from './pages/admin/SiteSettingsManager';

const App = () => {
  const { theme } = useTheme();
  
  return (
    <AdminProvider>
      <ContentProvider>
        <Router>
          <div className={`app ${theme}`}>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<LoginForm />} />
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="experiences" element={<ExperiencesManager />} />
                <Route path="blog" element={<BlogManager />} />
                <Route path="about" element={<AboutManager />} />
                <Route path="contact" element={<ContactManager />} />
                <Route path="settings" element={<SiteSettingsManager />} />
              </Route>
              
              {/* Public Routes */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="overflow-auto">
                    <Routes>
                      <Route path="/about" element={<About />} />
                      <Route path="/" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog/*" element={<Blog />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </ContentProvider>
    </AdminProvider>
  );
};

export default App;