import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, deleteProduct, updateProduct } from '../../services/adminAPI';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // For now, using getAllOrders as placeholder
      // You might need to create a getProducts function in your API
      const data = await getAllOrders();
      setProducts(data.products || []);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Product Management</h1>
        <Link 
          to="/admin/products/add" 
          style={{
            padding: '0.75rem 1.5rem',
            background: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Product
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Stock</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem' }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                      <div style={{ color: '#6c757d', fontSize: '0.875rem' }}>{product.category}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>${product.price}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{product.countInStock}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  <button 
                    onClick={() => {/* Edit functionality */}}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      background: '#17a2b8', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      marginRight: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      background: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;