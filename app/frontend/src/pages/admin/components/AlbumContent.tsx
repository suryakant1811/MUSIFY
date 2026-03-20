import { AlbumIcon } from "lucide-react";
import { useState } from "react";

import AddAlbum from "./AddAlbum";
import AlbumTable from "./AlbumTable";

const AlbumContent = () => {
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
              <AlbumIcon className="w-5 h-5 text-white" />
              Album Library
            </div>
            <p className="text-sm text-white">Manage your Album tracks</p>
          </div>

          {open ? (
            <button
              className="px-2 py-1 text-xs cursor-pointer bg-green-500"
              onClick={handleAddButton}
            >
               {" "}
            </button>
          ) : (
            <AddAlbum />
          )}
        </div>
        <AlbumTable />
      </div>
    </div>
  );
};

export default AlbumContent;
