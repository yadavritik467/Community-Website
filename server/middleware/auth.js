import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const isAuthenticated = async(req, res, next) => {
 try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
 } catch (error) {
    return res.status(404).json({
        message: error.message
    })
 }
}