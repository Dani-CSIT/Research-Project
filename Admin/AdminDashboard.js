import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminDashboardAPI } from '../../services/adminAPI';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminDashboardAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="admin-container">Loading dashboard...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats?.totalProducts || 0}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{stats?.totalOrders || 0}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats?.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${(stats?.totalRevenue || 0).toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/products" className="admin-action-card">
          <div className="action-icon">➕</div>
          <h3>Manage Products</h3>
          <p>Add, edit, or delete products</p>
        </Link>

        <Link to="/admin/orders" className="admin-action-card">
          <div className="action-icon">📋</div>
          <h3>Manage Orders</h3>
          <p>View and update order status</p>
        </Link>

        <Link to="/admin/add-product" className="admin-action-card">
          <div className="action-icon">🆕</div>
          <h3>Add New Product</h3>
          <p>Create a new product listing</p>
        </Link>
      </div>

      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-list">
            {stats.recentOrders.map(order => (
              <div key={order._id} className="order-item">
                <div className="order-info">
                  <strong>Order #{order.orderNumber}</strong>
                  <span>${order.totalAmount}</span>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-customer">
                  {order.user?.name} • {order.user?.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;