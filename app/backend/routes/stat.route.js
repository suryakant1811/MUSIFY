import express from "express";
import {protect, requireAdmin} from "../middleware/protect.middleware.js" 

import { getStats } from "../controller/stats.controller.js";

const route = express.Router();

route.post("/", protect, requireAdmin, getStats)

export default route;
