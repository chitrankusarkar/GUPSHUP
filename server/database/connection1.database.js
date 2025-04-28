import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected: ${instance.connection.host}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}
