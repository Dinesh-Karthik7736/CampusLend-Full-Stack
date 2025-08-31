import axios from 'axios';

const API_URL = 'http://localhost:5001/api/items';

const getAuthHeaders = () => {
  const token = localStorage.getItem('idToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createItem = async (itemData) => {
  try {
    const res = await axios.post(API_URL, itemData, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error creating item:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAvailableItems = async () => {
  try {
    const res = await axios.get(API_URL, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error fetching items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMyItems = async () => {
    try {
        const res = await axios.get(`${API_URL}/myitems`, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error("Error fetching user's items:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// --- THIS FUNCTION WAS MISSING ---
/**
 * Deletes an item by its ID.
 * @param {string} itemId - The ID of the item to delete.
 * @returns {Promise<object>} The success message from the backend.
 */
export const deleteItem = async (itemId) => {
    try {
        const res = await axios.delete(`${API_URL}/${itemId}`, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error("Error deleting item:", error.response ? error.response.data : error.message);
        throw error;
    }
};
