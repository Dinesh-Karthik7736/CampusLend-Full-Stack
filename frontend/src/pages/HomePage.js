import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getMyItems, deleteItem } from '../api/items';
import { getActiveTransactions } from '../api/transactions';
import { Loader2, PlusCircle, BookOpen, Repeat, Trash2 } from 'lucide-react';

const HomePage = () => {
  const { currentUser } = useAuth();
  const [myItems, setMyItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [itemsData, transactionsData] = await Promise.all([
        getMyItems(),
        getActiveTransactions()
      ]);
      setMyItems(itemsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        try {
            await deleteItem(itemId);
            loadDashboardData();
        } catch (error) {
            alert('Failed to delete item. Please try again.');
        }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text_primary">
          Welcome back, <span className="text-primary">{currentUser?.name?.split(' ')[0]}</span>!
        </h1>
        <p className="mt-2 text-lg text-text_secondary">Here's what's happening in your CampusLend world.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-text_primary mb-4">My Listed Items</h2>
          <div className="bg-surface p-6 rounded-2xl shadow-soft space-y-4">
            {myItems.length > 0 ? (
              myItems.map(item => <MyItemCard key={item._id} item={item} onDelete={handleDeleteItem} />)
            ) : (
              <div className="text-center py-10">
                <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-text_primary">Nothing here yet!</h3>
                <p className="text-text_secondary mt-2 mb-4">You haven't listed any items.</p>
                <Link to="/add-item" className="inline-flex items-center bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  List Your First Item
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text_primary mb-4">Active Transactions</h2>
          <div className="bg-surface p-6 rounded-2xl shadow-soft space-y-4">
            {transactions.length > 0 ? (
                transactions.map(tx => <TransactionCard key={tx._id} tx={tx} currentUserId={currentUser._id} />)
            ) : (
                <div className="text-center py-6">
                    <Repeat className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-text_secondary">No active loans or borrows.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyItemCard = ({ item, onDelete }) => {
  const statusStyles = {
    available: 'bg-green-100 text-green-800',
    lent: 'bg-yellow-100 text-yellow-800',
    requested: 'bg-blue-100 text-blue-800',
  };
  return (
    <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-bold text-text_primary">{item.name}</h4>
        <p className="text-sm text-text_secondary">{item.category}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusStyles[item.status] || 'bg-gray-100'}`}>
          {item.status}
        </span>
        <button onClick={() => onDelete(item._id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const TransactionCard = ({ tx, currentUserId }) => {
    // --- FIX: Add safety checks before rendering ---
    if (!tx || !tx.owner || !tx.borrower || !tx.item) {
        // Don't render the card if essential data is missing
        return null; 
    }

    const isLending = tx.owner._id === currentUserId;
    const otherParty = isLending ? tx.borrower : tx.owner;
    const returnDate = new Date(tx.returnDate);
    const isOverdue = returnDate < new Date();

    return (
        <div className={`border-l-4 p-4 rounded-r-lg ${isLending ? 'border-blue-500 bg-blue-50' : 'border-purple-500 bg-purple-50'}`}>
            <div className="flex items-center justify-between mb-2">
                {/* Use optional chaining (?.) as an extra safety measure */}
                <p className="font-bold text-text_primary truncate">{tx.item?.name}</p>
                <span className={`text-xs font-bold ${isLending ? 'text-blue-600' : 'text-purple-600'}`}>
                    {isLending ? 'LENDING' : 'BORROWING'}
                </span>
            </div>
            <p className="text-sm text-text_secondary">
                {isLending ? 'To: ' : 'From: '} 
                <span className="font-semibold">{otherParty?.name}</span>
            </p>
            <p className={`text-sm mt-1 font-semibold ${isOverdue ? 'text-red-600' : 'text-text_secondary'}`}>
                Return by: {returnDate.toLocaleDateString()}
            </p>
        </div>
    );
};

export default HomePage;
