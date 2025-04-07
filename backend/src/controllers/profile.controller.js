import { User } from "../models/user.model.js"
import cloudinary from "../utils/cloudinary.js"

export const updateAvatarImage = async(req, res) => {
    try {
        const { avatar } = req.body;
        if( !avatar ){
            return res.status(400).json({message : "Avatar Image is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(avatar);

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                avatar: uploadResponse.secure_url,
            },
            {
                new: true
            }
        ).select("-password -refreshToken");
        console.log(user , "updated avatar")
        return res
        .status(200)
        .json({ user, message : "Avatar updated successfully"});
    } catch (error) {
        console.error("Error while updating Avatar:", error.message);
        return res
        .status(500)
        .json({ error : "Failed to update avatar"});
    }
};

export const updateAccountDetails = async(req, res) => {
    try {
        const { name, email} = req.body;
        if( !name || !email){
            return res.status(400).json({message: "Fill out the required field"});
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                name,
                email,
            },
            { new : true }
        ).select("-password -refreshToken")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res
        .status(200)
        .json({ user, message : "Account Details updated successfully"});
    } catch (error) {
        console.error("Error while updating account details:", error.message);
        return res
        .status(500)
        .json({ error : "Failed to update account details"});
    }
};

export const changeCurrentPassword = async(req, res) => {
    try {
        const {currentPassword, newPassword, confirmNewPassword} = req.body;
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({message: "New password and confirmed new password do not match"})
        }
        if(newPassword.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 charactetr"});
        }

        const user = await User.findById(req.user?._id);
        const isPasswordValid = await user.isPasswordCorrect(currentPassword);
        if(!isPasswordValid){
            return res.status(401).json({message: "Please enter a correct password"})
        }

        user.password = newPassword;
        await user.save({validateBeforeSave : false});

        return res
        .status(200)
        .json({message : "Password changed Successfully"});
    } catch (error) {
        console.log("Error while changing the password", error.message);
        return res.status(500).json({error : "Failed to change password"});
    }
};