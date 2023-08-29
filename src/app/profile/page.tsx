"use client"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import Link from "next/link"


const page = () => {

    const [user, setUser] = useState(null)

    const getUserDetails = async() => {
        const response = await axios.get("/api/users/me")
        setUser(response.data.data._id)
 
      }

      getUserDetails()

  return (
    <div className="w-full h-screen bg-slate-900">
        <Navbar></Navbar>
        <div className="flex gap">
        <Link href={`/profile/${user}`} className="text-white">go to {user}</Link>
        </div>
    </div>
  )
}

export default page