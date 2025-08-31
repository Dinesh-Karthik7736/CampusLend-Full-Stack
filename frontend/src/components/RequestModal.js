import React, { useState } from 'react';
import { createRequest } from '../api/requests';
import RequestSuccessAnimation from './RequestSuccessAnimation';
import { X, Send, Loader2 } from 'lucide-react';

const RequestModal = ({ item, onClose }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createRequest({
        itemId: item._id,
        type: item.listingType.startsWith('Lend') ? 'Lend' : 'Barter',
        message,
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to send request. The item might no longer be available.');
      setLoading(false);
    }
  };

  if (success) {
    return <RequestSuccessAnimation onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-soft p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-text_primary mb-2">Requesting: {item.name}</h2>
        <p className="text-text_secondary mb-6">Send a message to the owner, {item.owner.name}.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-text_primary mb-1">Your Message</label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={`e.g., "Hi ${item.owner.name}, I'd love to borrow this for my project!"`}
            />
          </div>
          {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm">{error}</p>}
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
