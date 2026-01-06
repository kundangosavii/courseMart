import dotenv from 'dotenv';
import { connectDB } from './DB/db.js';
import { app } from './app.js';

dotenv.config()

connectDB()
.then(()=>{
    app.listen(process.env.Port || 8000)
    console.log("DB Connected Successfully");  
})
.catch((error)=>{
    console.log("Error While Connecting DB: ", error);
})