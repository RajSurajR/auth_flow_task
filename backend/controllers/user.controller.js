import { asyncHandler } from "../utils/asyncHandler.js";

import { getErrorResponse, getSuccessResponse } from "../utils/getResponse.js";
import { loginService, registerUserService } from "../services/auth.service.js";
import { generateTokenService, revokeAccessToken } from "../services/token.service.js";

export const registerUser = asyncHandler(async (req, res) => {
    const result = await registerUserService(req.body);
    res.status(201).json(getSuccessResponse({message:result.message}));
});

export const loginUser = asyncHandler(async(req, res)=>{
    const result = await loginService(req.body);
    await generateTokenService(result.user, res);   
    res.json(getSuccessResponse({
        message:result.message,
        data: { user: result.user }
    }));
})

export const myProfile = asyncHandler(async(req, res) =>{
    const user = req.user;
    res.status(200).json(getSuccessResponse({
        data:{user},
        message:"User profile fetched successfully",
    }))
});

export const logoutUser = asyncHandler( async(req, res) =>{
    const userId = req.user._id;
    await revokeAccessToken(userId); // refreshToken remove from redis

    res.clearCookie("accessToken")
    res.json(getSuccessResponse({
        message:"Logged out successfully",
    }));
})

export const adminController = asyncHandler(async(req, res)=>{
    res.json({
        message:"Hello admin",
    });
})
