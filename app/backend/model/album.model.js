import mongoose, { Mongoose } from "mongoose";

const albumSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    artist: {
        type: String,
    },

    imageUrl:{
      type:String,
    },

   releaseYear:{
    type:Number
   },

    songs:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Song"
    }]

},{timestamps:true})

export const Album = mongoose.model('Album',albumSchema);