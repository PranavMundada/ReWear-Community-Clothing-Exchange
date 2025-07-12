import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

// Import app logo
import appLogo from '../assets/applogo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <img src={appLogo} alt="ReWear Logo" className="logo-image" />
            <span className="logo-text">ReWear</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar-menu ${isMobileMenuOpen ? 'navbar-menu-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </Link>
            
            <Link to="/browse" className={`nav-link ${location.pathname === '/browse' ? 'active' : ''}`}>
              <span className="nav-icon">👗</span>
              <span className="nav-text">Browse</span>
            </Link>
            
            {user && (
              <>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Dashboard</span>
                </Link>
                
                <Link to="/add-item" className={`nav-link ${location.pathname === '/add-item' ? 'active' : ''}`}>
                  <span className="nav-icon">➕</span>
                  <span className="nav-text">List Item</span>
                </Link>
                
                <Link to="/my-items" className={`nav-link ${location.pathname === '/my-items' ? 'active' : ''}`}>
                  <span className="nav-icon">👕</span>
                  <span className="nav-text">My Items</span>
                </Link>
                
                <Link to="/swaps" className={`nav-link ${location.pathname === '/swaps' ? 'active' : ''}`}>
                  <span className="nav-icon">🔄</span>
                  <span className="nav-text">Swaps</span>
                </Link>
                
                <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>
                  <span className="nav-icon">❤️</span>
                  <span className="nav-text">Favorites</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-text">Admin</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Section */}
          <div className="navbar-user">
            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user.name || user.email}</span>
                    <span className="user-points">Points: {user.points || 0}</span>
                  </div>
                </div>
                
                <div className="user-actions">
                  <Link to="/profile" className="btn btn-ghost btn-sm">
                    <span className="btn-icon">👤</span>
                    <span className="btn-text">Profile</span>
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm">
                    <span className="btn-icon">🚪</span>
                    <span className="btn-text">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost">
                  <span className="btn-icon">🔑</span>
                  <span className="btn-text">Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <span className="btn-icon">✨</span>
                  <span className="btn-text">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 
