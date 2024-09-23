import mongoose from "mongoose";
import { checkvalidString } from "../Validator/checkValidString.js";



export async function connectDatabase() {
    try {
        const connection = await mongoose.connect(process.env.DATABASEURL);
        if(connection){
            console.log("Database connected")
        }
    } catch (error) {
        console.log("Database Error",error)
    }
    
}