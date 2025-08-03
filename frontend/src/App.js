import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ApplicantDashboard from './pages/ApplicantDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { isLoggedIn } from './services/authService';

const PrivateRoute = ({ children, roles }) => {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  const storedRole = localStorage.getItem('user_role');
  if (roles && !roles.includes(storedRole)) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard/applicant' element={
          <PrivateRoute roles={['applicant']}>
            <ApplicantDashboard />
          </PrivateRoute>} />

        <Route path='/dashboard/officer' element={
          <PrivateRoute roles={['officer']}>
            <OfficerDashboard />
          </PrivateRoute>} />

        <Route path='/dashboard/admin' element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
