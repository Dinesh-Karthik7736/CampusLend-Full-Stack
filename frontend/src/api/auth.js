import axios from 'axios';

// The base URL for our backend server
const API_URL = 'http://localhost:5001/api/auth';

/**
 * Sends user data from Firebase to our backend to be saved in MongoDB.
 * @param {object} firebaseUser - The user object from Firebase authentication.
 * @returns {Promise<object>} The user data from our backend.
 */
export const googleSignIn = async (firebaseUser) => {
  try {
    const { uid, email, displayName, photoURL } = firebaseUser;
    
    // The backend endpoint expects this data in the request body
    const res = await axios.post(`${API_URL}/google-signin`, {
      uid,
      email,
      displayName,
      photoURL,
    });

    return res.data;
  } catch (error) {
    console.error('Error during backend sign-in:', error.response ? error.response.data : error.message);
    throw error;
  }
};
