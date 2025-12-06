import React from 'react';
import CartItem from './CartItem';
import '../styles/Cart.css';

// Cart component - displays all cart items and total
function Cart({
  cartItems,
  totalPrice,
  onRemove,
  onUpdateQuantity,
  onClearCart
}) {
  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>

        <button
          className="clear-cart-btn"
          onClick={onClearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
