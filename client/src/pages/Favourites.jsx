import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch favorites
    setTimeout(() => {
      const sampleFavorites = [
        {
          id: 1,
          title: "Vintage Denim Jacket",
          size: "M",
          condition: "Good",
          image: "/api/placeholder/300/300",
          owner: "Sarah M.",
          category: "Jackets",
          description: "Classic vintage denim jacket in great condition",
          dateAdded: "2024-01-15",
          available: true
        },
        {
          id: 2,
          title: "Summer Floral Dress",
          size: "S",
          condition: "Like New",
          image: "/api/placeholder/300/300",
          owner: "Emma K.",
          category: "Dresses",
          description: "Beautiful floral summer dress, perfect for warm weather",
          dateAdded: "2024-01-10",
          available: true
        },
        {
          id: 3,
          title: "Classic Black Boots",
          size: "8",
          condition: "Good",
          image: "/api/placeholder/300/300",
          owner: "Alex R.",
          category: "Shoes",
          description: "Comfortable black leather boots, great for any occasion",
          dateAdded: "2024-01-08",
          available: false
        },
        {
          id: 4,
          title: "Cozy Knit Sweater",
          size: "L",
          condition: "Like New",
          image: "/api/placeholder/300/300",
          owner: "Mike T.",
          category: "Tops",
          description: "Soft knit sweater in excellent condition",
          dateAdded: "2024-01-05",
          available: true
        }
      ];
      setFavorites(sampleFavorites);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFavorite = (itemId) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
          <div className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start browsing and add items to your favorites to see them here!
            </p>
            <Link
              to="/browse"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <>
            {/* Filter/Sort Options */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-gray-700 font-medium">Filter by:</span>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                  Available Only
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Recently Added
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  By Category
                </button>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(item => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {/* Item Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    {!item.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          No Longer Available
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
                      title="Remove from favorites"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Item Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Size: {item.size} • {item.condition}</p>
                    <p className="text-gray-500 text-sm mb-2">by {item.owner}</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <p className="text-gray-400 text-xs mb-3">Added to favorites: {formatDate(item.dateAdded)}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/item/${item.id}`}
                        className={`flex-1 text-center py-2 rounded transition-colors ${
                          item.available 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        View Details
                      </Link>
                      {item.available && (
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                          Swap
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/browse"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Browse More Items
                </Link>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                  Create Wishlist
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                  Share Favorites
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
