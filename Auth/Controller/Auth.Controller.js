import { Auth } from "../Model/Auth.Model.js";
import { Response } from "../../util/Response.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

export class AuthController {
  // create new users
  static async createuser(req, res) {
    try {
      const { username, email, password } = await req.body;
      const userObject = z.object({
        username: z.string().min(4).max(12),
        email: z.string().email().min(5).max(20),
        password: z.string().min(8).max(20),
      });
      const validInfo = userObject.safeParse({
        username,
        email,
        password,
      });
      if (validInfo.success == false) {
        res.json(Response("server Error", 400));
        return;
      }
      const findUser = await Auth.findOne({ username: username, email: email });
      if (findUser) {
        res.json(Response("user already exist", 400));
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createNewUser = await new Auth({
        username,
        email,
        password: hashedPassword,
      });

      await createNewUser.save();

      res.json(Response("User created", 201));
      return;
    } catch (error) {
      res.json(Response("Server error", 500));
      return;
    }
  }

  //   login users
  static async loginuser(req, res) {
    try {
      const { username, password } = await req.body;
      const checkuser = z.object({
        username: z.string().min(4).max(10),
        password: z.string().min(8).max(20),
      });
      const validInfo = checkuser.safeParse({
        username,
        password,
      });

      if (validInfo.success == false) {
        res.json(Response("Invalid user info", 404));
        return;
      }

      const findUser = await Auth.findOne({
        username: username,
      });

      if (!findUser) {
        res.json(Response("User not founded", 404));
        return;
      }

      const verifyPassword = await bcrypt.compare(findUser.password, paswword);

      if (!verifyPassword) {
        res.json(Response("Wrong Password", 404));
        return;
      }

      const userCookie = await jwt.sign(findUser._id, process.env.SECERT);
      await req.cookies.set("token",userCookie);
      res.json(Response("user login successful", 200, userCookie));
      return;
    } catch (error) {
      res.json(Response("Error", 500, error));
      return;
    }
  }


  // change Password
  static async changePassword(req,res){
    try {
      const {username,password}  = await req.body;
      const validInfo =  z.object({
        username:z.string().min(4).max(10),
        password:z.string().min(8).max(20)
      })

      const userInfo = validInfo.safeParse({
        username,
        password
      })
      if(userInfo.success ==  false){
        res.json(Response("Enter valid username",404))
        return
      }
      const findUser =  await Auth.findOne({
        username
      });

      if(!findUser){
        res.json(Response("User not found",404))
        return
      }
      const hashedPassword =  await bcrypt.hash(password,10);
      const updatePassword = await Auth.findOneAndUpdate({username:username},{password:hashedPassword});

      if(!updatePassword){
        res.json(Response("Internal server error",404))
        return
      }
      res.json(Response("password updated",201))
      return
    } catch (error) {
        res.json(Response("Error",500,error))
        return
    }
  }


  // logout 
  static async logoutuser(req,res){
    try {
      await req.cookies.set("token","")
      return res.json(Response("User Logout",200))
    } catch (error) {
      res.json(Response("Error",500,error))
      return
      
    }
  }
}
