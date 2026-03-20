import { Server } from "socket.io";
import { Message } from "../model/message.model.js";



export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  // keeping tracks of online users 
  const userSockets = new Map();

  //keeping what others are doing
  const userActivities = new Map();

  io.on("connection", (socket) => {
    
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);   // key : value form
      userActivities.set(userId, "Idle")    // key : value form Idle as now it is online not listing anything
      // we want to say that a user is online now like broadcast
      // for that we will use io.emit as going from server to client 
      // check the diagram once at 7 : 04

      io.emit("user_connected", userId); // "" is ke andar kuch bhi lik sakte ho yahi likhjna jarurui nahi hai

      // now we will save how many users are online( from client to server )

      // This returns an iterator for only the keys in a Map. It does not return the associated values, just the keys themselves.
      socket.emit("users_online", Array.from(userSockets.keys()));


      // sharing what are they listinig
      // This returns an iterator for both the keys and their associated values in key-value pairs.
      io.emit("activities", Array.from(userActivities.entries())); // we use entries because it send userId and Activities
    })

    socket.on("activity_update", ({userId, activity}) => {
        console.log("activit updated", userId, activity)
        userActivities.set(userId, activity);
        io.emit("activity_updated", { userId, activity });
    })

    socket.on("send_message", async(data) => {
        try {
           const {senderId, receiverId, content} = data;

           const message = await Message.create({senderId, receiverId, content});
          
           //send the message if user is online

           // get the recieverId from userSockets 
           // recievr id will be presented if user is online
           const receiverSocketId = userSockets.get(receiverId);

           if(receiverSocketId) io.to(receiverSocketId).emit("receive_message", message)

            //send the messageto the user inorder to display the message send

          socket.emit("message_sent", message)

        } catch (error) {
          console.log(error)
          socket.emit("message_error", error.message)
        }
    })

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for(const [userId, socketId] of userSockets.entries()) {
        if(socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      if(disconnectedUserId) io.emit("user_disconnected", disconnectedUserId);
      

    })

  })  

};


