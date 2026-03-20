import {Song} from "../model/song.model.js"

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({createdAt:-1})
    res.json(songs)
  } catch (error) {
    console.log("error in getAllSongs route", error)
    next(error)
  }
}


export const getFeaturedSongs = async (req, res, next) => {

  try {
    
    const songs = await Song.aggregate([

      {
        $sample:{size:6}
      },
      {
        $project:{_id:1, artist:1, imageUrl:1,title:1,duration:1,audioUrl:1}
      }

    ])

    res.json(songs)

  } catch (error) {
    console.log("error in getFeaturedSongs route", error)
    next(error)
  }

}
export const getMadeForYou = async (req, res, next) => {

  try {
    
    const songs = await Song.aggregate([

      {
        $sample:{size:4}
      },
      {
        $project:{_id:1, artist:1, imageUrl:1,title:1,duration:1,audioUrl:1}
      }

    ])

    res.json(songs)

  } catch (error) {
    console.log("error in getMadeForYou route", error)
    next(error)
  }

}
export const getTrending = async (req, res, next) => {

  try {
    
    const songs = await Song.aggregate([

      {
        $sample:{size:4}
      },
      {
        $project:{_id:1, artist:1, imageUrl:1,title:1,duration:1,audioUrl:1}
      }

    ])

    res.json(songs)

  } catch (error) {
    console.log("error in getTrending route", error)
    next(error)
  }
}