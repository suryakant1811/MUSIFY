
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "../../stores/useMusicStore";
import { usePlayerStore } from "../../stores/usePlayer";


const AlbumPage = () => {
	const { albumId } = useParams();
	const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const { currentSong, isPlaying, togglePlay, playAlbum} = usePlayerStore();
	

	useEffect(() => {
		if (albumId) fetchAlbumById(albumId);
	}, [fetchAlbumById, albumId]);

	if (isLoading) return null;

	 
	const formatDuration = (sec: number) => {
			const min = Math.floor(sec / 60);
			const sec2 = sec % 60;
			return `${min}:${sec2 < 10 ? "0" + sec2 : sec2}`;
	}
	 

	const hanldePlayAlbum = () => {
		if(!currentAlbum) return;
		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay()
			else{
				playAlbum(currentAlbum?.songs,0)}
	}

	const handlePlaySong = (index: number) => {
		if(!currentAlbum) return;
		playAlbum(currentAlbum?.songs, index);
	}

	return (
		<div className='h-full'>
			<div className='h-full rounded-md'>
				{/* Main Content */}
				<div className='relative min-h-full'>
					{/* bg gradient */}
					<div
						className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>

					{/* Content */}
					<div className='relative z-10'>
						<div className='flex p-6 gap-6 pb-8'>
							<img
								src={currentAlbum?.imageUrl}
								alt={currentAlbum?.title}
								className='w-[240px] h-[240px] shadow-xl rounded'
							/>
							<div className='flex flex-col justify-end'>
								<p className='text-sm font-medium'>Album</p>
								<h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
								<div className='flex items-center gap-2 text-sm text-zinc-100'>
									<span className='font-medium text-white'>{currentAlbum?.artist}</span>
									<span>• {currentAlbum?.songs.length} songs</span>
									<span>• {currentAlbum?.releaseYear}</span>
								</div>
							</div>
						</div>

						{/* play button */}
						<div className='px-6 pb-4 flex items-center gap-6'>
							<div
								onClick={hanldePlayAlbum}
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all'
							>

								{
									isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? 
									(<Pause className="text-black ml-[30%] mt-[27%]" />)
									:
									(<Play  className="text-black ml-[30%] mt-[27%]"  />)
								}

							</div>
						</div>

						{/* Table Section */}
						<div className='bg-black/20 backdrop-blur-sm'>
							{/* table header */}
							<div
								className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5'
							>
								<div className="ml-2">#</div>
								<div className="ml-8">Title</div>
								<div>Released Date</div>
								<div>
									<Clock className='h-4 w-4' />
								</div>
							</div>

							{/* songs list */}

							

							<div className='px-6'>
								<div className='space-y-2 py-4'>
									{currentAlbum?.songs.map((song, index) => {
								
									const isCurrentSong = currentSong?._id === song._id
								
										return (
											<div
												key={song._id}
												onClick={() => handlePlaySong(index)}
												className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
											
														{
															isCurrentSong && isPlaying ? (
																<div className="size-5 text-emerald-600">🎵</div>
															) : (
																<span className='group-hover:hidden'>{index + 1}</span>
															)
														}
												
												
														{ !isCurrentSong && <Play className='h-4 w-4 hidden group-hover:block' />}
													
												</div>

												<div className='flex items-center gap-3'>
													<img src={song.imageUrl} alt={song.title} className='size-10' />
														
													<div>
														<div className={`font-medium text-white`}>{song.title}</div>
														<div>{song.artist}</div>
													</div>
												</div>
												<div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
												<div className='flex items-center'>{ formatDuration(song.duration)}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AlbumPage;

// 5 4