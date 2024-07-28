'use client';
import React, { useState , useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/app/components/ui/navbar-menu";
import { cn } from "@/app/utility/cn";
import Link from "next/link";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies'
// import { useUser } from "@auth0/nextjs-auth0/client"

function Navbar({ className }: { className?: string }) {

  // const { user } = useUser();

    const [active, setActive] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // // const router = useRouter();

  
    useEffect(() => {
      const cookies = parseCookies();
  console.log('Cookies:', cookies);  // Log cookies for debugging
  const tokenExists = !!cookies.token;
  console.log('Token Exists:', tokenExists);  // Log token existence
  setIsAuthenticated(tokenExists);
    }, []);
  
 
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        setIsAuthenticated(false)
        // router.push('/login')
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
    }
}

  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
        <Menu setActive={setActive}>
            <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            </MenuItem>
            </Link>
            <Link href={"/courses"}>
            <MenuItem
            setActive={setActive} active={active} item="Our Courses"
            >
                {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">All courses</HoveredLink>
            <HoveredLink href="/courses">Basic Music Theory</HoveredLink>
            <HoveredLink href="/courses">Advanced Composition</HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">Music Production</HoveredLink>
            </div> */}
            </MenuItem>
            </Link>
            <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            </MenuItem>
            </Link>
            {!isAuthenticated ? (
               <Link href="/login">
                <p className="ml-20 text-blue-400">
               <MenuItem setActive={setActive} active={active} item="Login">
               </MenuItem>
               </p>
               </Link>      
        ) : (   
          <li>
            <button onClick={logout}>
            <MenuItem setActive={setActive} active={active} item="Logout">
            </MenuItem>
            </button>
          </li>
        )}
        </Menu>
    </div>
  )
}

export default Navbar