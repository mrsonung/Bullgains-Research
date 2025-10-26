// Load dotenv from the parent directory
const path = require('path');
const dotenv = require('dotenv');

// Load .env from server root directory
const envPath = path.resolve(__dirname, '..', '.env');
console.log('Loading .env from:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error.message);
  process.exit(1);
}

const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    // Check if MONGODB_URI exists
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ Error: MONGODB_URI not found in .env file');
      console.log('\n📄 .env file location:', envPath);
      console.log('\n🔍 Environment variables loaded:');
      console.log('   MONGODB_URI:', mongoUri ? 'EXISTS' : '❌ NOT FOUND');
      console.log('   JWT_SECRET:', process.env.JWT_SECRET ? 'EXISTS' : 'NOT FOUND');
      console.log('   PORT:', process.env.PORT || 'NOT FOUND');
      console.log('\nPlease check your .env file is in the correct location.\n');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    console.log('📍 Database:', mongoUri.includes('cluster0.laq8ugt.mongodb.net') ? 'cluster0.laq8ugt ✓' : mongoUri.substring(0, 50) + '...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully!');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@bullgains.in' });
    
    if (existingAdmin) {
      console.log('\n⚠️  Admin user already exists!');
      console.log('\n╔════════════════════════════════╗');
      console.log('║   Existing Admin Credentials   ║');
      console.log('╠════════════════════════════════╣');
      console.log('║ Email:    admin@bullgains.in   ║');
      console.log('║ Password: Happy@#$712003            ║');
      console.log('╚════════════════════════════════╝\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new admin
    console.log('👤 Creating admin user...');
    const admin = new Admin({
      email: 'admin@bullgains.in',
      password: 'Happy@#$712003',
      name: 'Bullgains Admin',
      role: 'admin'
    });

    await admin.save();
    
    console.log('\n✅ Admin created successfully!\n');
    console.log('╔════════════════════════════════╗');
    console.log('║     Admin Login Credentials    ║');
    console.log('╠════════════════════════════════╣');
    console.log('║ Email:    admin@bullgains.in   ║');
    console.log('║ Password: Happy@#$712003            ║');
    console.log('╚════════════════════════════════╝\n');
    console.log('🌐 Access admin panel at: http://localhost:5173/admin\n');

    await mongoose.connection.close();
    console.log('🔒 Database connection closed\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('\n📋 Stack trace:', error.stack);
    }
    process.exit(1);
  }
};

createAdmin();
