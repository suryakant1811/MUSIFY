import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "../Skeletons/PlaylistSkeleton";
import { useEffect } from "react";
import { useMusicStore } from "../stores/useMusicStore";

const LeftSidebar = () => {
  
  const {albums, fetchAlbums, isLoading} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums])


  return (
    <div className="h-full flex flex-col mt-5 gap-3">
      <div className="rounded-2xl bg-emerald-950 hover:bg-zinc-800  p-4">
        <div className="space-y-2 ml-12 mt-3">
          <Link className="flex items-center " to={"/"}>
            <HomeIcon className="mr-3 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>

        <SignedIn>
          <div className="space-y-2 ml-12 mt-6">
            <Link className="flex items-center " to={"/chat"}>
              <MessageCircle className="mr-3 size-5" />
              <span className="hidden md:inline">Message</span>
            </Link>
          </div>
        </SignedIn>
      </div>

      <div className="flex-1 rounded-lg bg-emerald-950 hover:bg-zinc-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-12">
            <Library className="mr-3 size-6 font-bold" />
            <span className="hidden md:inline font-bold ">Playlists</span>
          </div>
        </div>



        <div className="card  shadow-lg no-scrollbar  max-h-120  overflow-y-scroll">
          {isLoading ? (
            <PlaylistSkeleton />
          ) : (
            albums.map((item:any) => {
              return (
                <Link to={`/album/${item._id}`} key={item._id}
                className="p-3 hover:bg-zinc-900/50 rounded-md flex items-center gap-3 group cursor-pointer"
                >
            
                <img src={item.imageUrl} alt="PLaylist img" className="size-12 rounded-md object-cover"/>
            
                <div className="flex-1 min-w-0 hidden md:block">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-zinc-400"> Album : {item.artist} </p>
                </div>
            
                </Link>
              );
            })
          )}
        </div>



      </div>
    </div>
  );
};

export default LeftSidebar;
