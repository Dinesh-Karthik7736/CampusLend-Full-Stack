import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

// A helper function to get the auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('idToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Fetches the current user's profile data from the backend.
 * @returns {Promise<object>} The user's profile data.
 */
export const getProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Updates the current user's profile data.
 * @param {object} profileData - The updated profile data.
 * @returns {Promise<object>} The newly updated user data.
 */
export const updateProfile = async (profileData) => {
  try {
    const res = await axios.put(`${API_URL}/profile`, profileData, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};
