import express from 'express';
import { getAllAlbums, getAlbumById } from '../controller/album.controller.js';
const route = express.Router();

route.get("/", getAllAlbums);
route.get("/:albumId", getAlbumById);

export default route;