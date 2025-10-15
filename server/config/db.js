const mongoose = require('mongoose');
const config = require('../config');

let isConnected = false;

async function connectDB(mongoUri) {
  if (isConnected) return mongoose.connection;

  const uri = mongoUri || config.MONGODB_URI;
  // Mask credentials in logs
  const safeUri = uri.replace(/([^:])\/\/.*@/, '$1//<credentials>@');
  console.log('🗄️ Connecting to MongoDB:', safeUri);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.error('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

    return mongoose.connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = { connectDB };


