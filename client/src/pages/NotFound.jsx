import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Illustration */}
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back Home
          </Link>
          
          <div className="flex gap-3 justify-center">
            <Link
              to="/browse"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              to="/add-item"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Add Item
            </Link>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>If you think this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
