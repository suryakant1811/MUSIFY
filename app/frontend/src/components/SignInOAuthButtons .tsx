import { useSignIn } from "@clerk/clerk-react"

const SignInOAuthButtons  = () => {

  const {signIn, isLoaded} = useSignIn()

  if(!isLoaded){
    return null
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl:"/sso-callback",
      redirectUrlComplete:"/auth-callback"
    })
  }

  return (
    <button onClick={signInWithGoogle} className="btn btn-outline btn-secondary">Continue with Google</button>
  )
}

export default SignInOAuthButtons 
