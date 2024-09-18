import { Router } from "express";
import { AuthController } from "../Controller/Auth.Controller.js";


export const AuthRouter =  Router();



// sign up user route
AuthRouter.post("/createuser",AuthController.createuser);


// user login route
AuthRouter.post("/loginuser",AuthController.loginuser);