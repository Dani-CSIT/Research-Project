import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Men from './pages/Men/Men';
import Women from './pages/Women/Women';
import Kids from './pages/Kids/Kids';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import './App.css';
import AddProduct from './AdminComponents/AddProduct';
import Products from './pages/Products/Products';
import ProductManagement from './AdminComponents/ProductManagement';
import AdminLogin from './AdminComponents/AdminLogin';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

