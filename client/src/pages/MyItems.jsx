import React from 'react';

const MyItems = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Items</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Your listed items will appear here.</p>
        {/* Add your MyItems component logic here */}
      </div>
    </div>
  );
};

export default MyItems;
