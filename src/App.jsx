import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Experience from './pages/Experience';
import About from './components/About';
import Contact from './pages/Contact';
import { useTheme } from './components/ThemeContext';
import './styles/App.css';

const Blog = () => <div className="p-8"><h1>Blog</h1><p>Coming soon...</p></div>;

const App = () => {
  const { theme } = useTheme();
  
  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar />
        <main className="overflow-auto">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;