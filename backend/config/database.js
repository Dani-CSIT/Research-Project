import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log('⚠️  MongoDB not connected - running without database');
    console.log('💡 To enable database: make sure MongoDB is running on localhost:27017');
    return false;
  }
};

export default connectDB;