import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import api from '../api/client';
import { logout } from '../redux/authSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const publicLinks = [
    { to: '/', label: 'Home' },
  ];
  const authLinks = token
    ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/stocks', label: 'Stocks' },
        { to: '/trade', label: 'Trade' },
        { to: '/portfolio', label: 'Portfolio' },
        { to: '/watchlist', label: 'Watchlist' },
      ]
    : [
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ];

  if (token && user?.role === 'admin') {
    authLinks.push({ to: '/admin/stocks', label: 'Admin Stocks' });
  }

  const links = [...publicLinks, ...authLinks];

  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="brand-mark-icon" role="img">
              <defs>
                <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0e3a5d" />
                  <stop offset="100%" stopColor="#2eb5d3" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#brandGradient)" />
              <path
                d="M12 42L24 30L34 37L50 21"
                fill="none"
                stroke="#f5fcff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M44 21H50V27"
                fill="none"
                stroke="#f5fcff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 50H52" fill="none" stroke="#d6f5ff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>GrowUp</strong>
            <small>Growth Trading Lab</small>
          </span>
        </NavLink>

        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {token ? (
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={async () => {
                  try {
                    await api.post('/api/auth/logout');
                  } catch (_error) {
                    // Local logout should still proceed if server logout fails.
                  }
                  dispatch(logout());
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
