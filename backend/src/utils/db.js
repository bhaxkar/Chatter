import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected, Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error in Database connection", error)
        process.exit(1);
    }
}