import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Browse = () => {
  const { user, apiCall } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  // Updated to match your backend model
  const categories = ['all', 'clothing', 'shoes', 'accessories', 'bags', 'jewelry', 'electronics', 'books', 'home', 'other'];
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
    // Sample data matching your backend model structure
    const sampleItems = [
      {
        _id: '1',
        title: "Vintage Denim Jacket",
        description: "Classic vintage denim jacket in great condition",
        category: "clothing",
        type: "jacket",
        size: "M",
        condition: "good",
        color: "Blue",
        brand: "Levi's",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"],
        status: "available",
        owner: { 
          _id: "user1",
          name: "Sarah M.",
          photo: "default.jpg"
        },
        pointsValue: 35,
        views: 24,
        favorited: 3,
        location: { city: "New York", state: "NY", country: "US" },
        createdAt: new Date('2024-01-15')
      },
      {
        _id: '2',
        title: "Summer Floral Dress",
        description: "Beautiful floral summer dress, perfect for warm weather",
        category: "clothing",
        type: "dress",
        size: "S",
        condition: "like-new",
        color: "Pink",
        brand: "Zara",
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop"],
        status: "available",
        owner: { 
          _id: "user2",
          name: "Emma K.",
          photo: "default.jpg"
        },
        pointsValue: 45,
        views: 18,
        favorited: 7,
        location: { city: "Los Angeles", state: "CA", country: "US" },
        createdAt: new Date('2024-01-10')
      },
      {
        _id: '3',
        title: "Classic Black Boots",
        description: "Comfortable black leather boots, great for any occasion",
        category: "shoes",
        type: "boots",
        size: "8",
        condition: "good",
        color: "Black",
        brand: "Dr. Martens",
        images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop"],
        status: "available",
        owner: { 
          _id: "user3",
          name: "Alex R.",
          photo: "default.jpg"
        },
        pointsValue: 42,
        views: 31,
        favorited: 5,
        location: { city: "Chicago", state: "IL", country: "US" },
        createdAt: new Date('2024-01-08')
      },
      {
        _id: '4',
        title: "Cozy Knit Sweater",
        description: "Soft knit sweater in excellent condition",
        category: "clothing",
        type: "sweater",
        size: "L",
        condition: "like-new",
        color: "Cream",
        brand: "H&M",
        images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop"],
        status: "available",
        owner: { 
          _id: "user4",
          name: "Mike T.",
          photo: "default.jpg"
        },
        pointsValue: 45,
        views: 12,
        favorited: 2,
        location: { city: "Austin", state: "TX", country: "US" },
        createdAt: new Date('2024-01-05')
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Items</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : formatCategory(category)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size === 'all' ? 'All Sizes' : size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition === 'all' ? 'All Conditions' : formatCondition(condition)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-gray-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {user && user._id !== item.owner._id && (
                  <button
                    onClick={() => addToFavorites(item._id)}
                    className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
                    title="Add to favorites"
                  >
                    <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                )}
                {/* Points Value Badge */}
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {item.pointsValue} pts
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Size: {item.size}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{formatCondition(item.condition)}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">{item.color}</span>
                  {item.brand && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{item.brand}</span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2">by {item.owner.name}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                {/* Item Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>👁 {item.views}</span>
                  <span>❤️ {item.favorited}</span>
                  <span>📍 {item.location.city}, {item.location.state}</span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/item/${item._id}`}
                    className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  {user && user._id !== item.owner._id && item.status === 'available' && (
                    <Link
                      to={`/swap-request/${item._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      Swap
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items in the marketplace yet</h3>
            <p className="text-gray-500 text-lg mb-6">
              Be the first to add items to ReWear and start the community!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/add-item"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add the First Item
              </Link>
              <button
                onClick={loadSampleData}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Load Demo Data
              </button>
            </div>
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h4 className="font-semibold mb-3">Quick Start Guide:</h4>
              <ol className="text-left text-sm text-gray-600 space-y-2">
                <li>1. Click "Add the First Item" to list your first clothing item</li>
                <li>2. Or click "Load Demo Data" to see how the platform works</li>
                <li>3. Invite friends to join and start swapping!</li>
              </ol>
            </div>
          </div>
        )}

        {filteredItems.length === 0 && items.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-500 text-lg mb-6">
              No items match your current search criteria.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedSize('all');
                  setSelectedCondition('all');
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
              <Link
                to="/add-item"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Add the First Item!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
