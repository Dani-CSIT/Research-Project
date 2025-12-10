import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminComponents/AdminLogin';
import AdminDashboard from './AdminComponents/AdminDashboard';
import AddProduct from './AdminComponents/AddProduct';
import ProductManagement from './AdminComponents/ProductManagement';
import EditProduct from './AdminComponents/EditProduct'; // Add this

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('adminUser'));
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route 
        path="" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="add-product" 
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        } 
      />
      <Route 
        path="products" 
        element={
          <PrivateRoute>
            <ProductManagement />
          </PrivateRoute>
        } 
      />
      <Route 
        path="products/edit/:id" 
        element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;