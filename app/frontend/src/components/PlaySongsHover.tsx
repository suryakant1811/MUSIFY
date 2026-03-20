import { Pause, Play } from "lucide-react";
import { usePlayerStore } from "../stores/usePlayer";
import { Song } from "../types"

const PlaySongsHover = ({item}:{item:Song}) => {

  const {currentSong, isPlaying, togglePlay, setCurrentSong} = usePlayerStore();
  const isCurrentSong = currentSong?._id === item._id

  const handlePlaySong = () => {
    if(isCurrentSong) togglePlay()
    else setCurrentSong(item)
  }

  return (
    <>
      <button onClick={handlePlaySong} className={` p-2 rounded-lg absolute bottom-3 right-2 bg-green-600 hover:bg-green-300 hover:sca-110 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>

        {
          isCurrentSong && isPlaying ? (
            <Pause className="size-5 text-black" />
          ):( <Play  className="size-5  text-black" />)
        }

      </button>
    </>
  )
}

export default PlaySongsHover
