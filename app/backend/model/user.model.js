import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    imageUrl:{
      type:String,
    },

    clerkId:{
        type:String,
    },


},{timestamps:true})

export const User = mongoose.model('User',UserSchema);