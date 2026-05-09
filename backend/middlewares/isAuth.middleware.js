import jwt from 'jsonwebtoken'
import { redisClient } from '../config/redis.js';
import { User } from '../models/User.model.js';
import { AppError } from '../utils/AppError.js';
import { ca } from 'zod/v4/locales';

export const isAuth = async(req, res, next)=>{
    try{
        const token = req.cookies.accessToken;
        if (!token) {
            return next(new AppError("Not authorized", 401, "INVALID_TOKEN"));
        }

        const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if(!decodedData){
            return next(new AppError("Token expired", 401, "TOKEN_EXPIRED"));
        }
        
        // cacheUser : not again db call
        const cacheUser = await redisClient.get(`user:${decodedData.id}`);
        if(cacheUser){ 
            req.user = JSON.parse(cacheUser);
            return next();
        } 

        // cache user : for fast access and reduce db call
        const user = await User.findById(decodedData.id).select("-password");
        if(!user){
            return next(new AppError("User not found", 404, "USER_NOT_FOUND")); 
        }
        const cachedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(cachedUser));
        // 1 hour set in cache
        req.user = user;
        next();

    }catch(error){
        return next(new AppError("Internal Server Error", 401, "INTERNAL_SERVER_ERROR"));   
    }
}

export const isAdmin  = async(req, res, next) =>{
    const user = req.user;

    if(user.role !== "admin"){
        return next(new AppError("You are not allowed for this activity", 403, "FORBIDDEN"));
    }
    next();
}