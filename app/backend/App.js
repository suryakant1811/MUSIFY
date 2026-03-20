import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { dbConnect } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { createServer } from "http";
import { initializeSocket } from "./config/socket.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stat.route.js";
import cron from "node-cron"
import path from "path";
import cors from "cors";
import fs from "fs";

import fileUpload from "express-fileupload";


const __dirname = path.resolve();
const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);


const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if(fs.existsSync(tempDir)){
    fs.readdir(tempDir, (err, files) => {
      if(err){
        console.log("error",err)
        return
      }
      for(const file of files){
        fs.unlink(path.join(tempDir, file), (err) => {
        })
      }
    })
  }
})


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);



if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist" ,"index.html"));
  })
}



app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

//socket

const httpServer = createServer(app);
initializeSocket(httpServer)


// addition


//we will change the app to httpServer

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  dbConnect();
});
