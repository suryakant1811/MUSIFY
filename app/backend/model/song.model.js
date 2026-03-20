import mongoose, { Mongoose } from "mongoose";

const songSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    artist: {
        type: String,
    },

    imageUrl:{
      type:String,
    },

    audioUrl:{
        type:String,
    },

    duration:{
        type:Number,
    },

    album:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Album"
    }


},{timestamps:true})

export const Song = mongoose.model('Song',songSchema);