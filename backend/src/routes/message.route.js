import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // this is for the users which will be shown on the side bar.
router.get("/:id", protectRoute, getMessages); // this one is to get messagse bw the sender and us on whom we click, and this :id is the user id we want to fetch our messages with.
router.post("/send/:id", protectRoute, sendMessage); // this one is to send messagse

export default router;
