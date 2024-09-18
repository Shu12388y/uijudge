import mongoose from "mongoose";

const AuthSchema =  new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});


export const Auth = mongoose.models.Auth || mongoose.model("Auth",AuthSchema);