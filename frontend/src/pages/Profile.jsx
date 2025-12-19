import React, { useState, useEffect } from 'react';
import ProfileEditor from '../components/Auth/ProfileEditor';
import { API_CONFIG } from '../config/apiConfig';
import './Profile.css';

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Check for authentication token first
    const token = localStorage.getItem('auth_token');
    if (!token) {
      window.location.href = '/signin';
      return;
    }

    // Try to get user info from session
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.SESSION_STATUS}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const sessionData = await response.json();
          if (sessionData.valid && sessionData.user) {
            setUserId(sessionData.user.id);
            setUser(sessionData.user);
            // Also update user_id in localStorage in case it wasn't stored
            localStorage.setItem('user_id', sessionData.user.id);
          } else {
            window.location.href = '/signin';
          }
        } else {
          window.location.href = '/signin';
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        window.location.href = '/signin';
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfileSave = (profileData) => {
    setUser(prev => ({
      ...prev,
      ...profileData
    }));
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Profile Information</h2>
              {user && (
                <div className="user-info">
                  <p><strong>Email:</strong> <span>{user.email}</span></p>
                  <p><strong>Member Since:</strong> <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span></p>
                  {user.username && <p><strong>Username:</strong> <span>{user.username}</span></p>}
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>Edit Profile</h2>
              <ProfileEditor
                userId={userId}
                onSave={handleProfileSave}
              />
            </div>
          </div>
        );
      case 'hardware':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Hardware Specifications</h2>
              {user && (
                <div className="hardware-info">
                  <p><strong>Operating System:</strong> <span>{user.os || 'Not specified'}</span></p>
                  <p><strong>CPU:</strong> <span>{user.cpu || 'Not specified'}</span></p>
                  <p><strong>GPU:</strong> <span>{user.gpu || 'Not specified'}</span></p>
                  <p><strong>RAM:</strong> <span>{user.ram_gb ? `${user.ram_gb} GB` : 'Not specified'}</span></p>
                  <p><strong>Development Environment:</strong> <span>{user.development_environment || 'Not specified'}</span></p>
                </div>
              )}
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Learning Progress</h2>
              <div className="progress-info">
                <p><strong>Modules Completed:</strong> <span>0</span></p>
                <p><strong>Exercises Completed:</strong> <span>0</span></p>
                <p><strong>Learning Goals:</strong> <span>{user?.learning_goals?.join(', ') || 'None set'}</span></p>
                <p><strong>Programming Experience:</strong> <span>{user?.programming_experience || 'Not specified'}</span></p>
                <p><strong>Robotics Experience:</strong> <span>{user?.robotics_experience || 'Not specified'}</span></p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Account Settings</h2>
              <div className="settings-info">
                <p><strong>Primary Language:</strong> <span>{user?.primary_language || 'Not specified'}</span></p>
                <p><strong>Account Type:</strong> <span>Student</span></p>
                <p><strong>Email Notifications:</strong> <span>Enabled</span></p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Profile Information</h2>
              {user && (
                <div className="user-info">
                  <p><strong>Email:</strong> <span>{user.email}</span></p>
                  <p><strong>Member Since:</strong> <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span></p>
                  {user.username && <p><strong>Username:</strong> <span>{user.username}</span></p>}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#556B2F" strokeWidth="2" fill="none"/>
              <path d="M12 2C17.5228 2 22 6.47715 22 12" stroke="#556B2F" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userId && !isLoading) {
    return (
      <div className="profile-error">
        <div className="error-content">
          <div className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2" fill="none"/>
              <path d="M8 8L16 16M16 8L8 16" stroke="#dc3545" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-dashboard">
        <div className="sidebar">
          <div className="profile-sidebar-header">
            <div className="profile-avatar">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#556B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#556B2F" strokeWidth="2"/>
              </svg>
            </div>
            <div className="profile-info">
              <h3>{user?.username || user?.email.split('@')[0]}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span>👤 Profile</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'hardware' ? 'active' : ''}`}
              onClick={() => setActiveTab('hardware')}
            >
              <span>💻 Hardware</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <span>📊 Progress</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span>⚙️ Settings</span>
            </button>
          </nav>
        </div>

        <div className="main-content">
          <div className="profile-header">
            <h1>Your Dashboard</h1>
            <p>Manage your hardware specifications, experience level, and learning preferences</p>
          </div>

          {renderTabContent()}

          <div className="back-to-home">
            <a href="/">← Back to Homepage</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;