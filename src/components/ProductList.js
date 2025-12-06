import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../styles/ProductList.css';

// ProductList component - displays filtered products
function ProductList({ selectedCategory, priceRange, onAddToCart }) {
  // Filter products based on category and price
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch =
        selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch = product.price <= priceRange;

      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, priceRange]);

  return (
    <div className="product-list-container">
      <h2 className="products-title">
        Products ({filteredProducts.length})
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products match your filters. Try adjusting the criteria.</p>
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
