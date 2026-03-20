import mongoose from "mongoose";

export const dbConnect = async () => {

  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DbConnected"))
  .catch(err => console.log(err))

}