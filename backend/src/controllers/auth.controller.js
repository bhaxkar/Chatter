import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const options = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken =  user.generateAccessToken();
        const refreshToken =  user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens", error);
    } 
};

export const signup = async( req, res ) => {

    const {name, email, password} = req.body;
    try {
        if( [name, email, password].some((field) => field.trim() === "") ){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 charactetr"});
        }
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({message: "Email already registered"});
        }
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save()

        if(newUser){

            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar,
                createdAt: newUser.createdAt,
            })
        } else {
            return res.status(201).json({message: "Something went worng during registration"});
        }
    } catch (error) {
        console.log("Error during Signup", error.message);
        return res.status(500).json({message: "Something went worng during registration"});
    }
};

export const login = async( req, res ) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({messgae: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        })
    } catch (error) {
        console.log("Error during Login", error.message);
        return res.status(500).json({message: "Something went worng during login"});
    }
};

export const logout = async( req, res ) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            { new : true }
        )
    
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logout successfully" })
    } catch (error) {
        console.log("Error during logout", error.message);
        return res.status(500).json({ message: "Something went wrong during logout" });
    }
};

export const refreshAccessToken = async(req, res) => {
    const refreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message: "Unauthorized request: refresh token not found"})
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded?._id);
        if(!user) {
            return res.status(401).json({message: "Invalid refresh token"});
        }
        if( refreshToken != user?.refreshToken){
            return res.status(401).json({message: "Refresh Token has been used or expired"})
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({
            message: "Access token refreshed successfully"
        })

    } catch (error) {
        console.log("Error while refreshing access token", error.message);
        return res.status(500).json({ message: "Something went wrong while refreshing access token" });
    }
};

export const validateAuth = async( req, res ) => {
    try {
       
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("User not found", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
