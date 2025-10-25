const mongoose = require('mongoose');

let cachedConnection = null;

async function connectDB() {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('❌ MONGODB_URI not found in environment variables');
    }

    // Mask credentials in logs
    const safeUri = uri.replace(/([^:])\/\/.*@/, '$1//<credentials>@');
    console.log('🗄️ Connecting to MongoDB:', safeUri);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      bufferCommands: false,
    });

    cachedConnection = conn;
    console.log('✅ MongoDB connected:', conn.connection.host);

    // Connection event handlers
    mongoose.connection.on('disconnected', () => {
      console.error('⚠️ MongoDB disconnected');
      cachedConnection = null;
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

    return conn;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    cachedConnection = null;
    throw err;
  }
}

module.exports = { connectDB };
