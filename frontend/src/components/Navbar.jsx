import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userRole = localStorage.getItem('role');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('logintoken');
    localStorage.removeItem('role');
  };

  return (
    <nav
      style={{
        backgroundColor: '#4a4a4a',
        padding: '10px 20px',
        fontWeight: 600,
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700',
          }}
        >
          Employee Management
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none',
          }}
          aria-label="Toggle menu"
          className="menu-toggle"
        >
          &#9776;
        </button>

        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '20px',
            margin: 0,
            padding: 0,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          className={menuOpen ? 'menu-open' : ''}
        >
          {userRole === 'admin' && (
            <li>
              <Link
                to="/admin-dashboard"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/employees"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Employee List
            </Link>
          </li>

          {userRole === 'admin' && (
            <li>
              <Link
                to="/add-employee"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Add Employee
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/"
              onClick={handleLogout}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
