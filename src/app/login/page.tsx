"use client"
import { useRouter } from "next/navigation";
import axios from "axios"
import React, { useState, useEffect} from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type user = {
  email: string,
  password: string
}

const LoginPage = () => {


  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const router = useRouter()

  const [user, setUser] = useState<user>(
    {
      email: "",
      password: ""
    }
  )

  const [email, setEmail] = useState("")

  const reset = async(e:any) =>{
    try {
      e.preventDefault();
      if(resetPassword){
        const response = await axios.post("/api/users/resetpassword", {email})
        console.log(response.data.user)
        if(response.data.user?.email === email) {
          toast.success("An email has been sent to your email address. check your email to reset password", {duration: 8000, position:"top-center"})
          setResetPassword(!resetPassword)
        }else{
          toast.error("No user found with the provided email",{duration: 8000, position:"top-center"})
        }
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }
 
  const login = async()=> {

    try {
      setLoading(true)

      const response = await axios.post('/api/users/login', user)
      console.log("login success", response.data)
      toast.success("Login Successful")
      router.push('/profile')

    } catch (error:any) {
      
      console.log("request failed", error)
      toast(error.message)

    }finally{
      setLoading(false)
    }

  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length >= 6) setDisable(false)
    else setDisable(true)
   }, [user])
   

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
       {resetPassword? 
       <form className="py-8 px-6 bg-white flex flex-col justify-between gap-4 rounded-lg" onSubmit={reset}>
       <h1 className="text-center text-2xl font-semibold">{loading?"loading...": "Reset Password"}</h1>
       <p className="text-xs text-center font-semibold text-slate-600">Enter your email to reset your password</p>
       <div>
         <label htmlFor="resetmail" className="text-sm mr-2">Email</label>
         <input type="email" placeholder="email" id="resetmail" className="px-2 py-3 rounded-lg border border-slate-600 w-full" onChange={(e) =>setEmail(e.target.value)} required/>
       </div>
       <button type="submit" className={`px-3 py-2 ${email.length <= 0? "bg-slate-400": "bg-slate-600 hover:bg-slate-700"}  text-white`} disabled={!(email.length > 0)}>
         submit
       </button>
       <div className="flex flex-col gap-2 cursor-pointer">
       <Link href="/signup" className="underline" >
       SignUp  
       </Link>

       <p className="underline" onClick={() => setResetPassword(!resetPassword)}>Back Login</p>
       </div> 
       </form>
       :
       <div className="py-8 px-6 bg-white flex flex-col justify-between gap-4 rounded-lg">
        <h1 className="text-center text-2xl font-semibold my-6">{loading?"loading...": "Login"}</h1>
        <div>
          <label htmlFor="email" className="text-sm mr-2">Email</label>
          <input type="email" placeholder="email" id="email" className="px-2 py-3 rounded-lg border border-slate-600 w-full" onChange={(e) =>setUser({...user, email: e.target.value})} required/>
        </div>
        <div>
          <label htmlFor="password" className="text-sm mr-2">Password</label>
          <input type="password" placeholder="password" id="password" className="px-2 py-3 rounded-lg border border-slate-600 w-full" onChange={(e) =>setUser({...user, password: e.target.value})} required/>
        </div>

        <button className={`px-3 py-2 ${disable? "bg-slate-400": "bg-slate-600 hover:bg-slate-700"}  text-white`} disabled={disable} onClick={login}>
          Login
        </button>
        <div className="flex flex-col gap-2 cursor-pointer">
        <Link href="/signup" className="underline" >
        SignUp here 
        </Link>

        <p className="underline" onClick={() => setResetPassword(!resetPassword)}>Forgot Password</p>
        </div>
        </div>}
    </div>
  )
}

export default LoginPage