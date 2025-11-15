// test-connection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  const connectionString = process.env.MONGODB_URI;
  
  console.log('🔍 Testing MongoDB Connection...');
  console.log('📡 Connection String:', connectionString.replace(/pf4wD27l2j0O4Sq8/, '***'));
  
  try {
    // Test with more options
    const conn = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
    });

    console.log('✅ SUCCESS: MongoDB Connected!');
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // List collections to verify access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('🗂️ Available Collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed.');
    
  } catch (error) {
    console.error('❌ FAILED: Connection Error');
    console.error('💡 Error Message:', error.message);
    console.error('🔧 Error Code:', error.code);
    console.error('📋 Error Name:', error.name);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('🚨 This usually means:');
      console.log('   - IP not whitelisted in MongoDB Atlas');
      console.log('   - Network firewall blocking connection');
      console.log('   - Incorrect credentials');
    }
  }
};

testConnection();