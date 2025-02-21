import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectdb = async()=>{
    try {
        const connectinstance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`connected ${connectinstance.connection.host}`);
        
    } catch (error) {
        console.log("mongo connection error",error)
        process.exit(1)
    }
}

export default connectdb
