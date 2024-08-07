'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

function VerifyEmailPage() {

    // const router = useRouter()
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail = async ()=>{
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }
         
    // this is use effect is for when componenet is mounted
    useEffect(()=>{
        setError(false)
        const urlToken = window.location.search.split("=")[1]      // window.location is for url . We are splitting after = as in mailer we have made the url like this 
        setToken(urlToken || "")
 
         // this is an another apporoach using nextjs for getting token , which is used more 
    //     const {query} = router
    //     const urlTokenTwo = query.token
    },[])

    // this use effect will be implemented when there is any change in token

    useEffect(()=>{
        setError(false)
        if(token.length > 0){
             verifyUserEmail()
        }
    })
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

    {verified && (
        <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/login">
                Login
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            
        </div>
    )}
</div>
  )
}

export default VerifyEmailPage