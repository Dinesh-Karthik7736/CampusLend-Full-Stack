import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../api/users';
import ProfilePicModal from '../components/ProfilePicModal';
import { Loader2, CheckCircle, Edit, Save, User, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';

const ProfilePage = () => {
  const { idToken, refreshUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false);

  // --- FIX: Wrap fetchProfile in useCallback ---
  const fetchProfile = useCallback(async () => {
    if (idToken) {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    }
  }, [idToken]); // Dependency for useCallback

  // --- FIX: Add fetchProfile to the dependency array ---
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async () => {
    setError('');
    try {
        await updateProfile(profile);
        setIsEditing(false);
        await refreshUser();
    } catch (err) {
        setError('Failed to update profile. Please try again.');
    }
  };
  
  const handlePictureSave = async (newPictureUrl) => {
    setError('');
    try {
        const updatedProfile = { ...profile, picture: newPictureUrl };
        await updateProfile(updatedProfile);
        setProfile(updatedProfile);
        await refreshUser();
        setIsPicModalOpen(false);
    } catch (err) {
        setError('Failed to update profile picture.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return <div className="text-center py-10 text-red-600">{error || 'Could not load profile.'}</div>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface p-8 rounded-2xl shadow-soft">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <img 
                src={profile.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=128&background=8A2BE2&color=fff`} 
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-primary-light shadow-lg"
              />
              <button onClick={() => setIsPicModalOpen(true)} className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Edit className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <h1 className="text-3xl font-bold text-text_primary">{profile.name}</h1>
                {profile.trustScore === 100 && (
                  <CheckCircle className="w-7 h-7 text-blue-500 ml-2" title="Trusted User" />
                )}
              </div>
              <p className="text-text_secondary mt-1">{profile.email}</p>
              <div className="mt-2 bg-green-100 text-green-800 text-lg font-bold px-4 py-1 rounded-full inline-block">
                Trust Score: {profile.trustScore}
              </div>
            </div>
            <div className="ml-auto mt-4 sm:mt-0">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center bg-primary/10 text-primary px-6 py-2 rounded-full font-semibold">
                  <Edit className="w-4 h-4 mr-2"/> Edit Details
                </button>
              ) : (
                <button onClick={handleSaveDetails} className="flex items-center bg-green-600 text-white px-6 py-2 rounded-full font-semibold">
                  <Save className="w-4 h-4 mr-2"/> Save Details
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-text_primary mb-6">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InfoField icon={User} label="Full Name" value={profile.name} name="name" isEditing={isEditing} onChange={handleInputChange} />
                  <InfoField icon={Mail} label="Email Address" value={profile.email} isEditing={false} />
                  <InfoField icon={Phone} label="Phone Number" value={profile.phone} name="phone" placeholder="Add phone number" isEditing={isEditing} onChange={handleInputChange} />
                  <InfoField icon={MapPin} label="Address" value={profile.address} name="address" placeholder="Add your address" isEditing={isEditing} onChange={handleInputChange} />
                  <InfoField icon={GraduationCap} label="College Year" value={profile.collegeYear} name="collegeYear" placeholder="e.g., 2nd Year, Computer Science" isEditing={isEditing} onChange={handleInputChange} />
                  <InfoField icon={Calendar} label="Date of Birth" value={profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''} name="dob" type="date" isEditing={isEditing} onChange={handleInputChange} />
              </div>
              {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg mt-6">{error}</p>}
          </div>
        </div>
      </div>
      {isPicModalOpen && (
        <ProfilePicModal 
            currentPicture={profile.picture}
            onSave={handlePictureSave}
            onClose={() => setIsPicModalOpen(false)}
        />
      )}
    </>
  );
};

// Helper component for displaying profile fields
const InfoField = ({ icon: Icon, label, value, name, placeholder, isEditing, onChange, type = 'text' }) => (
    <div>
        <label className="text-sm font-bold text-text_secondary flex items-center mb-2">
            <Icon className="w-5 h-5 mr-3 text-primary" />
            {label}
        </label>
        {isEditing && label !== 'Email Address' ? (
            <input 
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
        ) : (
            <p className="text-text_primary bg-gray-50 px-4 py-2 rounded-lg">{value || 'Not provided'}</p>
        )}
    </div>
);

export default ProfilePage;
