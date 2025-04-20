import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const authenticateJWT = async( req, res, next ) => {
    try {
        
        const token = req?.cookies?.accessToken;
        if(!token){
            return res.status(403).json({message: "Unauthorized request: access token not found"});
        }
        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded){
            return res.status(403).json({message: "Unauthorized request: Invalid access token"});
        }
        const user = await User.findById(decoded?._id).select("-password -refreshToken");
        if(!user){
            return res.status(404).json({message : "user not found"});
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protect route middleware", error.message);
        return res.status(401).json({message: "Unauthorized request"});
    }
}