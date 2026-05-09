import jwt from 'jsonwebtoken'
import { redisClient } from '../config/redis.js';
import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';


// JWT token generation and management
export const generateAccessToken = (id, time="1d") => {
  return jwt.sign(
    { id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: time},
  );
};


// Cookie management for tokens
export const cookieOptions = {
  httpOnly: true, // frontend will not read there value read only backend
  // secure: process.env.NODE_ENV === "production",
  // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  secure: true, // https worke only
  sameSite: "none", // csrf not attack (frontend and backend same place : "strict" use)
};

export const setAccessCookies = (res, accessToken, duration=24*60*60*1000) =>{
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: duration, // 1 day
    });
}


export const generateTokenService = async (user, res) => {
  try { 
    const id = user._id;
    const accessToken = generateAccessToken(id); 
    setAccessCookies(res, accessToken);
    return {accessToken};
  } catch (error) {
    // console.error("Token generation failed:", error);
    throw new AppError("Token generation failed");
  }
};

export const revokeAccessToken = async(id) =>{
  try { 
    await redisClient.del(`user:${id}`); // userCache for auth will remove
  } catch (error) {
    // console.error("Token revocation failed:", error);
    throw new AppError("Token revocation failed");
  }
};

