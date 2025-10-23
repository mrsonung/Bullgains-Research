module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5000,

  // ✅ Your deployed frontend on Vercel
  CLIENT_URL: process.env.CLIENT_URL || 'https://bullgains.in',

  // ✅ MongoDB Connection
  MONGODB_URI: process.env.MONGODB_URI || 'your_mongodb_',

  // ✅ JWT
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-jwt-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // ✅ Disable seeding in production
  ENABLE_SEED: process.env.ENABLE_SEED || 'false'
};
