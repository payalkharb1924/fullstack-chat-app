import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import env from "dotenv";

// (req,res,next) here the next is used to call the next function on the success of protectRoute function and the next function is updateProfile in auth.route.js
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.my_jwt; // to be able to grab the my_jwt cookie we need cookie-parser

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // remember while generating token we used the userId as payload to generate which means the token contains userId in encoded form inside it so we need to decode it to hold this user id in decoded const.

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // select everything from user except the password using the decoded.userId because userId is the payload which we used to generate token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // now since if we get till here means the user is verified then add the user inside req.user and call next function i.e updateProfile
    // we are manually attaching the user object to the req object. This is not built-in — we're doing it ourself after verifying the JWT token.
    req.user = user;
    // Now in the next function, you can access the logged-in user like this: const loggedInUser = req.user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
