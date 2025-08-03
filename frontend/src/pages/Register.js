import React, { useState } from 'react';
import { register } from '../services/authService';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if(form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(form);
      setSuccess("Registration successful! Please login.");
      setError('');
      setForm({ username: '', email: '', password: '', password2: '' });
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Username" name="username" value={form.username} onChange={onChange} required />
        <input className="form-control mb-2" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <input className="form-control mb-2" placeholder="Password" type="password" name="password" value={form.password} onChange={onChange} required />
        <input className="form-control mb-2" placeholder="Confirm Password" type="password" name="password2" value={form.password2} onChange={onChange} required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
