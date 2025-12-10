import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="FashionStore" className="logo" />
          FashionStore
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/men" className="nav-link">
              Men
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/women" className="nav-link">
              Women
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/kids" className="nav-link">
              Kids
            </Link>
          </li>
        </ul>
        <div className="nav-icons">
          <button className="icon-btn" aria-label="Search">
            <span className="icon">🔍</span>
          </button>
          <button className="icon-btn" aria-label="Wishlist">
            <span className="icon">❤️</span>
          </button>
          <button className="icon-btn" aria-label="Cart">
            <span className="icon">🛒</span>
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;