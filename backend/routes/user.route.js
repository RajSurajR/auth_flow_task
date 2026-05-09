import express from 'express';
import { validateLogin, validateSignup } from '../middlewares/validation.middleware.js';
import { adminController, loginUser, logoutUser, myProfile, registerUser } from '../controllers/user.controller.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.middleware.js';

const router = express.Router();

router.post("/signup", validateSignup, registerUser); // signup
// router.post("/verify/:token",  verifyUser);

router.post("/login", validateLogin, loginUser);

router.get("/me", isAuth, myProfile)
router.get("/admin", isAuth, isAdmin , adminController);
router.post("/logout", isAuth , logoutUser);

export default router;