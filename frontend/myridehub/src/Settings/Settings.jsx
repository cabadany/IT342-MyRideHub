import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profilePicture: '',
    address: '',
    emergencyContact: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>
      <div className="settings-container">
        <h2> Settings </h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input name="address" type="text" value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Emergency Contact</label>
            <input name="emergencyContact" type="tel" value={formData.emergencyContact} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" value={formData.username} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <input name="profilePicture" type="file" accept="image/*" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Update Profile</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
