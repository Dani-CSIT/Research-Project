import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: null,
    ratings: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchTerm]);

  const fetchProducts = async () => {
    try {
      // Mock data - replace with actual API call
      const mockProducts = [
        {
          _id: '1',
          name: 'Wireless Bluetooth Headphones',
          images: ['https://plus.unsplash.com/premium_photo-1680346529160-549ad950bd1f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          category: 'Electronics',
          brand: 'Sony',
          rating: 4.5,
          numReviews: 34,
          countInStock: 15
        },
        {
          _id: '2',
          name: 'Men\'s Running Shoes',
          images: ['https://images.unsplash.com/photo-1654939438953-58dca903c976?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'Lightweight running shoes with superior cushioning',
          price: 129.99,
          category: 'Men',
          brand: 'Nike',
          rating: 4.3,
          numReviews: 28,
          countInStock: 25
        },
        {
          _id: '3',
          name: 'Women\'s Summer Dress',
          images: ['https://images.unsplash.com/photo-1604506272685-a999a4d122e7?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'Elegant summer dress made from high-quality cotton',
          price: 49.99,
          category: 'Women',
          brand: 'Zara',
          rating: 4.7,
          numReviews: 42,
          countInStock: 30
        },
        {
          _id: '4',
          name: 'Kids Backpack',
          images: ['https://plus.unsplash.com/premium_photo-1722993519879-aadaa597ba3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'Durable and colorful backpack for kids',
          price: 39.99,
          category: 'Kids',
          brand: 'Adidas',
          rating: 4.2,
          numReviews: 15,
          countInStock: 20
        },
        {
          _id: '5',
          name: 'Smart Watch',
          images: ['https://images.unsplash.com/photo-1656955003707-9a86ad069bb3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'Feature-rich smartwatch with health monitoring',
          price: 399.99,
          category: 'Electronics',
          brand: 'Apple',
          rating: 4.8,
          numReviews: 67,
          countInStock: 8
        },
        {
          _id: '6',
          name: 'Men\'s Casual Shirt',
          images: ['https://images.unsplash.com/photo-1666358083648-68aff30bfbbc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
          description: 'Comfortable casual shirt made from premium cotton',
          price: 29.99,
          category: 'Men',
          brand: 'H&M',
          rating: 4.1,
          numReviews: 23,
          countInStock: 50
        }
      ];

      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      );
    }

    // Price filter
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(product =>
        filters.ratings.some(rating => product.rating >= rating)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <div style={styles.loading}>Loading products...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div style={styles.content}>
        <div style={styles.sidebar}>
          <FilterSidebar 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </div>
        
        <div style={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '2rem',
    alignItems: 'start'
  },
  sidebar: {
    position: 'sticky',
    top: '2rem'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem'
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem'
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '4rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  }
};

export default Products;