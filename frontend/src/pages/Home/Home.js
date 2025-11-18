import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Static data - NO API calls
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Summer T-Shirt', 
      price: '$29.99', 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', 
      category: 'men',
      description: 'Comfortable cotton t-shirt perfect for summer'
    },
    { 
      id: 2, 
      name: 'Elegant Dress', 
      price: '$49.99', 
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', 
      category: 'women',
      description: 'Beautiful floral dress for special occasions'
    },
    { 
      id: 3, 
      name: 'Kids Sneakers', 
      price: '$39.99', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', 
      category: 'kids',
      description: 'Comfortable sneakers for active kids'
    },
  ];

  const categories = [
    {
      name: 'Men',
      path: '/men',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop',
      description: 'Stylish clothing for men'
    },
    {
      name: 'Women',
      path: '/women',
      image: 'https://images.unsplash.com/photo-1485231183945-fffde7cb34eb?w=400&h=300&fit=crop',
      description: 'Fashionable outfits for women'
    },
    {
      name: 'Kids',
      path: '/kids',
      image: 'https://images.unsplash.com/photo-1554342886-4c1fba44e0a6?w=400&h=300&fit=crop',
      description: 'Cute clothes for children'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop" 
            alt="Fashion Collection" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Summer Collection 2024</h1>
          <p className="hero-subtitle">Discover the latest trends in fashion for everyone</p>
          <Link to="/women" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our wide range of fashion categories</p>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.path} key={index} className="category-card">
                <div className="category-image">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="category-img"
                  />
                  <div className="category-overlay">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                    <span className="shop-now">Shop Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Check out our best selling items</p>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-img"
                  />
                  <button className="wishlist-btn" aria-label="Add to wishlist">
                    ♥
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="special-offer">
        <div className="container">
          <div className="offer-content">
            <h2>Special Summer Sale!</h2>
            <p>Get up to 50% off on selected items</p>
            <Link to="/men" className="offer-button">Discover Deals</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;