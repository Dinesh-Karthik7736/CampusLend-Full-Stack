import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api/items';
import { UploadCloud, Loader2, Calendar } from 'lucide-react';

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    listingType: 'Lend',
    location: '',
    availableFrom: '',
    availableTo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createItem(formData);
      navigate('/browse');
    } catch (err) {
      setError('Failed to list item. Please check all fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-surface p-8 rounded-2xl shadow-soft">
        <h1 className="text-3xl font-bold text-text_primary mb-2">List Your Item</h1>
        <p className="text-text_secondary mb-8">Share your item with the campus community. Fill out the details below.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-text_secondary bg-background hover:border-primary transition-colors">
              <UploadCloud className="w-12 h-12 mb-2" />
              <p className="font-semibold">Click to upload image</p>
              <p className="text-sm">(Coming Soon)</p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-text_primary mb-1">Item Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g., Scientific Calculator" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-text_primary mb-1">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Describe the item's condition, features, etc."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-text_primary mb-1">Category</label>
              <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                <option>Electronics</option>
                <option>Books</option>
                <option>Lab Equipment</option>
                <option>Stationery</option>
                <option>Sports Gear</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="listingType" className="block text-sm font-bold text-text_primary mb-1">Listing For</label>
              <select name="listingType" id="listingType" value={formData.listingType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                <option>Lend</option>
                <option>Barter</option>
                <option>Lend or Barter</option>
              </select>
            </div>
          </div>
          
          {/* --- NEW DATE FIELDS --- */}
          <div>
            <label className="block text-sm font-bold text-text_primary mb-1">Availability Dates</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="availableFrom" className="text-xs text-text_secondary">From</label>
                    <input type="date" name="availableFrom" id="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label htmlFor="availableTo" className="text-xs text-text_secondary">To</label>
                    <input type="date" name="availableTo" id="availableTo" value={formData.availableTo} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-bold text-text_primary mb-1">Your Location</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g., Central Library, 2nd Floor" />
          </div>

          {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              {loading ? 'Listing Item...' : 'List My Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
