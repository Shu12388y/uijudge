import dotenv from "dotenv";
dotenv.config({
    path:'.env'
})



import express from "express";
import { Response } from "./util/Response.js";



export const app =  express();



app.get("/",async(_req,res)=>{
    res.json(Response("Check health",200))
    return
})
