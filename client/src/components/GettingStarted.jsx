import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to ReWear! 🌱
            </h1>
            <p className="text-xl text-gray-600">
              Let's get your sustainable fashion marketplace started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* For Users */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">👕</div>
                <h2 className="text-2xl font-bold text-gray-800">I want to start swapping</h2>
                <p className="text-gray-600">Join the community and start exchanging clothes</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Create your account</h3>
                    <p className="text-sm text-gray-600">Sign up to start your sustainable fashion journey</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <span className="text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Add your first item</h3>
                    <p className="text-sm text-gray-600">List clothes you want to swap or sell</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <span className="text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Start swapping</h3>
                    <p className="text-sm text-gray-600">Browse items and make swap requests</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  to="/register"
                  className="block bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/login"
                  className="block bg-gray-200 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  I already have an account
                </Link>
              </div>
            </div>

            {/* For Developers */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">⚙️</div>
                <h2 className="text-2xl font-bold text-gray-800">I'm setting up the platform</h2>
                <p className="text-gray-600">Developer tools and sample data</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 rounded-full p-2 mt-1">
                    <span className="text-yellow-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Load sample data</h3>
                    <p className="text-sm text-gray-600">Add demo users and items to test the platform</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-2 mt-1">
                    <span className="text-red-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Test functionality</h3>
                    <p className="text-sm text-gray-600">Try browsing, swapping, and user management</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 rounded-full p-2 mt-1">
                    <span className="text-indigo-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Go live</h3>
                    <p className="text-sm text-gray-600">Clear demo data and invite real users</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => window.location.href = '/api/seed'}
                  className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Load Sample Data
                </button>
                <Link
                  to="/admin"
                  className="block bg-gray-200 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              What makes ReWear special?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🌱</div>
                <h4 className="font-semibold text-gray-800">Sustainable</h4>
                <p className="text-sm text-gray-600">Reduce fashion waste by giving clothes a second life</p>
              </div>
              
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800">Smart Matching</h4>
                <p className="text-sm text-gray-600">Points system and preferences for fair exchanges</p>
              </div>
              
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-semibold text-gray-800">Community</h4>
                <p className="text-sm text-gray-600">Connect with like-minded fashion enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
