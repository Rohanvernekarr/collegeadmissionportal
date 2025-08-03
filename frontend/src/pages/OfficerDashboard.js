import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function OfficerDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/applications/applications/', { headers: authHeader() })
      .then(res => setApplications(res.data))
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, [navigate]);

  const openReview = (app) => {
    setSelectedApplication(app);
    setReviewStatus(app.status);
    setReviewNotes(app.review_notes || '');
  };

  const submitReview = () => {
    if (!selectedApplication) return;
    axios.post(`http://localhost:8000/api/applications/applications/${selectedApplication.id}/review/`,
      { status: reviewStatus, review_notes: reviewNotes }, { headers: authHeader() })
      .then(res => {
        setApplications(applications.map(app => app.id === res.data.id ? res.data : app));
        setSelectedApplication(null);
      })
      .catch(err => alert(JSON.stringify(err.response?.data)));
  };

  return (
    <div className="container mt-5">
      <h2>Admission Officer Dashboard</h2>

      <h4>Pending Applications</h4>
      <table className="table">
        <thead><tr><th>Applicant</th><th>Program</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.applicant.full_name}</td>
              <td>{app.program.name}</td>
              <td>{app.status}</td>
              <td><button className="btn btn-sm btn-info" onClick={() => openReview(app)}>Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApplication && (
        <div className="mt-4">
          <h5>Review Application: {selectedApplication.applicant.full_name}</h5>
          <label>Status:</label>
          <select className="form-control mb-2" value={reviewStatus} onChange={e => setReviewStatus(e.target.value)}>
            <option value="under_review">Under Review</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="admitted">Admitted</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
          <label>Notes:</label>
          <textarea className="form-control mb-2" value={reviewNotes} onChange={e => setReviewNotes(e.target.value)} />
          <button className="btn btn-success" onClick={submitReview}>Submit</button>
          <button className="btn btn-secondary ms-2" onClick={() => setSelectedApplication(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
