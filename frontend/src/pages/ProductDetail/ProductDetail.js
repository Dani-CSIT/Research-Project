import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <h1>Product Details</h1>
          <p>Product ID: {id}</p>
          <p>This page will show detailed product information fetched from the backend.</p>
          <p>Features coming soon: Product images, description, sizes, colors, add to cart.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;