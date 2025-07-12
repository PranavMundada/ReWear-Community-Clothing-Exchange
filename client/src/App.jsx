import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem';
import MyItems from './pages/MyItems';
import Swaps from './pages/Swaps';
import Profile from './pages/Profile';
import Favorites from './pages/Favourites';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Main App Content Component
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>Loading ReWear...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <main className="main-content" style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/add-item" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } />
          
          <Route path="/my-items" element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          } />
          
          <Route path="/swaps" element={
            <ProtectedRoute>
              <Swaps />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes - Require Admin Role */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          
          {/* Category Routes */}
          <Route path="/category/:category" element={<LandingPage />} />
          
          {/* Search Routes */}
          <Route path="/search" element={<LandingPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
