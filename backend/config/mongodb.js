import mongoose from "mongoose";

const connectDB = async () => {
  try {

    mongoose.connection.on('connected',()=>console.log("Database connected"))

    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;
