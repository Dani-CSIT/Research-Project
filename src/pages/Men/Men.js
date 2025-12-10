import React from 'react';
import './Men.css';

const Men = () => {
  const menProducts = [
    { 
      id: 1, 
      name: 'Classic White Shirt', 
      price: '$45.99', 
      image: '/api/placeholder/250/300',
      category: 'Shirts'
    },
    { 
      id: 2, 
      name: 'Denim Jeans', 
      price: '$59.99', 
      image: '/api/placeholder/250/300',
      category: 'Pants'
    },
    { 
      id: 3, 
      name: 'Sports Jacket', 
      price: '$89.99', 
      image: '/api/placeholder/250/300',
      category: 'Jackets'
    },
    { 
      id: 4, 
      name: 'Running Shoes', 
      price: '$79.99', 
      image: '/api/placeholder/250/300',
      category: 'Shoes'
    },
    { 
      id: 5, 
      name: 'Casual T-Shirt', 
      price: '$24.99', 
      image: '/api/placeholder/250/300',
      category: 'T-Shirts'
    },
    { 
      id: 6, 
      name: 'Formal Trousers', 
      price: '$65.99', 
      image: '/api/placeholder/250/300',
      category: 'Pants'
    },
  ];

  return (
    <div className="men-page">
      <div className="page-header">
        <div className="container">
          <h1>Men's Collection</h1>
          <p>Discover stylish and comfortable clothing for men</p>
        </div>
      </div>
      
      <div className="container">
        <div className="filters-section">
          <div className="filters">
            <select className="filter-select">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            <select className="filter-select">
              <option>All Categories</option>
              <option>T-Shirts</option>
              <option>Shirts</option>
              <option>Pants</option>
              <option>Shoes</option>
              <option>Jackets</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {menProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-btn" aria-label="Add to wishlist">
                  ❤️
                </button>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;