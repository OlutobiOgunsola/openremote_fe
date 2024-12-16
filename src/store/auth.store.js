import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    loggedIn: false,
    isAuthLoading: true,
    socket: null,
    onlineUsers: [],

    logUserIn: (userData) => {
        if (!userData.userName || !userData.email || !userData.phoneNo) {
            return null;
        }
        set({
            authUser: userData,
            loggedIn: true,
            isAuthLoading: false
        });

        get().connectSocket();
    },
    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) {
            console.log("User must be signed in to connect to socket");
            return;
        }
        const socketConnection = io(process.env.REACT_APP_SOCKET_URL, {
            query: {
                userId: authUser.id
            }
        });
        socketConnection.connect();
        set({
            socket: socketConnection
        });

        socketConnection.on("connectionEvent", (connectedUserList) => {
            set({
                onlineUsers: connectedUserList
            });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));