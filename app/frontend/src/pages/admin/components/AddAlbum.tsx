import { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";

const AddAlbum = () => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      return toast.error("Please select an image file");
    }

    try {
      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axiosInstance.post("/admin/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewAlbum({ title: "", artist: "", releaseYear: new Date().getFullYear() });
      setImageFile(null);
      toast.success("Album added successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add album");
    }
  };

  return (
    <>
      {/* Button to open the dialog */}
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Add Album
      </button>

      {/* Dialog Component */}
      <Transition show={open}>
        <Dialog onClose={() => setOpen(false)} className="fixed inset-0 z-10">
          <div className="flex min-h-screen items-center justify-center p-4 bg-black/50">
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold">Add New Album</Dialog.Title>
              <p className="mt-2 text-sm text-gray-500">
                Add a new album to your collection
              </p>

              {/* Upload Section */}
              <div className="space-y-4 py-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Album Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    hidden
                    onChange={handleImageSelect}
                  />
                  <div
                    className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      {imageFile ? (
                        <div className="text-emerald-500">Selected: {imageFile.name}</div>
                      ) : (
                        <>
                          <div className="p-3 bg-gray-200 rounded-full inline-block mb-2">
                            <Upload className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="text-sm text-gray-500">Upload album artwork</div>
                          <button className="btn btn-outline btn-sm mt-2">Choose File</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Album Information Inputs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Album Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-2"
                    value={newAlbum.title}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Artist</label>
                  <input
                    type="text"
                    className="input input-bordered w-full mt-2"
                    value={newAlbum.artist}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, artist: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Release Year
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full mt-2"
                    value={newAlbum.releaseYear}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })
                    }
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-error"
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddAlbum;
