import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { PlusCircle, Bell, LogOut, User, LayoutDashboard, Search, Gift } from 'lucide-react';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Browse', path: '/browse', icon: Search },
    { name: 'My Requests', path: '/requests', icon: Gift },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    // The AuthProvider will handle navigation to the login page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return null; // Don't render navbar if no user is logged in
  }

  return (
    <nav className="bg-surface shadow-soft fixed top-0 left-0 right-0 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold text-primary">
              CampusLend
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary-light/20 text-primary'
                      : 'text-text_secondary hover:bg-gray-100'
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-2" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Actions and Profile */}
          <div className="flex items-center space-x-4">
            <Link
              to="/add-item"
              className="hidden sm:flex items-center bg-secondary text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              List an Item
            </Link>
            <button className="p-2 rounded-full text-text_secondary hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={currentUser.picture || `https://ui-avatars.com/api/?name=${currentUser.name}&background=8A2BE2&color=fff`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary-light"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg py-2 z-20">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-text_primary truncate">{currentUser.name}</p>
                    <p className="text-xs text-text_secondary truncate">{currentUser.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-text_secondary hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-2" /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
