import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Helper function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar w-full">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Left side - Logo */}
        <div className="logo-container">
          <Link to="/" className="logo text-2xl font-bold">
            NG <span className="italic">Labs</span>
          </Link>
        </div>
        
        {/* Middle - Navigation Links */}
        <div className="nav-container">
          <ul className="nav-links flex">
            <li><Link to="/" className={isActive('/')}>Projects</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About Us</Link></li>
            <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
            <li><Link to="/blog" className={isActive('/blog')}>Blog</Link></li>
          </ul>
        </div>
        
        {/* Right - Theme Toggle */}
        <div className="theme-toggle-container">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle p-2 rounded-full"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;