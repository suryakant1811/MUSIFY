import express from 'express';
import { protect, requireAdmin } from '../middleware/protect.middleware.js';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js';

const route = express.Router();

route.use(protect, requireAdmin)

route.get("/check",checkAdmin)
route.post("/songs", createSong)
route.delete("/songs/:id", deleteSong)
route.post("/albums", createAlbum)
route.delete("/albums/:id", deleteAlbum)

export default route;