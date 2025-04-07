import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useProfileStore = create((set) => ({
    isUpdatingAvatar: false,
    isUpdatingPassword: false,
    isUpdatingProfileDetails: false,

    updateAvatar: async(data) => {
        set({isUpdatingAvatar: true})
        try {
            const res = await axiosInstance.put("/profile/update-avatar", data);
            useAuthStore.getState().setAuthUser(res.data.user);
            set({isUpdatingAvatar: false});
            toast.success("Avatar Updated Successfully");
        } catch (error) {
            toast.error("Error while updating Avatar");
        } finally{
            set({isUpdatingAvatar: false});
        }
    },

    changePassword: async(data) => {
        set({isUpdatingPassword: true})
        try {
            await axiosInstance.post("/profile/change-password", data);
            set({isUpdatingPassword: false});
            toast.success("Password updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while updating password");  
        } finally{
            set({isUpdatingPassword: false});
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfileDetails: true})
        try {
            const res = await axiosInstance.put("/profile/update-account", data);
            await useAuthStore.getState().setAuthUser(res.data.user);
            set({isUpdatingProfileDetails: false});
            toast.success("User Details updated successfully");
        } catch (error) {
            toast.error("Error while updatding user details store");
        } finally{
            set({isUpdatingProfileDetails: false});
        }
    },

}))