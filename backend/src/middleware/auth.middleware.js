import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "Unauthorized request - No token is provided"});
        }
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedtoken){
            res.status(401).json({message: "Unauthorized request - Invalid token"});
        }
        const user = await User.findById(decodedtoken.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protect route middleware", error.message)
    }
}