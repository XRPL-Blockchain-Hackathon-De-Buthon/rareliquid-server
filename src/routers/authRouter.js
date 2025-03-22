// src/routers/authRouter.js
import express from "express";
import passport from "passport";
import {
  getLoginPage,
  logout,
  googleCallback,
  getProfile,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/auth.js";

const authRouter = express.Router();

// Login page
authRouter.get("/login", getLoginPage);

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

// Profile route (protected)
authRouter.get("/profile", isLoggedIn, getProfile);

export default authRouter;