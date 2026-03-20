import {  SignedOut, UserButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SignInOAuthButtons from "./SignInOAuthButtons "
import { useAuthStore } from "../stores/useAuthStore"
// import { useAuthStore } from "../stores/useAuthStore"

const Navbar = () => {


  const {isAdmin} = useAuthStore()

 


  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/50 backdrop-blur-lg z-40">
      <div className="flex gap-2 items-center">
        <img src="l2.jpg" alt="" className="size-16 mr-2 bg-transparent"/>
        MUSIFY
      </div>
      <div className="flex items-center gap-4">

      {
        isAdmin && (
          <Link to={"/admin"} className="flex items-center">
            <LayoutDashboardIcon className="size-4 mr-2"/>
            Admin Dashboard
          </Link>
        )
      }

   

      <SignedOut>
        <SignInOAuthButtons />
      </SignedOut>
      <UserButton />
      </div>
    </div>
  )
}

export default Navbar

