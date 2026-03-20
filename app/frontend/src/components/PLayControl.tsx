import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../stores/usePlayer";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PLayControl = () => {
  const { currentSong, isPlaying, playNext, playPrevious, togglePlay } =
    usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSongBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current)
      audioRef.current.currentTime = Number(event.target.value);
  };

  const handleVolumeBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <footer className="h-20  sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* ledt side info */}

        <div className="hidden -mt-[2%] sm:flex ml-4 items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 mt-4 object-cover rounded-md"
              />
              <div className="flex-1 mt-4  min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player button */}

        <div className="flex flex-col z-10 absolute left-[30%] -top-[1%] items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">
              <Shuffle className="  h-8 w-5" />
            </button>
            <button
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className=" h-8 w-5" />
            </button>
            <button onClick={togglePlay} disabled={!currentSong}>
              {isPlaying ? (
                <Pause className="h-10 w-6" />
              ) : (
                <Play className="h-10 w-6" />
              )}
            </button>
            <button
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className=" h-8 w-5" />
            </button>
            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">
              <Repeat className=" h-8 w-5" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs  text-zinc-400">
              {" "}
              {formatTime(currentTime)}{" "}
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100} // Max set to song duration
              value={currentTime}
              step={1}
              onChange={handleSongBarChange}
              className="range  range-success h-3 w-[550px] hover:cursor-grab active:cursor-grabbing"
            />

            <div className="text-xs  text-zinc-400">
              {" "}
              {formatTime(currentTime)}{" "}
            </div>
          </div>
        </div>

              {/* volumeSlider */}

              <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					<button  className='hover:text-white text-zinc-400'>
						<Mic2 className='h-4 w-4' />
					</button>
					<button  className='hover:text-white text-zinc-400'>
						<ListMusic className='h-4 w-4' />
					</button>
					<button  className='hover:text-white text-zinc-400'>
						<Laptop2 className='h-4 w-4' />
					</button>

					<div className='flex items-center gap-2'>
						<button  className='hover:text-white text-zinc-400'>
							<Volume1 className='h-4 w-4' />
						</button>

            <input
              type="range"
              min={0}
              max={ 100} 
              value={volume}
              step={1}
              onChange={handleVolumeBarChange}
              className="range  h-2 range-success  hover:cursor-grab active:cursor-grabbing"
            />

					</div>
				</div>

      </div>
    </footer>
  );
};
export default PLayControl;

// 5 20
