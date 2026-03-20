import express from 'express';
import { getAllSongs, getFeaturedSongs, getMadeForYou, getTrending } from '../controller/song.controller.js';
import {protect, requireAdmin} from '../middleware/protect.middleware.js'

const route = express.Router();

route.post("/", protect, requireAdmin, getAllSongs)
route.post("/featured", getFeaturedSongs)
route.post("/made-for-you", getMadeForYou)
route.post("/trending", getTrending)

export default route;