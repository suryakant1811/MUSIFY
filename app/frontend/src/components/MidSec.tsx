
import { Song } from "../types";
import FeatureSect from "./FeatureSect";
import PlaySongsHover from "./PlaySongsHover";


type MidSecProp = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const MidSec = ({ songs, title, isLoading }: MidSecProp) => {
	if (isLoading) return <FeatureSect />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				<button  className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{songs.map((item) => (
					<div
						key={item._id}
						className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={item.imageUrl}
									alt={item.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlaySongsHover item = {item}  />
						</div>
						<h3 className='font-medium mb-2 truncate'>{item.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{item.artist}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default MidSec;


