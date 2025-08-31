import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { googleSignIn } from '../api/auth';
import io from 'socket.io-client'; // Import the socket.io client

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);
  const [notification, setNotification] = useState(null); // State for new notifications
  const socket = useRef();

  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) {
        setCurrentUser(null);
        return;
    }
    try {
        const backendUser = await googleSignIn(firebaseUser);
        setCurrentUser({ ...firebaseUser, ...backendUser });
    } catch (error) {
        console.error("Failed to sync user with backend", error);
        setCurrentUser(null);
    }
  };

  // Effect to manage socket connection based on user login state
  useEffect(() => {
    if (currentUser) {
      // Connect to the socket server
      socket.current = io("http://localhost:5001");
      
      // Send the user's ID to the server to track online status
      socket.current.emit("addUser", currentUser._id);

      // Listen for new request notifications
      socket.current.on("newRequest", (data) => {
        setNotification({ type: 'new', message: data.message });
      });

      // Listen for updates on requests you made
      socket.current.on("requestUpdate", (data) => {
        setNotification({ type: 'update', message: data.message });
      });

    } else {
      // Disconnect the socket if the user logs out
      if (socket.current) {
        socket.current.disconnect();
      }
    }

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);


  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
        localStorage.setItem('idToken', token);
        await syncUserWithBackend(user);
      } else {
        setCurrentUser(null);
        setIdToken(null);
        localStorage.removeItem('idToken');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const refreshUser = async () => {
      if (auth.currentUser) {
          await syncUserWithBackend(auth.currentUser);
      }
  };

  const dismissNotification = () => {
      setNotification(null);
  };

  const value = {
    currentUser,
    idToken,
    loading,
    auth,
    refreshUser,
    notification,
    dismissNotification,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
