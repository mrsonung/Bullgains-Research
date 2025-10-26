const mongoose = require('mongoose');

let cachedConnection = null;

async function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error('❌ MongoDB URI not found in environment variables');

  // Use cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('🗄️ Connecting to MongoDB...');
    const conn = await mongoose.connect(uri); // modern driver options are default
    cachedConnection = conn;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
      cachedConnection = null;
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

    return conn;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    cachedConnection = null;
    throw err;
  }
}

module.exports = { connectDB };
