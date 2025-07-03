// in order to generate token we need to take the payload
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("my_jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // prevent XXS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
