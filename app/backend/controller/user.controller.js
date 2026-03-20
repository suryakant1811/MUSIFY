import {User} from '../model/user.model.js'
import {Message} from "../model/message.model.js"
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId
    const users = await User.find({clerkId:{$ne:currentUserId}})
    res.status(200).json(users)

  } catch (error) {
    console.log("error in getAllUsers route", error)
    next(error)
  }
}

export const getAllMessages = async (req, res, next) => {
  try {
    const {userId} = req.params
    const myId = req.auth.userId
   
    const messages = await Message.find({
      $or:[{senderId:myId, receiverId:userId},{senderId:userId, receiverId:myId}]
    }).sort({createdAt:1})

    res.status(200).json(messages)
  } catch (error) {
    console.log("error in getAllMessages route", error)
    next(error)
  }
}