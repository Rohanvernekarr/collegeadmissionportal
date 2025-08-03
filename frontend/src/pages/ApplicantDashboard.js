import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function ApplicantDashboard() {
  const [profile, setProfile] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile
    axios.get('http://localhost:8000/api/accounts/profile/', { headers: authHeader() })
      .then(res => setProfile(res.data))
      .catch(() => {
        logout();
        navigate('/login');
      });

    // Fetch programs
    axios.get('http://localhost:8000/api/courses/', { headers: authHeader() })
      .then(res => setPrograms(res.data))
      .catch(console.error);

    // Fetch applications
    axios.get('http://localhost:8000/api/applications/applications/', { headers: authHeader() })
      .then(res => setApplications(res.data))
      .catch(console.error);
  }, [navigate]);

  const handleApply = () => {
    if(!selectedProgramId) return alert('Please select a program');
    axios.post('http://localhost:8000/api/applications/applications/', { program_id: selectedProgramId }, { headers: authHeader() })
      .then(res => setApplications(prev => [...prev, res.data]))
      .catch(err => alert("Error: " + JSON.stringify(err.response?.data)));
  };

  if(!profile) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {profile.username}</h2>

      <h4>Available Programs</h4>
      <select className="form-control" value={selectedProgramId} onChange={e => setSelectedProgramId(e.target.value)}>
        <option value="">-- Select Program --</option>
        {programs.map(p => <option key={p.id} value={p.id}>{p.name} ({p.category}) - Fees: ${p.fees}</option>)}
      </select>
      <button className="btn btn-primary mt-2" onClick={handleApply}>Apply</button>

      <h4 className="mt-4">My Applications</h4>
      <table className="table">
        <thead><tr><th>Program</th><th>Status</th><th>Submitted On</th></tr></thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.program.name}</td>
              <td>{app.status}</td>
              <td>{new Date(app.submitted_on).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
