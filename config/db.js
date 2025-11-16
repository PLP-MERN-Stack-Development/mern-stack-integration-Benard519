import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not defined in .env file');
      console.error('Please create a .env file in the server directory with:');
      console.error('MONGO_URI=mongodb://localhost:27017/mern-blog');
      throw new Error('MONGO_URI is not defined');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MongoDB connection and .env file');
    // Don't exit process - let server start but API calls will fail gracefully
  }
};

export default connectDB;

