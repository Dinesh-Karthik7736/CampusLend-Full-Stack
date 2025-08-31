import React, { useState } from 'react';
import { X, Save, Image, Loader2 } from 'lucide-react';

const ProfilePicModal = ({ currentPicture, onSave, onClose }) => {
  const [newPictureUrl, setNewPictureUrl] = useState(currentPicture || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(newPictureUrl);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-soft p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-text_primary mb-6">Update Profile Picture</h2>
        
        <div className="flex justify-center mb-6">
            <img 
                src={newPictureUrl || `https://ui-avatars.com/api/?name=?&size=128&background=8A2BE2&color=fff`}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full border-4 border-primary-light shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=?&size=128&background=EAEAEA&color=000`}}
            />
        </div>

        <div>
          <label htmlFor="pictureUrl" className="block text-sm font-bold text-text_primary mb-1 flex items-center">
            <Image className="w-4 h-4 mr-2" />
            Image URL
          </label>
          <input
            id="pictureUrl"
            type="text"
            value={newPictureUrl}
            onChange={(e) => setNewPictureUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/your-image.png"
          />
        </div>

        <div className="flex justify-end mt-8 space-x-4">
            <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-full font-semibold text-text_secondary hover:bg-gray-100">
                Cancel
            </button>
            <button onClick={handleSave} disabled={loading} className="flex items-center justify-center bg-primary text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                {loading ? 'Saving...' : 'Save'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicModal;
