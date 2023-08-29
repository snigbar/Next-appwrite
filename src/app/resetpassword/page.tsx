"use client"
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios"
import React, { useState, useEffect} from "react";
import Link from "next/link";
import toast from "react-hot-toast";



const ResetPassword = () => {


  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<null | string>("")
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
      if(searchParams.get("token")) setToken(searchParams.get("token"))
   }, [])
  

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirm: ""
  })
  
  const submit = async() => {
    if(newPassword.password !== newPassword.confirm) {
       toast.error("password didn't match", {position:"bottom-center"})
       return
    }
    
    try {
        const response = await axios.post('/api/users/setnewpassword', {token, newPassword: newPassword.password})
       if(response.data.success){
        toast.success(response.data.message + " ,  login to your account", {duration: 5000})
        router.push('/login')
       }
    } catch (error:any) {
        toast.error(error.message)
    }

  }
  
  


    

  useEffect(() => {
    if(newPassword.password.length >=6 && newPassword.confirm.length >= 6) setDisable(false)
    else setDisable(true)
   }, [newPassword])
   

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
       <div className="py-8 px-6 bg-white flex flex-col justify-between gap-4 rounded-lg">
       <h1 className="text-center text-2xl font-semibold">{loading?"loading...": "Reset Password"}</h1>
       <p className="text-xs text-center font-semibold text-slate-600">Enter your email to reset your password</p>
       <div>
         <label htmlFor="password" className="text-sm mr-2">New Password</label>
         <input type="password" placeholder="new password" id="password" className="px-2 py-3 rounded-lg border border-slate-600 w-full" onChange={(e) => setNewPassword({...newPassword, password: e.target.value})} required/>
       </div>

       <div>
         <label htmlFor="confirm" className="text-sm mr-2">Re-type Password</label>
         <input type="password" placeholder="confirm Password" id="confirm" className="px-2 py-3 rounded-lg border border-slate-600 w-full" onChange={(e) => setNewPassword({...newPassword, confirm: e.target.value})} required/>
       </div>
       <button className={`px-3 py-2 ${disable? "bg-slate-400": "bg-slate-600 hover:bg-slate-700"}  text-white`} disabled={disable} onClick={submit}>
         submit
       </button>
    
       </div>
     
    </div>
  )
}

export default ResetPassword