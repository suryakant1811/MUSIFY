import { Album } from "../model/album.model.js";
import { Song } from "../model/song.model.js";
import cloudinary from "../config/cloud.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary: ", error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile)
      return res.status(400).json({ message: "Please upload all files" });

    const { title, artist, albumId, duration } = req.body;

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);

    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl,
      imageUrl,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in crete song: ", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (song.album) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in delete song: ", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;

    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await Album.create({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in create album: ", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ album: id });

    await Album.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in delete album: ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
