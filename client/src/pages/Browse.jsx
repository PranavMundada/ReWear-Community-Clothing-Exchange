import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Browse.css';

// Import local assets
import sareeImage from '../assets/saree.jpg';
import sherwaniImage from '../assets/sherwani.jpg';
import kurtaImage from '../assets/kurta.jpg';
import imagesImage from '../assets/images.jpg';
import casualshoesImage from '../assets/casualshoes.jpg';
import jhootimenImage from '../assets/jhootimen.jpg';

const Browse = () => {
  const { user, apiCall } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  // Updated to match Indian clothing categories
  const categories = ['all', 'sarees', 'lehengas', 'sherwanis', 'kurtas', 'jootis', 'dupattas', 'shoes', 'accessories', 'other'];
  const sizes = ['all', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Other'];
  const conditions = ['all', 'new', 'like-new', 'good', 'fair', 'vintage'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Try to use your actual API endpoint
      if (apiCall) {
        const response = await apiCall('/api/items?status=available');
        if (response.ok) {
          const data = await response.json();
          const itemsData = data.data?.items || data.items || [];
          setItems(itemsData);
          setFilteredItems(itemsData);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log('API not available, loading sample data:', error);
    }
    
    // Always load sample data if API fails or isn't available
    loadSampleData();
    setLoading(false);
  };

  const loadSampleData = () => {
    // Extended sample data with more Indian clothing items
    const sampleItems = [
      {
        _id: '1',
        title: "Red Bridal Saree",
        description: "Beautiful red bridal saree in excellent condition",
        category: "sarees",
        type: "saree",
        size: "One Size",
        condition: "like-new",
        color: "Red",
        brand: "Traditional",
        images: [sareeImage],
        status: "available",
        owner: { 
          _id: "user1",
          name: "Priya M.",
          photo: "default.jpg"
        },
        pointsValue: 150,
        views: 24,
        favorited: 3,
        location: { city: "Mumbai", state: "Maharashtra", country: "India" },
        createdAt: new Date('2024-01-15')
      },
      {
        _id: '2',
        title: "Designer Lehenga",
        description: "Stunning designer lehenga perfect for special occasions",
        category: "lehengas",
        type: "lehenga",
        size: "M",
        condition: "like-new",
        color: "Pink",
        brand: "Designer",
        images: [imagesImage],
        status: "available",
        owner: { 
          _id: "user2",
          name: "Anjali K.",
          photo: "default.jpg"
        },
        pointsValue: 200,
        views: 18,
        favorited: 7,
        location: { city: "Delhi", state: "Delhi", country: "India" },
        createdAt: new Date('2024-01-10')
      },
      {
        _id: '3',
        title: "Classic Sherwani",
        description: "Elegant sherwani for wedding ceremonies",
        category: "sherwanis",
        type: "sherwani",
        size: "L",
        condition: "good",
        color: "Black",
        brand: "Traditional",
        images: [sherwaniImage],
        status: "available",
        owner: { 
          _id: "user3",
          name: "Rahul R.",
          photo: "default.jpg"
        },
        pointsValue: 180,
        views: 31,
        favorited: 5,
        location: { city: "Bangalore", state: "Karnataka", country: "India" },
        createdAt: new Date('2024-01-08')
      },
      {
        _id: '4',
        title: "Wedding Kurta Set",
        description: "Comfortable kurta set for casual and formal wear",
        category: "kurtas",
        type: "kurta",
        size: "M",
        condition: "like-new",
        color: "Cream",
        brand: "Ethnic",
        images: [kurtaImage],
        status: "available",
        owner: { 
          _id: "user4",
          name: "Arjun T.",
          photo: "default.jpg"
        },
        pointsValue: 120,
        views: 12,
        favorited: 2,
        location: { city: "Chennai", state: "Tamil Nadu", country: "India" },
        createdAt: new Date('2024-01-05')
      },
      {
        _id: '5',
        title: "Traditional Jootis",
        description: "Handcrafted traditional jootis in excellent condition",
        category: "jootis",
        type: "jootis",
        size: "8",
        condition: "excellent",
        color: "Brown",
        brand: "Handcrafted",
        images: [jhootimenImage],
        status: "available",
        owner: { 
          _id: "user5",
          name: "Vikram S.",
          photo: "default.jpg"
        },
        pointsValue: 80,
        views: 15,
        favorited: 4,
        location: { city: "Jaipur", state: "Rajasthan", country: "India" },
        createdAt: new Date('2024-01-12')
      },
      {
        _id: '6',
        title: "Casual Ethnic Shoes",
        description: "Comfortable casual ethnic shoes for daily wear",
        category: "shoes",
        type: "casual",
        size: "9",
        condition: "good",
        color: "Black",
        brand: "Ethnic",
        images: [casualshoesImage],
        status: "available",
        owner: { 
          _id: "user6",
          name: "Neha P.",
          photo: "default.jpg"
        },
        pointsValue: 60,
        views: 22,
        favorited: 1,
        location: { city: "Pune", state: "Maharashtra", country: "India" },
        createdAt: new Date('2024-01-14')
      },
      {
        _id: '7',
        title: "Silk Wedding Saree",
        description: "Luxurious silk wedding saree with intricate work",
        category: "sarees",
        type: "saree",
        size: "One Size",
        condition: "excellent",
        color: "Gold",
        brand: "Luxury",
        images: [sareeImage],
        status: "available",
        owner: { 
          _id: "user7",
          name: "Meera L.",
          photo: "default.jpg"
        },
        pointsValue: 175,
        views: 28,
        favorited: 8,
        location: { city: "Hyderabad", state: "Telangana", country: "India" },
        createdAt: new Date('2024-01-03')
      },
      {
        _id: '8',
        title: "Embroidered Dupatta",
        description: "Beautiful embroidered dupatta with mirror work",
        category: "dupattas",
        type: "dupatta",
        size: "One Size",
        condition: "like-new",
        color: "Green",
        brand: "Traditional",
        images: [imagesImage],
        status: "available",
        owner: { 
          _id: "user8",
          name: "Kavya R.",
          photo: "default.jpg"
        },
        pointsValue: 45,
        views: 19,
        favorited: 3,
        location: { city: "Ahmedabad", state: "Gujarat", country: "India" },
        createdAt: new Date('2024-01-07')
      },
      {
        _id: '9',
        title: "Designer Sherwani",
        description: "Modern designer sherwani with contemporary style",
        category: "sherwanis",
        type: "sherwani",
        size: "XL",
        condition: "new",
        color: "Navy Blue",
        brand: "Designer",
        images: [sherwaniImage],
        status: "available",
        owner: { 
          _id: "user9",
          name: "Aditya M.",
          photo: "default.jpg"
        },
        pointsValue: 220,
        views: 35,
        favorited: 12,
        location: { city: "Kolkata", state: "West Bengal", country: "India" },
        createdAt: new Date('2024-01-01')
      },
      {
        _id: '10',
        title: "Cotton Kurta Set",
        description: "Comfortable cotton kurta set for daily wear",
        category: "kurtas",
        type: "kurta",
        size: "L",
        condition: "good",
        color: "White",
        brand: "Comfort",
        images: [kurtaImage],
        status: "available",
        owner: { 
          _id: "user10",
          name: "Riya S.",
          photo: "default.jpg"
        },
        pointsValue: 85,
        views: 16,
        favorited: 2,
        location: { city: "Indore", state: "Madhya Pradesh", country: "India" },
        createdAt: new Date('2024-01-09')
      },
      {
        _id: '11',
        title: "Bridal Lehenga Set",
        description: "Complete bridal lehenga set with jewelry",
        category: "lehengas",
        type: "lehenga",
        size: "S",
        condition: "excellent",
        color: "Red",
        brand: "Bridal",
        images: [imagesImage],
        status: "available",
        owner: { 
          _id: "user11",
          name: "Zara K.",
          photo: "default.jpg"
        },
        pointsValue: 250,
        views: 42,
        favorited: 15,
        location: { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
        createdAt: new Date('2024-01-02')
      },
      {
        _id: '12',
        title: "Traditional Jootis",
        description: "Classic traditional jootis with embroidery",
        category: "jootis",
        type: "jootis",
        size: "7",
        condition: "good",
        color: "Black",
        brand: "Heritage",
        images: [jhootimenImage],
        status: "available",
        owner: { 
          _id: "user12",
          name: "Amit P.",
          photo: "default.jpg"
        },
        pointsValue: 70,
        views: 14,
        favorited: 1,
        location: { city: "Varanasi", state: "Uttar Pradesh", country: "India" },
        createdAt: new Date('2024-01-11')
      }
    ];
    
    setItems(sampleItems);
    setFilteredItems(sampleItems);
  };

  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    if (selectedCondition !== 'all') {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, selectedSize, selectedCondition]);

  const addToFavorites = async (itemId) => {
    if (!user) {
      alert('Please log in to add items to favorites');
      return;
    }
    
    try {
      if (apiCall) {
        const response = await apiCall(`/api/items/${itemId}/favorite`, { 
          method: 'POST' 
        });
        if (response.ok) {
          // Update the favorited count locally
          setItems(items.map(item => 
            item._id === itemId 
              ? { ...item, favorited: item.favorited + 1 }
              : item
          ));
          return;
        }
      }
      
      // Fallback for demo - just update locally
      setItems(items.map(item => 
        item._id === itemId 
          ? { ...item, favorited: item.favorited + 1 }
          : item
      ));
      console.log('Added to favorites (demo mode):', itemId);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const formatCondition = (condition) => {
    return condition.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return (
      <div className="browse-loading">
        <div className="spinner"></div>
        <p>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="browse-root">
      <div className="browse-container">
        <h1 className="browse-title">Browse Items</h1>
        {/* Filters Section */}
        <div className="browse-filters">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="browse-search"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="browse-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : formatCategory(category)}
              </option>
            ))}
          </select>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="browse-select"
          >
            {sizes.map(size => (
              <option key={size} value={size}>
                {size === 'all' ? 'All Sizes' : size}
              </option>
            ))}
          </select>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="browse-select"
          >
            {conditions.map(condition => (
              <option key={condition} value={condition}>
                {condition === 'all' ? 'All Conditions' : formatCondition(condition)}
              </option>
            ))}
          </select>
        </div>
        <p className="browse-count">Showing {filteredItems.length} of {items.length} items</p>
        {/* Items Grid */}
        <div className="browse-grid">
          {filteredItems.map(item => (
            <div key={item._id} className="browse-card">
              <div className="browse-card-img-wrap">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="browse-card-img"
                />
                <div className="browse-card-badge">{item.pointsValue} pts</div>
                {user && user._id !== item.owner._id && (
                  <button
                    onClick={() => addToFavorites(item._id)}
                    className="browse-fav-btn"
                    title="Add to favorites"
                  >
                    <span role="img" aria-label="favorite">❤️</span>
                  </button>
                )}
              </div>
              <div className="browse-card-body">
                <h3 className="browse-card-title">{item.title}</h3>
                <div className="browse-card-meta">
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span>{formatCondition(item.condition)}</span>
                </div>
                <div className="browse-card-meta">
                  <span>{item.color}</span>
                  {item.brand && <><span>•</span><span>{item.brand}</span></>}
                </div>
                <div className="browse-card-owner">by {item.owner.name}</div>
                <div className="browse-card-desc">{item.description}</div>
                <div className="browse-card-stats">
                  <span>👁 {item.views}</span>
                  <span>❤️ {item.favorited}</span>
                  <span>📍 {item.location.city}, {item.location.state}</span>
                </div>
                <div className="browse-card-actions">
                  <Link
                    to={`/item/${item._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                  {user && user._id !== item.owner._id && item.status === 'available' && (
                    <Link
                      to={`/swap-request/${item._id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Swap
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Empty States */}
        {filteredItems.length === 0 && (
          <div className="browse-empty">
            <div className="browse-empty-icon">🔍</div>
            <h3>No items found</h3>
            <p>Try adjusting your search criteria or filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSize('all');
                setSelectedCondition('all');
              }}
              className="btn btn-outline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
