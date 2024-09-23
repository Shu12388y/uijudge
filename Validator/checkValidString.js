import {z} from "zod";
import { Errors } from "../util/Error.js";

export function checkvalidString(str){
    const checkValidString  = z.string().min(1);
    const returnString =  checkValidString.safeParse(str);
    if(returnString.success == false){
        return Errors("string error","Not able to get the connection string",404)
    }
    return returnString;

}