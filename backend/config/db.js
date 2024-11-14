import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Succesfully connected the mongoDB 👌");
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
