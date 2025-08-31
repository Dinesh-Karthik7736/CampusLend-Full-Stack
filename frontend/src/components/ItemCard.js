import React from 'react';
import { MapPin, Shield, Calendar } from 'lucide-react';

const ItemCard = ({ item, onActionClick }) => {
  const getPlaceholderColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };

  const placeholderColor = getPlaceholderColor(item.name);

  // Helper to format dates safely
  const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      // Check if the created date is valid before trying to format it
      if (isNaN(date.getTime())) {
          return null;
      }
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  const availableFrom = formatDate(item.availableFrom);
  const availableTo = formatDate(item.availableTo);

  // New logic to build the availability text
  let availabilityText = '';
  if (availableFrom && availableTo) {
      availabilityText = `Available: ${availableFrom} - ${availableTo}`;
  } else if (availableFrom) {
      availabilityText = `Available from: ${availableFrom}`;
  } else if (availableTo) {
      availabilityText = `Available until: ${availableTo}`;
  }

  return (
    <div className="bg-surface rounded-2xl shadow-soft overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="w-full h-48 bg-gray-200 relative">
        <img 
          src={`https://placehold.co/600x400/${placeholderColor}/FFFFFF?text=${encodeURIComponent(item.name.charAt(0))}`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
          {item.listingType}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-text_secondary font-medium">{item.category}</p>
        <h3 className="text-lg font-bold text-text_primary truncate mt-1">{item.name}</h3>
        
        {/* --- UPDATED DISPLAY LOGIC --- */}
        {/* This will now render as long as there is any valid date info */}
        {availabilityText && (
            <div className="flex items-center text-xs text-secondary font-bold mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{availabilityText}</span>
            </div>
        )}

        <div className="flex items-center text-sm text-text_secondary mt-2">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="border-t border-gray-100 my-4"></div>
        <div className="flex items-center">
          <img 
            src={item.owner.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.owner.name)}`} 
            alt={item.owner.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="flex-grow">
            <p className="text-sm font-semibold text-text_primary truncate">{item.owner.name}</p>
            <div className="flex items-center text-xs text-green-600">
                <Shield className="w-3 h-3 mr-1" />
                <span>Trust Score: {item.owner.trustScore}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onActionClick(item)} 
          className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300">
          Request Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
