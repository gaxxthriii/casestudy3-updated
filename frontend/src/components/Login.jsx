import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('user'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post(`http://localhost:3000/user/${role}/login`, form);
    const { token, user } = res.data;

    localStorage.setItem('logintoken', token);
    localStorage.setItem('role', user.role);


    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/employees');
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    setError('Invalid credentials. Please try again.');
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Login As</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name='email'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              Employee Management System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
