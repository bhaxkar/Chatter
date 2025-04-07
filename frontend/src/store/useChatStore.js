import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create( (set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUserLoading : true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error(error?.response?.data?.message);   
        } finally{
            set({isUserLoading : false});
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading : true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})    
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({isMessagesLoading : false})
        }
    },

    sendMessages: async(messageData) => {
        const{ selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },

    subscribeToMessage: () => {
        const { selectedUser } = get();

        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return; // If message not sent from selected user
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unSubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),

}))