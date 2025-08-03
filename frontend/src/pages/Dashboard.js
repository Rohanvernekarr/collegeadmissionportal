import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/accounts/me/', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });
        setUser(res.data);
      } catch (error) {
        // If token expired or invalid, logout and redirect
        logout();
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
