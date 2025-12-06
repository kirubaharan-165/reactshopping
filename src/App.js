import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/App.css';

function App() {
  // State management for cart and filter
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(100);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If product already in cart, increase quantity
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Navbar
        cartCount={totalItems}
        onCartClick={() => setShowCart(!showCart)}
        isCartOpen={showCart}
      />

      <div className="container">
        {showCart ? (
          <Cart
            cartItems={cart}
            totalPrice={totalPrice}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
          />
        ) : (
          <>
            <div className="filters-section">
              <div className="filter-group">
                <label htmlFor="category">Category: </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="price">Max Price: ${priceRange}</label>
                <input
                  id="price"
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
              </div>
            </div>

            <ProductList
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onAddToCart={addToCart}
            />
          </>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 React Shopping Page | Practice Project</p>
      </footer>
    </div>
  );
}

export default App;
