import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AddItemPage from './pages/AddItemPage';
import RequestsPage from './pages/RequestsPage';
import ProfilePage from './pages/ProfilePage';

// Import Components
import Navbar from './components/Navbar';
import NotificationPopup from './components/NotificationPopup'; // <-- Import NotificationPopup

// A protected route component
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl font-semibold text-primary">Loading Platform...</div>
        </div>
    );
  }

  return (
    <Router>
      {currentUser && <Navbar />}
      <NotificationPopup /> {/* <-- Add the NotificationPopup here */}
      <main className={currentUser ? "pt-20 bg-background" : "bg-background"}>
        <Routes>
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><BrowsePage /></ProtectedRoute>} />
          <Route path="/add-item" element={<ProtectedRoute><AddItemPage /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><RequestsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} />} />
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
