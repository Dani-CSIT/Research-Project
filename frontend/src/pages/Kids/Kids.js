import React from 'react';
import './Kids.css';

const Kids = () => {
  const kidsProducts = [
    { 
      id: 1, 
      name: 'Colorful T-Shirt', 
      price: '$19.99', 
      originalPrice: '$24.99',
      image: 'https://images.unsplash.com/photo-1622290291468-2f3766aa2c47?w=300&h=400&fit=crop', 
      category: 'Tops',
      ageGroup: '4-6 Years',
      rating: 4.6,
      reviews: 89,
      sizes: ['4Y', '5Y', '6Y']
    },
    { 
      id: 2, 
      name: 'Denim Overalls', 
      price: '$34.99', 
      originalPrice: '$39.99',
      image: 'https://images.unsplash.com/photo-1554342886-4c1fba44e0a6?w=300&h=400&fit=crop', 
      category: 'Bottoms',
      ageGroup: '2-4 Years',
      rating: 4.8,
      reviews: 124,
      sizes: ['2Y', '3Y', '4Y']
    },
    { 
      id: 3, 
      name: 'Cartoon Hoodie', 
      price: '$29.99', 
      originalPrice: '$34.99',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&h=400&fit=crop', 
      category: 'Outerwear',
      ageGroup: '6-8 Years',
      rating: 4.5,
      reviews: 67,
      sizes: ['6Y', '7Y', '8Y']
    },
    { 
      id: 4, 
      name: 'Kids Sneakers', 
      price: '$39.99', 
      originalPrice: '$49.99',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop', 
      category: 'Shoes',
      ageGroup: '8-10 Years',
      rating: 4.7,
      reviews: 156,
      sizes: ['1', '2', '3', '4']
    },
    { 
      id: 5, 
      name: 'School Uniform', 
      price: '$45.99', 
      originalPrice: '$55.99',
      image: 'https://images.unsplash.com/photo-1591135663673-9d5dfd1a4c89?w=300&h=400&fit=crop', 
      category: 'Uniforms',
      ageGroup: '10-12 Years',
      rating: 4.4,
      reviews: 78,
      sizes: ['10Y', '12Y']
    },
    { 
      id: 6, 
      name: 'Winter Jacket', 
      price: '$59.99', 
      originalPrice: '$69.99',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&h=400&fit=crop', 
      category: 'Outerwear',
      ageGroup: '4-6 Years',
      rating: 4.9,
      reviews: 203,
      sizes: ['4Y', '5Y', '6Y']
    },
    { 
      id: 7, 
      name: 'Party Dress', 
      price: '$35.99', 
      originalPrice: '$45.99',
      image: 'https://images.unsplash.com/photo-1591135663674-36d448bac83e?w=300&h=400&fit=crop', 
      category: 'Dresses',
      ageGroup: '3-5 Years',
      rating: 4.7,
      reviews: 145,
      sizes: ['3Y', '4Y', '5Y']
    },
    { 
      id: 8, 
      name: 'Sports Set', 
      price: '$42.99', 
      originalPrice: '$52.99',
      image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=300&h=400&fit=crop', 
      category: 'Activewear',
      ageGroup: '7-9 Years',
      rating: 4.5,
      reviews: 98,
      sizes: ['7Y', '8Y', '9Y']
    }
  ];

  const ageGroups = [
    'All Ages',
    '0-2 Years',
    '2-4 Years', 
    '4-6 Years',
    '6-8 Years',
    '8-10 Years',
    '10-12 Years'
  ];

  const categories = [
    'All Categories',
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Uniforms',
    'Activewear',
    'Accessories'
  ];

  return (
    <div className="kids-page">
      <div className="page-header">
        <div className="container">
          <h1>Kids Collection</h1>
          <p>Adorable and comfortable clothing for children of all ages</p>
        </div>
      </div>
      
      <div className="container">
        <div className="page-content">
          {/* Sidebar Filters */}
          <div className="filters-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">Age Group</h3>
              <div className="filter-options">
                {ageGroups.map((ageGroup, index) => (
                  <label key={index} className="filter-option">
                    <input type="checkbox" defaultChecked={index === 0} />
                    <span className="checkmark"></span>
                    {ageGroup}
                  </label>
                ))}
              </div>
            </div>

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
                <input type="range" min="0" max="100" defaultValue="100" className="price-slider" />
                <div className="price-values">
                  <span>$0</span>
                  <span>$100</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Gender</h3>
              <div className="gender-options">
                <label className="gender-option">
                  <input type="checkbox" defaultChecked />
                  <span className="gender-checkmark"></span>
                  Boys
                </label>
                <label className="gender-option">
                  <input type="checkbox" defaultChecked />
                  <span className="gender-checkmark"></span>
                  Girls
                </label>
                <label className="gender-option">
                  <input type="checkbox" defaultChecked />
                  <span className="gender-checkmark"></span>
                  Unisex
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Features</h3>
              <div className="feature-options">
                <label className="feature-option">
                  <input type="checkbox" />
                  <span className="feature-checkmark"></span>
                  Machine Washable
                </label>
                <label className="feature-option">
                  <input type="checkbox" />
                  <span className="feature-checkmark"></span>
                  Organic Cotton
                </label>
                <label className="feature-option">
                  <input type="checkbox" />
                  <span className="feature-checkmark"></span>
                  Hypoallergenic
                </label>
              </div>
            </div>
          </div>

          {/* Main Products Area */}
          <div className="products-main">
            <div className="products-header">
              <div className="results-count">
                Showing {kidsProducts.length} products
              </div>
              <div className="sort-options">
                <select className="sort-select">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rated</option>
                  <option>Age: Low to High</option>
                  <option>Age: High to Low</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {kidsProducts.map(product => (
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
                    <div className="age-badge">{product.ageGroup}</div>
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

                    <div className="age-group">
                      <span className="age-icon">👶</span>
                      {product.ageGroup}
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

export default Kids;