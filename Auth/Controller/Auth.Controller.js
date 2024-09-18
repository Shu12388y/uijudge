import { Auth } from "../Model/Auth.Model.js";
import { Response } from "../../util/Response.js";
import bcrypt from "bcrypt";
import {z} from "zod";

export class AuthController {
    
    
// create new users
  static async createuser(req, res) {
    try {
      const { username, email, password } = await req.body;
      const userObject = z.object({
        username:z.string().min(4).max(12),
        email:z.string().email().min(5).max(20),
        password:z.string().min(8).max(20)
        
      }); 
      const validInfo = userObject.safeParse({
        username,
        email,
        password
      })
      if (validInfo.success == false) {
        res.json(Response("server Error", 400));
        return;
      }
      const findUser = Auth.findOne({ username: username, email: email });
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
      res.json("Server error", 500);
      return;
    }
  }


//   login users

  static async loginuser(req,res) {
    try {
        const {username,password} =  await req.body;
        if(!username || !password){
            res.json(Response("All field are required",404));
            return
        }
        
    } catch (error) {
        
    }

  }
}
