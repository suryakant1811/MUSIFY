import { useEffect } from "react"
import Navbar from "../../components/Navbar"
import { useMusicStore } from "../../stores/useMusicStore"
import FeatureSect from "../../components/FeatureSect"
import MidSec from "../../components/MidSec"
import { usePlayerStore } from "../../stores/usePlayer"


const HomePage = () => {

  const {fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, featureSongs,trendingSongs} = useMusicStore()

  const { initializeQueue } = usePlayerStore();


  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]) 

  useEffect(() => {
    if(madeForYouSongs.length>0 && trendingSongs.length > 0 && featureSongs.length > 0) {
      const totalSongs = [...madeForYouSongs, ...trendingSongs, ...featureSongs];
      initializeQueue(totalSongs);
    }
  },[initializeQueue, madeForYouSongs, featureSongs, trendingSongs])  
  

  return (
    
    <div className="rounded-md overflow-hidden">
      <Navbar />

      <div className="card  shadow-lg no-scrollbar  max-h-149  overflow-y-scroll">
         <div className="p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-6 sm:text-3xl">Good afternoon</h1>
      <FeatureSect />
         </div>

        <div className="space-y-8">
          <MidSec title="Made for you" songs={madeForYouSongs} isLoading={isLoading} />
          <MidSec title="Trending" songs={trendingSongs} isLoading={isLoading} />
        </div>

        </div>

    </div>

  )
}

export default HomePage


// 5 38