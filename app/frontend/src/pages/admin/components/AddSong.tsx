import { useRef, useState } from "react";

type NewSong = {
  title: string;
  artist: string;
  album: string;
  duration: number;
};
import { Dialog, Transition } from "@headlessui/react";
import { Plus, Upload } from "lucide-react";
import { useMusicStore } from "../../../stores/useMusicStore";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";

const AddSong = () => {
  const { albums } = useMusicStore();

  // Song Dialog is open or not
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration:0,
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!newSong.title || !files.audio || !files.image) {
        return toast.error("Please fill in all fields");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration.toString());

      if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: 0,
      });

      setFiles({
        audio: null,
        image: null,
      });

      toast.success("Song added successfully");
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }

    setOpen(false);
  };

  return (
    <>
      {/* Button to open the dialog */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-md flex items-center bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Song
      </button>

      {/* Dialog Component */}
      <Transition
        show={open}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          onClose={() => setOpen(false)}
          className="fixed bg-black/80 text-black  inset-0 z-10 overflow-y-auto"
        >
          <div className="flex  min-h-screen items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
              <div className="flex flex-col items-center gap-4">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Add New Song
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500">
                  Add a new Song to your music library
                </p>
              </div>

              {/* Upload Section */}
              <div className="space-y-4 py-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image File
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    hidden
                    onChange={(e) =>
                      setFiles((prev) => ({
                        ...prev,
                        image: e.target.files![0] || null,
                      }))
                    }
                  />

                  <div
                    className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <div className="text-center">
                      {files.image ? (
                        <div className="space-y-2">
                          <div className="text-sm text-emerald-500">
                            Image selected:
                          </div>
                          <div className="text-xs text-zinc-400">
                            {files.image.name.slice(0, 20)}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                            <Upload className="h-6 w-6 text-zinc-400" />
                          </div>
                          <div className="text-sm text-zinc-400 mb-2">
                            Upload artwork
                          </div>
                          <button className="text-xs">Choose File</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Audio File
                  </label>
                  <button
                    type="button"
                    className="w-full mt-2 border px-3 py-2 text-sm bg-gray-100"
                    onClick={() => audioInputRef.current?.click()}
                  >
                    {files.audio ? files.audio.name : "Choose Audio File"}
                  </button>
                  <input
                    type="file"
                    accept="audio/*"
                    ref={audioInputRef}
                    hidden
                    onChange={(e) =>
                      setFiles((prev) => ({
                        ...prev,
                        audio: e.target.files![0] || null,
                      }))
                    }
                  />
                </div>

                {/* Song Information Inputs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 border px-3 py-2 text-sm"
                    value={newSong.title}
                    onChange={(e) =>
                      setNewSong({ ...newSong, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Artist
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 border px-3 py-2 text-sm"
                    value={newSong.artist}
                    onChange={(e) =>
                      setNewSong((prev: any) => ({
                        ...prev,
                        artist: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full mt-2 border px-3 py-2 text-sm"
                    value={newSong.duration}
                    onChange={(e) =>
                      setNewSong((prev:any) => ({
                        ...prev,
                        duration: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Album (Optional)
                  </label>
                  <select
                    value={newSong.album}
                    onChange={(e) =>
                      setNewSong({ ...newSong, album: e.target.value })
                    }
                    className="w-full mt-2 border px-3 py-2 text-sm"
                  >
                    <option value="none">No Album (Single)</option>
                    {albums.map((album) => (
                      <option key={album._id} value={album._id}>
                        {album.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500"
                >
                  Close
                </button>
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                  onClick={handleSubmit}
                >
                  {loading ? "Adding..." : "Save"}  
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddSong;

// 6 39
