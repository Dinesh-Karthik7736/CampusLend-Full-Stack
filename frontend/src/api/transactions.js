import axios from 'axios';

const API_URL = 'http://localhost:5001/api/transactions';

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
 * Fetches active transactions for the current user (both lent and borrowed).
 * @returns {Promise<Array>} A list of active transactions.
 */
export const getActiveTransactions = async () => {
  try {
    const res = await axios.get(`${API_URL}/active`, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error fetching active transactions:', error.response ? error.response.data : error.message);
    throw error;
  }
};
