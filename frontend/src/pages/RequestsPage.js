import React, { useState, useEffect, useCallback } from 'react';
import { getIncomingRequests, getOutgoingRequests, updateRequestStatus } from '../api/requests';
import { Loader2, Check, X, ArrowDown, ArrowUp, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RequestsPage = () => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { notification } = useAuth(); // Listen for notifications to refresh the page

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const [incomingData, outgoingData] = await Promise.all([
        getIncomingRequests(),
        getOutgoingRequests(),
      ]);
      setIncoming(incomingData);
      setOutgoing(outgoingData);
    } catch (err) {
      setError('Failed to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests, notification]); // Re-fetch when a notification arrives or on initial load

  const handleRequestAction = async (requestId, status) => {
    try {
        await updateRequestStatus(requestId, status);
        setIncoming(prev => prev.filter(req => req._id !== requestId));
    } catch (err) {
        alert('Failed to update request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // --- FIX: Filter out any requests with missing/deleted data before rendering ---
  const validIncoming = incoming.filter(req => req.requester && req.item);
  const validOutgoing = outgoing.filter(req => req.owner && req.item);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-text_primary mb-8">My Requests</h1>
      
      {error && <p className="text-red-600 bg-red-100 p-4 rounded-lg mb-8">{error}</p>}

      {/* Incoming Requests Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text_primary mb-4 flex items-center"><ArrowDown className="w-6 h-6 mr-3 text-secondary"/>Requests for Your Items</h2>
        <div className="bg-surface p-6 rounded-2xl shadow-soft space-y-4">
          {validIncoming.length > 0 ? (
            validIncoming.map(req => (
              <div key={req._id} className="border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <img src={req.requester.picture} alt={req.requester.name} className="w-8 h-8 rounded-full mr-3" />
                    <p className="text-text_primary">
                      <span className="font-bold">{req.requester.name}</span> wants to {req.type.toLowerCase()} your <span className="font-bold">{req.item.name}</span>.
                    </p>
                  </div>
                  {req.message && <p className="text-sm text-text_secondary mt-1 pl-11 italic">"{req.message}"</p>}
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
                  <button onClick={() => handleRequestAction(req._id, 'accepted')} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors" title="Accept">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleRequestAction(req._id, 'declined')} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors" title="Decline">
                    <X className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors" title="Chat (Coming Soon)">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-text_secondary text-center py-4">You have no new incoming requests.</p>
          )}
        </div>
      </div>

      {/* Outgoing Requests Section */}
      <div>
        <h2 className="text-2xl font-bold text-text_primary mb-4 flex items-center"><ArrowUp className="w-6 h-6 mr-3 text-primary"/>Your Requests for Items</h2>
        <div className="bg-surface p-6 rounded-2xl shadow-soft space-y-3">
          {validOutgoing.length > 0 ? (
            validOutgoing.map(req => (
              <div key={req._id} className="border border-gray-200 p-4 rounded-lg flex items-center justify-between">
                <p className="text-text_primary">
                  Your request for <span className="font-bold">{req.item.name}</span> to <span className="font-semibold">{req.owner.name}</span>
                </p>
                <StatusBadge status={req.status} />
              </div>
            ))
          ) : (
            <p className="text-text_secondary text-center py-4">You haven't made any requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        declined: 'bg-red-100 text-red-800',
        cancelled: 'bg-gray-100 text-gray-800'
    };
    return (
        <span className={`px-3 py-1 text-sm font-bold rounded-full ${styles[status] || styles.cancelled}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default RequestsPage;
