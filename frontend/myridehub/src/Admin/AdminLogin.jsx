import React, { useState } from 'react';
import './AdminLogin.css';

const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin('admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="admin-login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
