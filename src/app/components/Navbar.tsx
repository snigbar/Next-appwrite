"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

const Navbar = () => {

    const router = useRouter()

    const logOut =async()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successful")
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full flex justify-between items-center bg-violet-700 px-8 py-4 text-white text-lg'>
        <h1 className='font-semibold'>Logo</h1>
        <div className='flex items-center justify-between gap-6'>
            <p>Profile</p>
            <button className='text-base bg-white px-4 py-2 hover:bg-slate-100 text-black rounded-md' onClick={logOut}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar