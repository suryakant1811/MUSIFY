import { useEffect } from "react";
import { useMusicStore } from "../../stores/useMusicStore";
import AlbumContent from "./components/AlbumContent";
import DashboardStats from "./components/DashboardStats";
import Header from "./components/Header";
import SongContent from "./components/SongContent";

const AdminPage = () => {
  // const isAdmin = true

  const { fetchAlbums, fetchSongs, fetchStats} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  },[fetchAlbums, fetchSongs, fetchStats])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-500 via-zinc-700 to-black  text-zinc-200 p-8">
      <Header />
      <DashboardStats />

   
      <div role="tablist" className="tabs tabs-border mt-5">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Songs"
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <SongContent />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Albums"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <AlbumContent />
        </div>

       
       
      </div>
    </div>
  );
};

export default AdminPage;
