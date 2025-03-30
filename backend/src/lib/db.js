import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);   
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1)
    }
}