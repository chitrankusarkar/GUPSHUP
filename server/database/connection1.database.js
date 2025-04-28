import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        const instance = await mongoose.connect("mongodb+srv://sarkarriju42:Riju1234@cluster0.pmy19tr.mongodb.net/");
        console.log(`MongoDB Connected: ${instance.connection.host}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}
