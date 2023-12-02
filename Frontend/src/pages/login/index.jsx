import React, { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { request, isLoading, error } = useRequest('/auth/login', { method: 'POST' });
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    const requestBody = { email, password };
    try {
      const data = await request(requestBody);
      if (data.success) {
        alert('Login successful!');
        localStorage.setItem('token', data.data.token);
        navigate('/home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="login-page">
      <div className="login-container"> {/* Apply styles from index.css */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
