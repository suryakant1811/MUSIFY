import { Calendar1Icon, Trash } from "lucide-react"
import { useMusicStore } from "../../../stores/useMusicStore"

const AlbumTable = () => {

  
  const {albums, isLoading, handledeleteAlbum} = useMusicStore()

  if(isLoading){
    return(
      <div className="flex items-center justify-center py-8"> 
        <div className="text-zinc-500">Loading albums...</div>
    </div>
    )
  }

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Artist</th>
        <th>Release Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     

      {
        albums.map((item, index) => {
         
          return (

            <tr key={index}>
            <td><img src={item.imageUrl} className="h-8 w-8 object-cover" alt="" /></td>
            <td>{item.title}</td>
            <td>{item.artist}</td>
            <td className="flex items-center gap-1"><Calendar1Icon/>{item.releaseYear}</td>
            <td><button className="btn btn-outline btn-warning h-8" onClick={() => handledeleteAlbum(item._id)}><Trash/></button></td>
          </tr>

          )
        })
      }

      
     
    </tbody>
  </table>
</div>
  )
}

export default AlbumTable
