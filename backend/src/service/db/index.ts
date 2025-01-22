import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://vermayash:${process.env.MONGO_PASSWORD}@cluster0.vj4mm.mongodb.net/`;
    await mongoose.connect(uri);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
