
import FeatureSkelton from "../Skeletons/FeatureSkelton";
import { useMusicStore } from "../stores/useMusicStore";
import PlaySongsHover from "./PlaySongsHover";

const FeatureSect = () => {

  const {isLoading, featureSongs} = useMusicStore();

  if(isLoading) return <FeatureSkelton />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

      {
        featureSongs.map((item) => (
          <div key={item._id} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-800/20 transition-colors group cursor-pointer relative" >
           
           <img src={item.imageUrl} alt=""  className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'/>
           <div className="font-medium">
            <p className="font-medium truncate">{item.title}</p>
            <p className="text-sm to-zinc-500 truncate">{item.artist}</p>
           </div>
           <PlaySongsHover item = {item}/>
          </div>

        ))
      }
      
    </div>
  )
}

export default FeatureSect
