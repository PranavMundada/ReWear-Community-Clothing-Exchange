import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY',
    bio: 'Love sustainable fashion and finding unique pieces!',
    avatar: '/api/placeholder/150/150',
    memberSince: 'January 2024',
    totalSwaps: 15,
    rating: 4.8
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <button className="mt-2 text-blue-500 hover:text-blue-700 text-sm">
                  Change Photo
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editProfile.bio}
                      onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="text-gray-600">📍 {profile.location}</p>
                  <p className="text-gray-700">{profile.bio}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Member since {profile.memberSince}</span>
                    <span>•</span>
                    <span>{profile.totalSwaps} swaps completed</span>
                    <span>•</span>
                    <span>⭐ {profile.rating} rating</span>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{profile.totalSwaps}</h3>
            <p className="text-gray-600">Total Swaps</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">12</h3>
            <p className="text-gray-600">Items Listed</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{profile.rating}</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Successfully swapped "Vintage Denim Jacket" with Sarah</span>
              <span className="text-gray-500 text-sm ml-auto">2 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Listed new item "Summer Floral Dress"</span>
              <span className="text-gray-500 text-sm ml-auto">1 week ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Received 5-star rating from Emma</span>
              <span className="text-gray-500 text-sm ml-auto">2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
