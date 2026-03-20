import { Music } from "lucide-react";
import SongTable from "./SongTable";
import { useState } from "react";
import AddSong from "./AddSong";

const SongContent = () => {
  const [open, setOpen] = useState(false);

  const handleAddButton = () => {
    setOpen((x) => !x);
    console.log(open);
  };

  return (
    <div className="rounded-lg shadow-md text-white">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <Music className="w-5 h-5 text-white" />
              Songs Library
            </div>
            <p className="text-sm text-white">Manage your music tracks</p>
          </div>

          {open ? (
            <button
              className="px-2 py-1 text-xs cursor-pointer bg-green-500"
              onClick={handleAddButton}
            >
              + Add Song{" "}
            </button>
          ) : (
            <AddSong />
          )}
        </div>
        <SongTable />
      </div>
    </div>
  );
};

export default SongContent;
