import mongoose from "mongoose";
import {config} from './app.config';

const connectDatabase = async () => {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("DB connected");
    } catch (error){
        console.log("error connecting to DB")
        process.exit(1)
    }
}

export default connectDatabase;