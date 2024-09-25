import mongoose from "mongoose";




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