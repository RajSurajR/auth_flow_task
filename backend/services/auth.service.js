import { User } from "../models/User.model.js";
import { AppError } from "../utils/AppError.js";
import { generateAccessToken, revokeAccessToken } from "./token.service.js";
import bcrypt from "bcrypt";

export const registerUserService =  async({name, email, password})=>{
    if(!name || !email || !password) {
        throw new AppError("Name, email and password are required", 400);
    }   

      const existingUser = await User.findOne({email});
      if(existingUser) {
          throw new AppError("Email already in assocaite with a user", 400);
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
          name,
          email,
          password: hashPassword,
      });
      if(!newUser) {
          throw new AppError("Failed to create user", 500);
      }

      return {
          message: "User registered successfully. Now you can login",
          user: newUser
      };
   
};


export const loginService = async({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    return {
      message:"Login Successful.",
      user:{  _id: user._id, name: user.name, email: user.email, role: user.role },
    }

};
