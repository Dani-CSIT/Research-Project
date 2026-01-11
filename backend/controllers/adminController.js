import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const body = req.body || {};

    // Handle image upload
    let images = [];
    if (req.file) {
      // If file was uploaded, use the file path
      const imageUrl = `/uploads/products/${req.file.filename}`;
      images = [{ url: imageUrl, alt: body.name }];
    } else if (body.image) {
      // Fallback to URL if provided (for backwards compatibility)
      images = [{ url: body.image, alt: body.name }];
    } else if (Array.isArray(body.images)) {
      images = body.images;
    }

    const payload = {
      user: req.user?._id,
      name: body.name,
      description: body.description,
      price: body.price,
      ...(body.originalPrice ? { originalPrice: body.originalPrice } : {}),
      category: body.category,
      subcategory: body.subcategory,
      brand: body.brand,
      inventory: body.inventory ?? body.countInStock,
      sku: body.sku,
      images: images,
    };

    const product = new Product(payload);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    // Clean up uploaded file if product creation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Invalid product data' });
    }
    if (error?.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate key error' });
    }
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    
    if (!existingProduct) {
      // Clean up uploaded file if product doesn't exist
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Prepare update data
    const updateData = { ...req.body };

    // Handle image upload
    if (req.file) {
      const imageUrl = `/uploads/products/${req.file.filename}`;
      updateData.images = [{ url: imageUrl, alt: updateData.name || existingProduct.name }];
      
      // Delete old image file if it exists and is a local file
      if (existingProduct.images && existingProduct.images.length > 0) {
        const oldImageUrl = existingProduct.images[0].url;
        if (oldImageUrl && oldImageUrl.startsWith('/uploads/')) {
          const oldImagePath = path.join(process.cwd(), oldImageUrl);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Error deleting old image:', err);
          });
        }
      }
    } else if (updateData.image) {
      // If no file but image URL provided
      updateData.images = [{ url: updateData.image, alt: updateData.name || existingProduct.name }];
      delete updateData.image;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    // Clean up uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated image files
    if (product.images && product.images.length > 0) {
      product.images.forEach(image => {
        if (image.url && image.url.startsWith('/uploads/')) {
          const imagePath = path.join(process.cwd(), image.url);
          fs.unlink(imagePath, (err) => {
            if (err) console.error('Error deleting image file:', err);
          });
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(trackingNumber && { trackingNumber })
      },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $match: { 'payment.status': 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
};

// List all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

// -----------------------
// User management (Admin)
// -----------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = new User({ name, email: email.toLowerCase(), password, role: role || 'user', isActive: true });
    await user.save();

    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive };
    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const { name, email, password, role, isActive } = req.body || {};
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (typeof role !== 'undefined') user.role = role;
    if (typeof isActive !== 'undefined') user.isActive = isActive;
    if (password) user.password = password; // will be hashed by pre-save

    await user.save();

    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive };
    res.json({ success: true, data: safeUser });
  } catch (error) {
    console.error('Update user error:', error);
    if (error?.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Invalid user data' });
    }
    // Return the error message for easier debugging (can be removed/obfuscated later)
    res.status(500).json({ success: false, message: error.message || 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};
