// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '', role: 'applicant' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords don't match");
      return;
    }
    try {
      await register(form);
      setSuccess('Registration successful! You can now login.');
      setError('');
      setForm({ username:'', email:'', password:'', password2:'', role:'applicant' });
      // Optionally redirect to login page
      // navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" value={form.username} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" name="password2" className="form-control" value={form.password2} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={form.role} onChange={handleChange}>
            <option value="applicant">Applicant</option>
            <option value="officer">Admission Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
