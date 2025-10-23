module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5000,

  // ✅ Your deployed frontend on Vercel
  CLIENT_URL: process.env.CLIENT_URL || 'https://bullgains.vercel.app',

  // ✅ MongoDB Connection
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains?retryWrites=true&w=majority&appName=Cluster0',

  // ✅ JWT
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-jwt-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // ✅ Disable seeding in production
  ENABLE_SEED: process.env.ENABLE_SEED || 'false'
};
