import React from 'react';
import './Women.css';

const Women = () => {
  const womenProducts = [
    { 
      id: 1, 
      name: 'Floral Summer Dress', 
      price: '$55.99', 
      originalPrice: '$69.99',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', 
      category: 'Dresses',
      rating: 4.5,
      reviews: 128,
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 2, 
      name: 'Elegant Blouse', 
      price: '$42.99', 
      originalPrice: '$49.99',
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300&h=400&fit=crop', 
      category: 'Tops',
      rating: 4.3,
      reviews: 89,
      sizes: ['XS', 'S', 'M', 'L']
    },
    { 
      id: 3, 
      name: 'Skinny Jeans', 
      price: '$49.99', 
      originalPrice: '$59.99',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop', 
      category: 'Bottoms',
      rating: 4.7,
      reviews: 156,
      sizes: ['26', '28', '30', '32']
    },
    { 
      id: 4, 
      name: 'High Heels', 
      price: '$69.99', 
      originalPrice: '$79.99',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop', 
      category: 'Shoes',
      rating: 4.4,
      reviews: 203,
      sizes: ['6', '7', '8', '9']
    },
    { 
      id: 5, 
      name: 'Casual Top', 
      price: '$29.99', 
      originalPrice: '$39.99',
      image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=400&fit=crop', 
      category: 'Tops',
      rating: 4.2,
      reviews: 67,
      sizes: ['S', 'M', 'L']
    },
    { 
      id: 6, 
      name: 'Evening Gown', 
      price: '$99.99', 
      originalPrice: '$129.99',
      image: 'https://images.unsplash.com/photo-1566479179816-d0efa6d32a6f?w=300&h=400&fit=crop', 
      category: 'Dresses',
      rating: 4.8,
      reviews: 94,
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 7, 
      name: 'Winter Coat', 
      price: '$89.99', 
      originalPrice: '$119.99',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop', 
      category: 'Outerwear',
      rating: 4.6,
      reviews: 178,
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 8, 
      name: 'Sports Leggings', 
      price: '$34.99', 
      originalPrice: '$44.99',
      image: 'https://images.unsplash.com/photo-1506629905607-e91e2cea6f0c?w=300&h=400&fit=crop', 
      category: 'Activewear',
      rating: 4.5,
      reviews: 245,
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  const categories = [
    'All Categories',
    'Dresses',
    'Tops',
    'Bottoms',
    'Shoes',
    'Outerwear',
    'Activewear',
    'Accessories'
  ];

  return (
    <div className="women-page">
      <div className="page-header">
        <div className="container">
          <h1>Women's Collection</h1>
          <p>Explore the latest trends in women's fashion</p>
        </div>
      </div>
      
      <div className="container">
        <div className="page-content">
          {/* Sidebar Filters */}
          <div className="filters-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">Categories</h3>
              <div className="filter-options">
                {categories.map((category, index) => (
                  <label key={index} className="filter-option">
                    <input type="checkbox" defaultChecked={index === 0} />
                    <span className="checkmark"></span>
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-range">
                <input type="range" min="0" max="200" defaultValue="200" className="price-slider" />
                <div className="price-values">
                  <span>$0</span>
                  <span>$200</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Size</h3>
              <div className="size-options">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button key={size} className="size-option">{size}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Color</h3>
              <div className="color-options">
                {['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Purple'].map(color => (
                  <label key={color} className="color-option">
                    <input type="checkbox" />
                    <span className="color-checkmark" style={{backgroundColor: color.toLowerCase()}}></span>
                    {color}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Products Area */}
          <div className="products-main">
            <div className="products-header">
              <div className="results-count">
                Showing {womenProducts.length} products
              </div>
              <div className="sort-options">
                <select className="sort-select">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {womenProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <button className="wishlist-btn" aria-label="Add to wishlist">
                      ♥
                    </button>
                    {product.originalPrice && (
                      <span className="discount-badge">
                        {Math.round((1 - parseFloat(product.price.slice(1)) / parseFloat(product.originalPrice.slice(1))) * 100)}% OFF
                      </span>
                    )}
                    <div className="product-actions">
                      <button className="quick-view-btn">Quick View</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="rating-text">({product.reviews})</span>
                    </div>

                    <div className="product-pricing">
                      <span className="current-price">{product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="size-options-preview">
                      {product.sizes.map(size => (
                        <span key={size} className="size-option-preview">{size}</span>
                      ))}
                    </div>

                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="load-more-section">
              <button className="load-more-btn">Load More Products</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;