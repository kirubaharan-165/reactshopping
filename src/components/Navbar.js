import React from 'react';
import '../styles/Navbar.css';

// Navbar component - displays header with cart button
function Navbar({ cartCount, onCartClick, isCartOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo">🛍️</span>
          <h1>React Shop</h1>
        </div>

        <button
          className={`cart-button ${isCartOpen ? 'active' : ''}`}
          onClick={onCartClick}
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-label">
            {isCartOpen ? 'Back to Products' : 'Cart'}
          </span>
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
