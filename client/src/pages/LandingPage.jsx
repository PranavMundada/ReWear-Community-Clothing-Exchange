import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Import local assets
import sareeImage from '../assets/saree.jpg';
import sherwaniImage from '../assets/sherwani.jpg';
import kurtaImage from '../assets/kurta.jpg';
import imagesImage from '../assets/images.jpg';
import casualshoesImage from '../assets/casualshoes.jpg';
import jhootimenImage from '../assets/jhootimen.jpg';

const categories = [
  { name: 'Sarees', icon: '🥻', color: '#FF6B6B' },
  { name: 'Lehengas', icon: '👗', color: '#4ECDC4' },
  { name: 'Sherwanis', icon: '🧥', color: '#FFE66D' },
  { name: 'Jootis', icon: '👞', color: '#95E1D3' },
  { name: 'Wedding Wear', icon: '💍', color: '#F7DC6F' },
  { name: 'Kurtas', icon: '👕', color: '#E74C3C' },
  { name: 'Dupattas', icon: '🧣', color: '#9B59B6' },
  { name: 'Shoes', icon: '👟', color: '#3498DB' },
];

const featuredItems = [
  {
    title: 'Red Bridal Saree',
    category: 'Sarees',
    image: sareeImage,
    points: 150,
    condition: 'Excellent'
  },
  {
    title: 'Designer Lehenga',
    category: 'Lehengas',
    image: imagesImage,
    points: 200,
    condition: 'Like New'
  },
  {
    title: 'Classic Sherwani',
    category: 'Sherwanis',
    image: sherwaniImage,
    points: 180,
    condition: 'Good'
  },
  {
    title: 'Traditional Jootis',
    category: 'Jootis',
    image: jhootimenImage,
    points: 80,
    condition: 'Excellent'
  },
  {
    title: 'Wedding Kurta Set',
    category: 'Kurtas',
    image: kurtaImage,
    points: 120,
    condition: 'Like New'
  },
  {
    title: 'Casual Ethnic Shoes',
    category: 'Shoes',
    image: casualshoesImage,
    points: 60,
    condition: 'Good'
  },
  {
    title: 'Embroidered Dupatta',
    category: 'Dupattas',
    image: imagesImage,
    points: 45,
    condition: 'Like New'
  },
  {
    title: 'Silk Wedding Saree',
    category: 'Sarees',
    image: sareeImage,
    points: 175,
    condition: 'Excellent'
  }
];

const stats = [
  { number: '10K+', label: 'Items Swapped' },
  { number: '5K+', label: 'Happy Users' },
  { number: '50K+', label: 'Points Earned' },
  { number: '100%', label: 'Sustainable' },
];

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', search);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Swap Indian Fashion,</span>
              <span className="title-line">Sustainably</span>
            </h1>
            <p className="hero-description">
              Join thousands of fashion enthusiasts exchanging sarees, lehengas, sherwanis, and more. 
              Give your pre-loved Indian wear a new life while earning points for sustainable fashion choices.
            </p>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Link to="/browse" className="btn btn-primary btn-lg">
                <span className="btn-icon">👗</span>
                Start Swapping
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg">
                <span className="btn-icon">✨</span>
                Join Community
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-icons">
              <span className="floating-icon" style={{ '--delay': '0s' }}>🥻</span>
              <span className="floating-icon" style={{ '--delay': '1s' }}>👗</span>
              <span className="floating-icon" style={{ '--delay': '2s' }}>🧥</span>
              <span className="floating-icon" style={{ '--delay': '3s' }}>👞</span>
              <span className="floating-icon" style={{ '--delay': '4s' }}>👕</span>
              <span className="floating-icon" style={{ '--delay': '5s' }}>🧣</span>
            </div>
            <div className="hero-image">
              <img 
                src={sareeImage}
                alt="Indian Fashion Collection" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for sarees, lehengas, kurtas, sherwanis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explore Categories</h2>
          <p className="section-subtitle">Find the perfect Indian wear for every occasion</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to={`/browse?category=${category.name.toLowerCase()}`} 
              className="category-card"
              key={category.name}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                <span>{category.icon}</span>
              </div>
              <h3 className="category-name">{category.name}</h3>
              <span className="category-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Items</h2>
          <p className="section-subtitle">Handpicked Indian fashion pieces from our community</p>
        </div>
        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <div 
              className="featured-card"
              key={item.title}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay">
                  <Link to={`/item/${index + 1}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-category">{item.category}</span>
                </div>
                <div className="card-details">
                  <span className="card-points">{item.points} points</span>
                  <span className="card-condition">{item.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="featured-actions">
          <Link to="/browse" className="btn btn-secondary">
            View All Items
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to start your sustainable fashion journey</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📱</div>
            <h3 className="step-title">List Your Items</h3>
            <p className="step-description">
              Upload photos of your pre-loved Indian wear and set your desired points
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🔍</div>
            <h3 className="step-title">Browse & Choose</h3>
            <p className="step-description">
              Explore thousands of items from our community and find your perfect match
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🔄</div>
            <h3 className="step-title">Swap & Earn</h3>
            <p className="step-description">
              Complete the swap and earn points for your next sustainable fashion choice
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Sustainable Fashion Journey?</h2>
          <p className="cta-description">
            Join thousands of fashion enthusiasts making a difference, one swap at a time.
          </p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              <span className="btn-icon">🚀</span>
              Get Started Free
            </Link>
            <Link to="/browse" className="btn btn-ghost btn-lg">
              <span className="btn-icon">👀</span>
              Browse Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 
