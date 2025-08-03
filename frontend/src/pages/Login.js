import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);

      // In real app, fetch profile after login to know role:
      const role = prompt("For demo only: enter your role (admin/officer/applicant)").toLowerCase();
      localStorage.setItem('user_role', role);

      if(role === 'applicant') navigate('/dashboard/applicant');
      else if(role === 'officer') navigate('/dashboard/officer');
      else if(role === 'admin') navigate('/dashboard/admin');
      else navigate('/login');

    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Username" name="username" value={form.username} onChange={onChange} required />
        <input className="form-control mb-2" placeholder="Password" type="password" name="password" value={form.password} onChange={onChange} required />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
