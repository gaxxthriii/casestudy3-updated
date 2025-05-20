import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f4f6f8',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '30px',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <label
            htmlFor="role-select"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Login As
          </label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />

          <label
            htmlFor="password"
            style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />

          {error && (
            <div
              style={{
                marginBottom: '20px',
                color: '#b00020',
                backgroundColor: '#f8d7da',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #f5c2c7',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Login
          </button>
        </form>

        <div
          style={{
            marginTop: '25px',
            fontSize: '14px',
            color: '#666',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Employee Management System
        </div>
      </div>
    </div>
  );
};

export default Login;
