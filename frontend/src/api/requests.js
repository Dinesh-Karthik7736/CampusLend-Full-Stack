import axios from 'axios';

const API_URL = 'http://localhost:5001/api/requests';

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
 * Creates a new request for an item.
 * @param {object} requestData - The data for the new request.
 * @returns {Promise<object>} The created request data.
 */
export const createRequest = async (requestData) => {
  try {
    const res = await axios.post(API_URL, requestData, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('Error creating request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Fetches requests received by the current user.
 * @returns {Promise<Array>} A list of incoming requests.
 */
export const getIncomingRequests = async () => {
    try {
        const res = await axios.get(`${API_URL}/incoming`, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error('Error fetching incoming requests:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Fetches requests made by the current user.
 * @returns {Promise<Array>} A list of outgoing requests.
 */
export const getOutgoingRequests = async () => {
    try {
        const res = await axios.get(`${API_URL}/outgoing`, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error('Error fetching outgoing requests:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Updates the status of a request (accept/decline).
 * @param {string} requestId - The ID of the request to update.
 * @param {string} status - The new status ('accepted' or 'declined').
 * @returns {Promise<object>} The updated request data.
 */
export const updateRequestStatus = async (requestId, status) => {
    try {
        const res = await axios.put(`${API_URL}/${requestId}`, { status }, getAuthHeaders());
        return res.data;
    } catch (error) {
        console.error('Error updating request status:', error.response ? error.response.data : error.message);
        throw error;
    }
};
