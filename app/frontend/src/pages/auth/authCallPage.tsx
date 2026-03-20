import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthCallPage = () => {

  const { isLoaded, user } = useUser()

  const navigate = useNavigate()

  useEffect(() => {

    const syncUser = async () => {
      try {
        
        if(!isLoaded || !user) return;

        console.log("Sending user data to backend:", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        });

        const response = await axiosInstance.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        });

        console.log("Response from backend:", response);

      } catch (error) {
        console.log("error in authcallpage syncuser", error)
      }finally{
        navigate('/')
      }
    }
    syncUser()
  },[isLoaded,navigate,user])

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="card bg-base-100 w-96 p-12 items-center gap-4 shadow-sm">
         
          <h2 className="card-title"><Loader className="size-8 animate-spin" /></h2>
          <h3 className="text-zinc-400 text-xl font-bold">Loggin you in</h3>
          <p className="text-zinc-400 text-sm">
           Redirecting...
          </p>
        
      </div>
    </div>
  );
};

export default AuthCallPage;
