import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/" : "/"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isValidatingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isRefreshingToken: false,
  onlineUsers: [],
  socket: null,

  setAuthUser: (user) => {
    set({ authUser: user });
  },

  validateAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/validate-auth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error while validating authentication", error);
      set({ authUser: null });
    } finally {
      set({ isValidatingAuth: false });
    }
  },

  signup: async(data) => {
    set({isSigningUp : true})
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser : res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally{
      set({isSigningUp: false})
    }
  },

  login: async(data) => {
    set({isLoggingIn : true});
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data});
      toast.success("User LoggedIn Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally{
      set({isLoggingIn : false})
    }
  },

  logout: async() => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser : null});
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  refreshAccessToken: async() => {

    if( get().isRefreshingToken) return;
    set({ isRefreshingToken : true});
    
    try {
      await axiosInstance.post("/auth/refresh-token");
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      set({ authUser: null });
      return false;
    } finally {
      set({ isRefreshingToken : false});
    }
  },

  connectSocket : () => {

    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io (BASE_URL, {
      query: {
        userId: authUser._id,
      }
    });
    socket.connect();

    set({socket: socket});

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers : userIds})
    })
    
  },

  disconnectSocket : () => {
    if(get().socket?.connected) get().socket?.disconnect();
  },

}));
