import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// this function will be called when we visit /api/auth/signup
// the functions inside these routes will be saperated and put into their controllers so that we can have claen file other there will be so many lines here in this file
router.post("/signup", signup);

// this function will be called when we visit /api/auth/login
router.post("/login", login);

// this function will be called when we visit /api/auth/logout
router.post("/logout", logout);

// update will be put because we want to just update not add and this can only update pic we don't allow user to update their email or name
// we don't want updateProfile to be called for every single user, it should be available for authenticated users only
// to check if user is authenticated we use protectRoute
// this protectRoute is the middleware used to check if the user holds the jwt token or not and on success the next will call the updateProfile function
router.put("/update-profile", protectRoute, updateProfile);

// below one is to check if user is authenticated or not
router.get("/check", protectRoute, checkAuth); // we will be calling this function whenever we will refresh our page to check user's authenticity

export default router;
