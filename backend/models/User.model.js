import mongoose from "mongoose";
import { boolean } from "zod";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    is2fa:{
        type:Boolean,
        default:false,
    }
    },  
    {timestamps:true}
);

export const User = mongoose.model("User", UserSchema);
