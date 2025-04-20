import { User } from "../models/user.model.js"
import { Message } from '../models/message.model.js'
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


export const getUserForSiderbar = async( req, res) => {
    try {
        const loggedInUserId = req.user?._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password -refreshToken");

        return res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error during fetching users for sidebar", error.message);
        return res.status(500).json({error : "Internal Server Error"});
    }
};

export const getMessages = async(req, res) => {
    try {
        const { id: UserToChat} = req.params;
        const myId = req.user?._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: UserToChat},  
                {senderId: UserToChat, receiverId: myId},  
            ]
        })

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error during fetching the messages", error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
};

export const sendMessages = async(req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user?._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error during sending the message", error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
};