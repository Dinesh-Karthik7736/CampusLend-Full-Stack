import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Step 1: Import the useAuth hook
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// This is a placeholder for your logo. 
// For now, we'll just show text.
// import logo from '../assets/logo.png'; 

const LoginPage = () => {
  const { auth } = useAuth(); // Step 2: Get the initialized 'auth' object from our context
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleFirebaseGoogleSignIn = async () => {
    // Step 3: Check if auth object is valid before using it
    if (!auth) {
      setError("Authentication service is not ready. Please refresh the page.");
      return;
    }

    setIsSigningIn(true);
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      // This will open the Google Sign-In popup using the correct auth instance
      // The onIdTokenChanged listener in AuthContext will handle the rest.
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Firebase Popup Sign-In Error:", err);
      setError('Failed to sign in. Please check the popup and try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-background">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 w-full bg-primary flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-light rounded-full opacity-50"></div>
        <div className="absolute -bottom-24 -right-10 w-72 h-72 bg-primary-light rounded-full opacity-50"></div>
        
        <div className="z-10 text-center">
            {/* <img src={logo} alt="CampusLend Logo" className="w-32 h-32 mx-auto mb-4" /> */}
            <h1 className="text-5xl font-bold mb-2">CampusLend</h1>
            <p className="text-xl text-primary-light">Share more, waste less.</p>
            <p className="mt-8 max-w-sm">The smart, trust-based platform for borrowing, lending, and bartering items within your campus community.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-text_primary mb-4">Welcome Back!</h2>
          <p className="text-text_secondary mb-8">Please sign in with your official college Google account to continue.</p>
          
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6">{error}</p>}

          <button
            onClick={handleFirebaseGoogleSignIn}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-soft hover:shadow-md transition-shadow duration-300 p-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 mr-4" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.9 0 6.9 1.6 9.1 3.7l6.9-6.9C35.9 2.5 30.5 0 24 0 14.9 0 7.3 5.4 4.1 12.9l7.8 6C13.8 13.3 18.5 9.5 24 9.5z"></path>
              <path fill="#34A853" d="M46.2 25.4c0-1.7-.2-3.4-.5-5H24v9.5h12.5c-.5 3.1-2.1 5.7-4.6 7.5l7.3 5.7c4.3-4 6.9-9.9 6.9-16.7z"></path>
              <path fill="#FBBC05" d="M11.9 28.8c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6C1.5 16.8 0 20.3 0 24s1.5 7.2 4.1 10.8l7.8-6z"></path>
              <path fill="#EA4335" d="M24 48c6.5 0 12-2.2 16.1-5.9l-7.3-5.7c-2.1 1.4-4.8 2.2-7.8 2.2-5.5 0-10.2-3.8-11.9-9L4.1 35.1C7.3 42.6 14.9 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span className="font-medium text-text_secondary">{isSigningIn ? 'Signing In...' : 'Sign in with Google'}</span>
          </button>

          <p className="text-xs text-gray-400 mt-8">By signing in, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
