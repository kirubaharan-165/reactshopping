import React from 'react';
import '../styles/CartItem.css';

// CartItem component - individual cart item with quantity controls
function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <div className="item-image">{item.image}</div>

      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-category">{item.category}</p>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="item-quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <div className="item-total">
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        title="Remove from cart"
      >
        ✕
      </button>
    </div>
  );
}

export default CartItem;
