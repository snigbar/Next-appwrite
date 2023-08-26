"use client"
import { useRouter } from "next/navigation";
import axios from "axios"
import { useState, useEffect} from "react";
import Link from "next/link";
import { toast } from "react-hot-toast/headless";

type user = {
  email: String,
  password: String
}

const LoginPage = () => {


  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [user, setUser] = useState<user>(
    {
      email: "",
      password: ""
    }
  )

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
        <div className="py-8 px-6 bg-white flex flex-col justify-between gap-4 rounded-lg">
        <h1 className="text-center text-2xl font-semibold my-6"><h1 className="text-center text-2xl font-semibold my-6">{loading?"loading...": "Login"}</h1></h1>
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
        <Link href="/signup" className="underline" >
        SignUp here 
        </Link>
        </div>
    </div>
  )
}

export default LoginPage