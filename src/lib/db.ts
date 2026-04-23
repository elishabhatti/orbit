import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Conncted to DB;");
        
    } catch (error) {
        console.error("Error from connectDB", error)
    }
}