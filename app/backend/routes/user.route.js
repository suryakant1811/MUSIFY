import express from "express";
import {protect} from "../middleware/protect.middleware.js" 
import { getAllMessages, getAllUsers } from "../controller/user.controller.js";

const route = express.Router();

route.post("/", protect, getAllUsers)
route.get("/messages/:userId", protect, getAllMessages)

export default route;
