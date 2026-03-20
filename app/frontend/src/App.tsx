import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallPage from "./pages/auth/authCallPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/home/ChatPage"
import AlbumPage from "./pages/home/AlbumPage"
import AdminPage from "./pages/admin/AdminPage"
import { Toaster } from "react-hot-toast"
import Error from "./pages/Error"
const App = () => {

  return (
    <>
   
      <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<HomePage/>} />
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/album/:albumId" element={<AlbumPage/>} />
      <Route path="*" element={<Error/>} />

      </Route>

      <Route path="/" element={<HomePage/>} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path="/auth-callback" element={<AuthCallPage/>} />
      <Route path="/admin" element={<AdminPage/>} />

      </Routes>
      <Toaster/>
    </>
  )
}

export default App

