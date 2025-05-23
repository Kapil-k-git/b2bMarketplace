import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI as string)
        if(result) {
            console.log('db connected successfully');
        }
    } catch (error) {
        console.log('enable to connect with db')
    }
}