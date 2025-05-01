import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Settings.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://it342-myridehub.onrender.com';

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
    username: ''
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const picture = localStorage.getItem('userPicture');

    if (!email) {
      console.warn('User email not found in localStorage');
      toast.error('User not logged in. Redirecting to login page...');
      setTimeout(() => navigate('/login'), 2000);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/users/current`, {
      headers: {
        'X-User-Email': email
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setProfile({ ...data, picture });
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          contactNumber: data.contactNumber || '',
          address: data.address || '',
          username: data.username || ''
        });
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        toast.error('Unable to load user profile.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile?.id) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info('You have been logged out.');
    setTimeout(() => navigate('/login'), 1000);
  };

  if (loading) {
    return (
      <div className="settings-container">
        <ToastContainer />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="settings-container">
        <ToastContainer />
        <p>User profile not found.</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <ToastContainer />
      <h2>My Profile</h2>

      <div className="settings-profile-header">
        {profile.picture && <img src={profile.picture} alt="Profile" className="profile-picture circle-picture" />}
        <h3>{profile.fullName}</h3>
      </div>

      {!editing ? (
        <div className="profile-view">
          <p><strong>Full Name:</strong> {profile.fullName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contactNumber}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <button onClick={() => setEditing(true)} className="submit-btn">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} disabled />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Save</button>
        </form>
      )}

      <button onClick={() => navigate('/')} className="back-btn">← Back to Dashboard</button>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Settings;