import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({

  senderId:{
    type:String,
  },
    
  receiverId:{
    type:String,
  },
    
  content:{
    type:String,
  },
    
},{timestamps:true})

export const Message = mongoose.model('Message',messageSchema);