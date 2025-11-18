import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Make sure to include the .js extension for local modules when using ESM
import adminRoutes from './routes/adminRoutes.js'; 

// Load environment variables from .env file
dotenv.config();

// --- 1. INITIALIZE APP AND MONGOOSE CONNECTION ---
const app = express(); // <--- 'app' is initialized here

// Set the port (using || 5000 as a fallback)
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    // These options are now default but good practice to include for clarity
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
.then(() => console.log('✅ MongoDB connection successful!'))
.catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    // Exit process if connection fails to prevent headless crashes
    process.exit(1); 
});

// --- 2. GLOBAL MIDDLEWARE (Should be before routes) ---
app.use(cors());
app.use(express.json());

// --- 3. ROUTES ---

// Admin Routes (for demonstration) - CORRECT PLACEMENT
app.use('/api/admin', adminRoutes);

// Test route - API Status
app.get('/', (req, res) => {
    res.json({ 
        message: '✅ Ecomify Backend API is running!',
        timestamp: new Date().toISOString(),
        status: 'OK',
        routes: [
            '/api/admin',
            '/api/users',
            '/api/products', 
            '/api/orders',
            '/api/payments',
            '/api/auth'
        ]
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        db_status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Basic API routes (For testing purposes)
app.get('/api/users', (req, res) => { res.json({ message: 'Users endpoint - working!', data: [] }); });
app.get('/api/products', (req, res) => { res.json({ message: 'Products endpoint - working!', data: [] }); });
app.get('/api/orders', (req, res) => { res.json({ message: 'Orders endpoint - working!', data: [] }); });
app.get('/api/payments', (req, res) => { res.json({ message: 'Payments endpoint - working!', data: [] }); });
app.get('/api/auth', (req, res) => { res.json({ message: 'Auth endpoint - working!', jwt: 'JWT authentication is configured' }); });

// Handle static files/placeholders to prevent proxy errors
app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    res.json({ 
        imageUrl: `https://via.placeholder.com/${width}x${height}`,
        width: parseInt(width),
        height: parseInt(height),
        message: 'Placeholder image data'
    });
});
app.get('/favicon.ico', (req, res) => { res.status(204).end(); });
app.get('/logo.png', (req, res) => { res.status(204).end(); });


// --- 4. START SERVER LISTENING ---

app.listen(PORT, () => {
    console.log('🚀 ========================================');
    console.log('✅ Ecomify Backend Server Started Successfully!');
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🌐 Network: Server is listening on port ${PORT}`);
    console.log('🕒 ' + new Date().toLocaleString());
    console.log('🚀 ========================================');
    console.log('📊 Available Endpoints:');
    console.log(`    GET /              - API Status`);
    console.log(`    GET /health          - Health Check`);
    console.log(`    GET /api/admin       - Admin API`);
    console.log(`    GET /api/users       - Users API`);
    console.log(`    GET /api/products    - Products API`);
    console.log(`    GET /api/orders      - Orders API`);
    console.log(`    GET /api/payments    - Payments API`);
    console.log(`    GET /api/auth        - Auth API`);
    console.log(`    GET /api/placeholder/:width/:height - Placeholder images`);
    console.log('🚀 ========================================');
});