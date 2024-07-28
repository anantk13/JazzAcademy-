'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {

  const [user,setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  
  const router = useRouter()
  const [buttonDisabled , setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  

  const  onSignup = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup",user)
        console.log("Signup success",response.data)
        router.push('/')  // navigation router is used to redirect to another page
    } catch (error:any) {
        console.log("Signup Failed")
        toast.error(error.message)
    }
  }

  useEffect(()=>{
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className='text-4xl font-bold mb-10 mt-6'>{loading ? "Processing" : "Signup" }</h1>
         <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}  // by this no other value will be changed other than username on changing
            placeholder="username"
            />
             <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Existing User? Login</Link>
        </div>
  )
}

export default SignupPage