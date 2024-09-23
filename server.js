import dotenv from "dotenv";
dotenv.config({
    path:'.env'
})



import express from "express";
import { Response } from "./util/Response.js";
import { AuthRouter } from "./Auth/Router/Auth.Router.js";



export const app =  express();



// configure middleware
app.use(express.json());




app.get("/",async(_req,res)=>{
    res.json(Response("Check health",200))
    return
})


// auth route
app.use("/api/v1",AuthRouter);



