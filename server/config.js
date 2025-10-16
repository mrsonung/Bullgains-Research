module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || 'd3nb77hr01qo7510b2hgd3nb77hr01qo7510b2i0',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  ENABLE_SEED: process.env.ENABLE_SEED || 'true'
};

