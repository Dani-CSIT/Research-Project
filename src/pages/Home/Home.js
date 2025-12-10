import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../../assets/images/hero-bg.jpg';


const Home = () => {
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Summer T-Shirt', 
      price: '$29.99', 
      image: '/api/placeholder/300/300', 
      category: 'men' 
    },
    { 
      id: 2, 
      name: 'Elegant Dress', 
      price: '$49.99', 
      image: '/api/placeholder/300/300', 
      category: 'women' 
    },
    { 
      id: 3, 
      name: 'Kids Sneakers', 
      price: '$39.99', 
      image: '/api/placeholder/300/300', 
      category: 'kids' 
    },
  ];

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Summer Collection 2024</h1>
          <p className="hero-subtitle">Discover the latest trends in fashion for everyone</p>
          <Link to="/women" className="cta-button">Shop Now</Link>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/men" className="category-card">
              <div className="category-image men-category">
                <h3>Men</h3>
              </div>
            </Link>
            <Link to="/women" className="category-card">
              <div className="category-image women-category">
                <h3>Women</h3>
              </div>
            </Link>
            <Link to="/kids" className="category-card">
              <div className="category-image kids-category">
                <h3>Kids</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                <img src={heroImage}alt="heroImage"/>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;