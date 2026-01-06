import mongoose from 'mongoose';
import { DB_Name } from '../constant.js';

const connectDB = async ()=>{
    try {
        const mongooseConnection = await mongoose.connect(`${process.env.mongodb_url}/${DB_Name}`);
        console.log(`Mongoose Connection: ${mongooseConnection.connection.host}`);
    } catch (error) {
        console.log('Error: ', error);
        process.exit(1)
    }
};

export {connectDB}