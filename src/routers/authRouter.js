// src/routers/authRouter.js
import express from "express";
import passport from "passport";
import {
  logout,
  googleCallback,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/auth.js";

const authRouter = express.Router();



// Google OAuth routes
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  googleCallback
);

// Logout route
authRouter.get("/logout", logout);



export default authRouter;