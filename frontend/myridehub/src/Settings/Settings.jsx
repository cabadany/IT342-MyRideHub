import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      toast.error('User not logged in. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    fetch(`${API_BASE_URL}/api/users/current`, {
      headers: { 'X-User-Email': email }
    })
      .then(res => res.json())
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
      .catch(() => toast.error('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error();
      toast.success('Profile updated.');
      setEditing(false);
    } catch {
      toast.error('Update failed.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info('Logged out.');
    setTimeout(() => navigate('/login'), 1000);
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!profile) return <div className="p-4 text-center">Profile not found.</div>;

  return (
    <div className="dashboard-page">
      <ToastContainer />

      <div className="logo-top-center">
        <img src="/Ride Hub Logo (Dark).png" alt="Ride Hub Logo" className="dashboard-logo" />
      </div>

      <nav className="main-nav">
        <div className="nav-wrapper">
          <ul className="nav-menu">
            <li><Link to="/dashboard">HOME</Link></li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">OUR SERVICES ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/booking">Book a Vehicle</Link></li>
                <li><Link to="/rent">Rent a Vehicle</Link></li>
                <li><Link to="/fare-calculator">Fare Calculator</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">HISTORY ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/rent-history">Rent History</Link></li>
                <li><Link to="/book-history">Book History</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">JOIN US ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/be-a-driver">Be a Driver</Link></li>
              </ul>
            </li>

            <li className="dropdown-container">
              <span className="dropdown-toggle">CONTACT US ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/contact-us">Passenger Appeal Form</Link></li>
              </ul>
            </li>

            <li><Link to="/settings" className="active">SETTINGS</Link></li>

            <li>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            </li>

            <li>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="divider-line"></div>

      <main className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          {profile.picture && <img src={profile.picture} alt="Profile" className="w-16 h-16 rounded-full" />}
          <div>
            <h2 className="text-xl font-semibold">{profile.fullName}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {!editing ? (
          <div className="mt-6 space-y-2">
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Contact:</strong> {profile.contactNumber}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <button onClick={() => setEditing(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" value={formData.email} disabled className="w-full p-2 bg-gray-100 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end gap-2">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            </div>
          </form>
        )}

        <button onClick={() => navigate('/dashboard')} className="mt-6 text-blue-500 hover:underline">← Back to Dashboard</button>
      </main>
    </div>
  );
};

export default Settings;