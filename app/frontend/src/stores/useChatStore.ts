import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { Message, User } from "../types";
import {io} from "socket.io-client"

interface ChatStore{
  users: User[],
  isLoading: boolean,
  fetchUsers: () => Promise<void>,
  // chats 
  socket: any;
  isConnected: boolean
  onlineUsers: Set<string>
  userActivities: Map<string, string>
  messages: Message[]

  initSocket: (userId: string) => void
  disconnectSocket: () => void
  sendMessage: (receiverId: string, senderId: string, message: string) => void
  fetchMessages: (userId: string) => Promise<void>;


  //ui chats
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void

}

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:7000" : "/"
const socket = io(baseURL,{
  autoConnect: false,
  withCredentials: true
})


export const useChatStore = create<ChatStore>((set,get) => ({

  users: [],
  isLoading: false,
 //chat
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  fetchUsers: async () => {
    set({isLoading: true})
    try {
      const res = await axiosInstance.post("/users")
      set({users: res.data})
    } catch (error) {
      console.log("error in useChattore fetchUser",error)
    }finally{
      set({isLoading: false})
    }
  },


  initSocket: (userId: string) => {
    if (!get().isConnected) {
      socket.auth = {userId}
      socket.connect();
      socket.emit("user_connected", userId);
  
      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });
  
      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });
  
      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });
  
      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });
  
      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
  
      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });
  
      socket.on("activity_updated", ({ userId, activity }: { userId: string; activity: string }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });
  
      set({ isConnected: true });
    }
  },


disconnectSocket: () => {
  
  if(get().isConnected){
    socket.disconnect()
  set({isConnected: false})
  }

},

sendMessage: async (receiverId, senderId, content) => {
  const socket = get().socket
  if(!socket) return
  socket.emit("send_message", { receiverId, senderId, content });
},

 fetchMessages: async (userId: string) => {
  set({isLoading: true})
  try {
    const res  =  await axiosInstance.get(`/users/messages/${userId}`)
   
    set({messages: res.data})
  } catch (error) {
    console.log(error)
  }finally{
    set({isLoading: false})
  }

 },

 setSelectedUser: async (user: User | null) => {
  set({selectedUser: user})
 },

}))

// 7 43
