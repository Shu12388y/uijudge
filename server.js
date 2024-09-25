import dotenv from "dotenv";
dotenv.config({
    path:'.env'
})



import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Response } from "./util/Response.js";
import { AuthRouter } from "./Auth/Router/Auth.Router.js";
import helmet from "helmet";
import  swaggerUi from  'swagger-ui-express';
// import  swaggerDocument from './swagger.json';




export const app =  express();



// configure middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(cors())
app.use('/api-docs', swaggerUi.serve);






app.get("/",async(_req,res)=>{
    res.json(Response("Check health",200))
    return
})


// auth route
app.use("/api/v1",AuthRouter);



