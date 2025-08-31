import React, { useState, useEffect } from 'react';
import { getAvailableItems } from '../api/items';
import ItemCard from '../components/ItemCard';
import RequestModal from '../components/RequestModal';
import { Search, Loader2 } from 'lucide-react';

const BrowsePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getAvailableItems();
        setItems(data);
      } catch (err) {
        setError('Could not fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold text-text_secondary">Loading awesome items...</p>
        </div>
      );
    }
    if (error) {
      return <div className="text-center py-20 text-red-600 bg-red-50 rounded-lg">{error}</div>;
    }
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-text_primary">No Items Found</h3>
          <p className="text-text_secondary mt-2">Try adjusting your search or check back later!</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <ItemCard key={item._id} item={item} onActionClick={handleRequestClick} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text_primary">Explore & Borrow</h1>
          <p className="mt-4 text-lg text-text_secondary max-w-2xl mx-auto">Discover a world of shared items right on your campus. What are you looking for today?</p>
          <div className="mt-8 max-w-lg mx-auto relative">
            <input 
              type="text"
              placeholder="Search for books, chargers, lab coats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-soft"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>
        {renderContent()}
      </div>
      {selectedItem && <RequestModal item={selectedItem} onClose={handleCloseModal} />}
    </>
  );
};

export default BrowsePage;
