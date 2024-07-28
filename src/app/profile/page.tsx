'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Profilepage() {
    const router = useRouter()
    const [data,setData] = useState("")

    const getUserDetails = async () => {
        try {
            const res = await axios.post("/api/users/me")
            console.log(res.data.data)
            setData(res.data.data._id)
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const logout = async () => {
         try {
            await axios.get("/api/users/logout")
            toast.success("logout success")
            router.push("/login")
         } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
         }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded">{data === "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
  )
}
