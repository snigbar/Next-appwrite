"use client"

import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"


const VerifyEmail = () => {

    const [token, setToken] = useState<any>("")
    const [error, setError] = useState(false)
    const [verified, setVerified] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
        if(searchParams.get("token")) setToken(searchParams.get("token"))
     }, [])
    
    // verify user email
    const verifyUser = async() => {
        try {
            await axios.post("api/users/verifyemail", {token})
            setVerified(true)

        } catch (error:any) {
            setError(error)
          
        }
    }

    useEffect(() => {
       if(token?.length > 0) verifyUser()
    }, [token])
    


  return (
    <div className="h-screen flex justify-center items-center bg-slate-800 text-center text-white ">
        {verified? <div className="flex flex-col justify-center items-between gap-4"><p>verification successfull</p><Link href="/login" className="p-2 bg-violet-800">login</Link></div> : "verifying........"}
    </div>
  )
}

export default VerifyEmail