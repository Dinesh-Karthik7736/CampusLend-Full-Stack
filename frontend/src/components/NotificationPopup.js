import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, X } from 'lucide-react';

const NotificationPopup = () => {
  const { notification, dismissNotification } = useAuth();

  useEffect(() => {
    if (notification) {
      // Automatically dismiss the notification after 5 seconds
      const timer = setTimeout(() => {
        dismissNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, dismissNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div className="fixed top-24 right-5 bg-surface rounded-xl shadow-lg p-4 w-80 z-50 animate-slide-in">
       <style>{`
        @keyframes slide-in {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.5s ease-out forwards; }
      `}</style>
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-bold text-text_primary">New Notification</p>
          <p className="mt-1 text-sm text-text_secondary">{notification.message}</p>
        </div>
        <button onClick={dismissNotification} className="ml-4 p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
