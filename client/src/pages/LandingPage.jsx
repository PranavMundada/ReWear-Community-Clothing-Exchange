import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const categories = [
  { name: 'Sarees', icon: '🥻' },
  { name: 'Lehengas', icon: '👗' },
  { name: 'Sherwanis', icon: '🧥' },
  { name: 'Jootis', icon: '👞' },
  { name: 'Wedding Wear', icon: '💍' },
  { name: 'Kurtas', icon: '👕' },
  { name: 'Dupattas', icon: '🧣' },
  { name: 'Shoes', icon: '👟' },
]

// Demo product images (royalty-free, Unsplash)
const featuredItems = [
  {
    title: 'Red Bridal Saree',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Designer Lehenga',
    category: 'Lehengas',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Classic Sherwani',
    category: 'Sherwanis',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Traditional Jootis',
    category: 'Jootis',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Wedding Kurta Set',
    category: 'Kurtas',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
]

export default function LandingPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="landing-root">
      {/* Sticky Header */}
      <header className="landing-header">
        <div className="logo">ReWear</div>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link btn-nav">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Swap Indian Fashion, Sustainably</h1>
          <p>Exchange sarees, lehengas, sherwanis, and more. Join the movement for sustainable Indian fashion!</p>
          <div className="hero-icons">
            <span role="img" aria-label="Saree">🥻</span>
            <span role="img" aria-label="Lehenga">👗</span>
            <span role="img" aria-label="Sherwani">🧥</span>
            <span role="img" aria-label="Jooti">👞</span>
            <span role="img" aria-label="Kurta">👕</span>
            <span role="img" aria-label="Dupatta">🧣</span>
            <span role="img" aria-label="Shoes">👟</span>
          </div>
          <div className="hero-cta">
            <Link to="/browse" className="btn btn-primary">Start Swapping</Link>
            <Link to="/register" className="btn btn-outline">Join Community</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Indian Fashion" />
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for sarees, lehengas, kurtas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <h2>Categories</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <div className="category-card" key={cat.name}>
              <span className="category-icon" role="img" aria-label={cat.name}>{cat.icon}</span>
              <span className="category-label">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="featured-section">
        <h2>Featured Indian Fashion</h2>
        <div className="featured-carousel">
          {featuredItems.map(item => (
            <div className="featured-card" key={item.title}>
              <img src={item.image} alt={item.title} className="featured-img" />
              <div className="featured-info">
                <h3>{item.title}</h3>
                <span className="featured-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 