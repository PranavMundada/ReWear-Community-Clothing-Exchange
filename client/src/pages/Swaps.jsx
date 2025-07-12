import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Swaps = () => {
  const { user, apiCall } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [swaps, setSwaps] = useState({
    pending: [],
    accepted: [],
    completed: [],
    declined: [],
    cancelled: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSwaps();
    }
  }, [user]);

  const fetchSwaps = async () => {
    try {
      // Fetch both sent and received swap requests
      const [sentResponse, receivedResponse] = await Promise.all([
        apiCall(`/api/swaps/sent`),
        apiCall(`/api/swaps/received`)
      ]);

      let allSwaps = [];
      
      if (sentResponse.ok) {
        const sentData = await sentResponse.json();
        const sentSwaps = (sentData.data?.swaps || sentData.swaps || []).map(swap => ({
          ...swap,
          type: 'outgoing'
        }));
        allSwaps = [...allSwaps, ...sentSwaps];
      }

      if (receivedResponse.ok) {
        const receivedData = await receivedResponse.json();
        const receivedSwaps = (receivedData.data?.swaps || receivedData.swaps || []).map(swap => ({
          ...swap,
          type: 'incoming'
        }));
        allSwaps = [...allSwaps, ...receivedSwaps];
      }

      // Group swaps by status
      const groupedSwaps = {
        pending: allSwaps.filter(swap => swap.status === 'pending'),
        accepted: allSwaps.filter(swap => swap.status === 'accepted'),
        completed: allSwaps.filter(swap => swap.status === 'completed'),
        declined: allSwaps.filter(swap => swap.status === 'declined'),
        cancelled: allSwaps.filter(swap => swap.status === 'cancelled')
      };

      setSwaps(groupedSwaps);
    } catch (error) {
      console.error('Error fetching swaps:', error);
      // Load sample data for development
      loadSampleData();
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleSwaps = {
      pending: [
        {
          _id: '1',
          type: 'outgoing',
          swapType: 'item-for-item',
          requestedItem: {
            _id: 'item1',
            title: 'Vintage Denim Jacket',
            images: ['https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=Denim']
          },
          offeredItem: {
            _id: 'item2',
            title: 'Classic White Sneakers',
            images: ['https://via.placeholder.com/150x150/10B981/FFFFFF?text=Sneakers']
          },
          itemOwner: { name: 'Sarah M.' },
          requester: { name: user?.name || 'You' },
          createdAt: '2024-01-15T10:00:00Z',
          message: 'Would love to swap! These are in great condition.',
          pointsOffered: null
        },
        {
          _id: '2',
          type: 'incoming',
          swapType: 'points-for-item',
          requestedItem: {
            _id: 'item3',
            title: 'Summer Floral Dress',
            images: ['https://via.placeholder.com/150x150/EC4899/FFFFFF?text=Dress']
          },
          itemOwner: { name: user?.name || 'You' },
          requester: { name: 'Emma K.' },
          createdAt: '2024-01-14T15:30:00Z',
          message: 'Hi! I love this dress. Would you accept points for it?',
          pointsOffered: 45
        }
      ],
      accepted: [
        {
          _id: '3',
          type: 'outgoing',
          swapType: 'item-for-item',
          requestedItem: {
            _id: 'item4',
            title: 'Black Leather Jacket',
            images: ['https://via.placeholder.com/150x150/1F2937/FFFFFF?text=Jacket']
          },
          offeredItem: {
            _id: 'item5',
            title: 'Blue Jeans',
            images: ['https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=Jeans']
          },
          itemOwner: { name: 'Alex R.' },
          requester: { name: user?.name || 'You' },
          acceptedAt: '2024-01-12T09:15:00Z',
          createdAt: '2024-01-10T14:20:00Z'
        }
      ],
      completed: [
        {
          _id: '4',
          type: 'incoming',
          swapType: 'item-for-item',
          requestedItem: {
            _id: 'item6',
            title: 'Red Winter Coat',
            images: ['https://via.placeholder.com/150x150/EF4444/FFFFFF?text=Coat']
          },
          offeredItem: {
            _id: 'item7',
            title: 'Brown Boots',
            images: ['https://via.placeholder.com/150x150/92400E/FFFFFF?text=Boots']
          },
          itemOwner: { name: user?.name || 'You' },
          requester: { name: 'Mike T.' },
          completedAt: '2024-01-08T16:45:00Z',
          createdAt: '2024-01-05T11:00:00Z'
        }
      ],
      declined: [],
      cancelled: []
    };
    setSwaps(sampleSwaps);
  };

  const handleSwapAction = async (swapId, action) => {
    try {
      const response = await apiCall(`/api/swaps/${swapId}/${action}`, {
        method: 'PATCH'
      });

      if (response.ok) {
        // Refresh swaps after action
        fetchSwaps();
      } else {
        console.error(`Failed to ${action} swap`);
      }
    } catch (error) {
      console.error(`Error ${action}ing swap:`, error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const SwapCard = ({ swap }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-sm rounded-full ${
            swap.type === 'outgoing' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {swap.type === 'outgoing' ? 'Outgoing Request' : 'Incoming Request'}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(swap.status)}`}>
            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
          </span>
        </div>
        <span className="text-gray-500 text-sm">{formatDate(swap.createdAt)}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        {/* Requested Item */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            {swap.type === 'outgoing' ? 'You requested:' : 'They requested:'}
          </h4>
          <div className="flex gap-3">
            <img
              src={swap.requestedItem.images[0]}
              alt={swap.requestedItem.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{swap.requestedItem.title}</p>
              <p className="text-gray-600 text-xs">
                Owner: {swap.type === 'outgoing' ? swap.itemOwner.name : 'You'}
              </p>
            </div>
          </div>
        </div>

        {/* Offered Item/Points */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            {swap.type === 'outgoing' ? 'You offered:' : 'They offered:'}
          </h4>
          {swap.swapType === 'item-for-item' ? (
            <div className="flex gap-3">
              <img
                src={swap.offeredItem.images[0]}
                alt={swap.offeredItem.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{swap.offeredItem.title}</p>
                <p className="text-gray-600 text-xs">
                  Owner: {swap.type === 'outgoing' ? 'You' : swap.requester.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">💰</span>
              </div>
              <div>
                <p className="font-semibold text-sm">{swap.pointsOffered} Points</p>
                <p className="text-gray-600 text-xs">Points for item</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      {swap.message && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">"{swap.message}"</p>
        </div>
      )}

      {/* Action Buttons */}
      {swap.status === 'pending' && (
        <div className="flex gap-2 flex-wrap">
          {swap.type === 'incoming' ? (
            <>
              <button
                onClick={() => handleSwapAction(swap._id, 'accept')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => handleSwapAction(swap._id, 'decline')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Decline
              </button>
            </>
          ) : (
            <button
              onClick={() => handleSwapAction(swap._id, 'cancel')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
            >
              Cancel Request
            </button>
          )}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm">
            Message User
          </button>
        </div>
      )}

      {swap.status === 'accepted' && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleSwapAction(swap._id, 'complete')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
          >
            Mark as Completed
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm">
            View Shipping Info
          </button>
        </div>
      )}

      {swap.acceptedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Accepted: {formatDate(swap.acceptedAt)}
        </p>
      )}

      {swap.completedAt && (
        <p className="text-xs text-gray-500 mt-2">
          Completed: {formatDate(swap.completedAt)}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your swaps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Swaps</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { key: 'pending', label: 'Pending', count: swaps.pending.length },
              { key: 'accepted', label: 'Accepted', count: swaps.accepted.length },
              { key: 'completed', label: 'Completed', count: swaps.completed.length },
              { key: 'declined', label: 'Declined', count: swaps.declined.length },
              { key: 'cancelled', label: 'Cancelled', count: swaps.cancelled.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 min-w-max px-6 py-4 text-center transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Swaps List */}
        <div>
          {swaps[activeTab].length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">
                {activeTab === 'pending' && '⏳'}
                {activeTab === 'accepted' && '🤝'}
                {activeTab === 'completed' && '✅'}
                {activeTab === 'declined' && '❌'}
                {activeTab === 'cancelled' && '🚫'}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No {activeTab} swaps
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'pending' && "You don't have any pending swap requests."}
                {activeTab === 'accepted' && "You don't have any accepted swaps."}
                {activeTab === 'completed' && "You haven't completed any swaps yet."}
                {activeTab === 'declined' && "You don't have any declined swaps."}
                {activeTab === 'cancelled' && "You don't have any cancelled swaps."}
              </p>
              {activeTab === 'pending' && (
                <Link
                  to="/browse"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Browse Items to Swap
                </Link>
              )}
            </div>
          ) : (
            <div>
              {swaps[activeTab].map(swap => (
                <SwapCard key={swap._id} swap={swap} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {user && (swaps.pending.length > 0 || swaps.accepted.length > 0 || swaps.completed.length > 0) && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Swap Statistics</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <h4 className="text-2xl font-bold text-yellow-600">
                  {swaps.pending.filter(s => s.type === 'outgoing').length}
                </h4>
                <p className="text-gray-600 text-sm">Outgoing Pending</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-green-600">
                  {swaps.pending.filter(s => s.type === 'incoming').length}
                </h4>
                <p className="text-gray-600 text-sm">Incoming Pending</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-600">
                  {swaps.accepted.length}
                </h4>
                <p className="text-gray-600 text-sm">In Progress</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-purple-600">
                  {swaps.completed.length}
                </h4>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
            </div>
            
            {/* User Points Display */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.points || 100}</div>
                  <div className="text-sm text-gray-600">Available Points</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-gray-600">{user.level?.icon || '🌱'}</div>
                  <div className="text-sm text-gray-600">{user.level?.name || 'Newbie'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/browse"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              to="/add-item"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add New Item
            </Link>
            <Link
              to="/my-items"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              My Items
            </Link>
            <Link
              to="/favorites"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
            >
              My Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swaps;
