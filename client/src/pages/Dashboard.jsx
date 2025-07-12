import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [userItems, setUserItems] = useState([])
  const [swaps, setSwaps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      
      // Fetch user's items
      const itemsResponse = await axios.get('http://localhost:5000/api/items/my-items', { headers })
      setUserItems(itemsResponse.data)
      
      // Fetch user's swaps
      const swapsResponse = await axios.get('http://localhost:5000/api/items/my-swaps', { headers })
      setSwaps(swapsResponse.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSwapStatus = (swap) => {
    if (swap.status === 'pending') return 'Pending'
    if (swap.status === 'accepted') return 'Accepted'
    if (swap.status === 'completed') return 'Completed'
    if (swap.status === 'rejected') return 'Rejected'
    return 'Unknown'
  }

  const getSwapStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'accepted': return 'status-accepted'
      case 'completed': return 'status-completed'
      case 'rejected': return 'status-rejected'
      default: return 'status-unknown'
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Profile Section */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span>{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <div className="points-display">
                  <span className="points-label">Points Balance:</span>
                  <span className="points-value">{user?.points || 0}</span>
                </div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{userItems.length}</span>
                <span className="stat-label">Items Listed</span>
              </div>
              <div className="stat">
                <span className="stat-number">{swaps.filter(s => s.status === 'completed').length}</span>
                <span className="stat-label">Completed Swaps</span>
              </div>
              <div className="stat">
                <span className="stat-number">{swaps.filter(s => s.status === 'pending').length}</span>
                <span className="stat-label">Pending Swaps</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/add-item" className="btn btn-primary">
              List New Item
            </Link>
            <Link to="/browse" className="btn btn-outline">
              Browse Items
            </Link>
          </div>
        </section>

        {/* My Items Section */}
        <section className="my-items-section">
          <div className="section-header">
            <h3>My Listed Items</h3>
            <Link to="/add-item" className="btn btn-small">Add Item</Link>
          </div>
          
          {userItems.length > 0 ? (
            <div className="items-grid">
              {userItems.map((item) => (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    <img src={item.images[0] || '/placeholder-clothing.jpg'} alt={item.title} />
                    <div className={`item-status ${item.status}`}>
                      {item.status === 'approved' ? '✓ Approved' : 
                       item.status === 'pending' ? '⏳ Pending' : '❌ Rejected'}
                    </div>
                  </div>
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p className="item-category">{item.category}</p>
                    <p className="item-condition">Condition: {item.condition}</p>
                    <div className="item-actions">
                      <Link to={`/item/${item._id}`} className="btn btn-small">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't listed any items yet.</p>
              <Link to="/add-item" className="btn btn-primary">
                List Your First Item
              </Link>
            </div>
          )}
        </section>

        {/* Swaps Section */}
        <section className="swaps-section">
          <h3>My Swaps</h3>
          
          {swaps.length > 0 ? (
            <div className="swaps-list">
              {swaps.map((swap) => (
                <div key={swap._id} className="swap-card">
                  <div className="swap-items">
                    <div className="swap-item">
                      <img src={swap.requestedItem.images[0] || '/placeholder-clothing.jpg'} alt={swap.requestedItem.title} />
                      <div className="item-details">
                        <h4>{swap.requestedItem.title}</h4>
                        <p>You want this</p>
                      </div>
                    </div>
                    <div className="swap-arrow">⇄</div>
                    <div className="swap-item">
                      <img src={swap.offeredItem.images[0] || '/placeholder-clothing.jpg'} alt={swap.offeredItem.title} />
                      <div className="item-details">
                        <h4>{swap.offeredItem.title}</h4>
                        <p>You're offering this</p>
                      </div>
                    </div>
                  </div>
                  <div className="swap-status">
                    <span className={`status-badge ${getSwapStatusClass(swap.status)}`}>
                      {getSwapStatus(swap)}
                    </span>
                    <p className="swap-date">
                      {new Date(swap.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No swaps yet. Start browsing items to make your first swap!</p>
              <Link to="/browse" className="btn btn-primary">
                Browse Items
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard 