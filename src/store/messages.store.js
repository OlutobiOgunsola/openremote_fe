import { create } from "zustand";
import { axiosInstance } from "../lib/network";
import { ROUTE_PATHS, SERVER_ROUTES } from "../lib/settings";
import toast from "react-hot-toast";
import { useAuthStore } from "./auth.store";

export const useMessageStore = create((set, get) => ({
    selectedUser: null,
    users: [],
    contactMessages: [],
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },
    getUsers: async (authUser, navigateFn = () => null) => {
        if (!authUser) {
            return navigateFn(ROUTE_PATHS.AUTH);
        }
        const result = await axiosInstance.get(SERVER_ROUTES.GET_ALL_USERS, {
            headers: {
                Authorization: `Bearer ${authUser?.jwt || localStorage.getItem("jwt")}`
            }
        }).catch(error => {
            toast.error("Token expired. Please log in again");
            navigateFn(ROUTE_PATHS.AUTH);
        });
        set({
            users: result?.data?.data
        });
    },
    getContactMessages: async (id, authUser) => {
        if (!id) {
            console.log("Cannot get messages for contact without id");
            return;
        }

        try {
            let request = await axiosInstance.get(`${SERVER_ROUTES.GET_CONTACT_MESSAGES}/${id}`, {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });
            set({
                contactMessages: request.data.data
            });
        } catch (e) {
            console.log("Error getting contact messages", e);
            toast.error("Failed to get messages for contact");
        }
    },
    subscribeToSocketMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        socket.on("newMessageEvent", (newMessage) => {
            set({
                contactMessages: [...get().contactMessages, newMessage]
            });
            toast.success("New Message Received");
        });
    },
    unsubscribeFromSocketMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessageEvent");
    },
    addContactMessage: (message) => {
        set({
            contactMessages: [...get().contactMessages, message]
        });
    }
}));