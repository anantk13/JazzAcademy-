// components/Navbar.tsx
'use client';

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "@/app/components/ui/navbar-menu";
import { cn } from "@/app/utility/cn";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { useAuth } from '@/app/AuthContext/page'; // Adjust path based on your setup

function Navbar({ className }: { className?: string }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Use context if available
  const [active, setActive] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      
      setIsAuthenticated(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cookies = parseCookies();
    const tokenExists = !!cookies.token;
    setIsAuthenticated(tokenExists);
  }, [setIsAuthenticated]);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href={"/courses"}>
          <MenuItem setActive={setActive} active={active} item="Our Courses" />
        </Link>
        <Link href={"/contact"}>
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>
        {!isAuthenticated ? (
          <Link href="/login">
            <MenuItem setActive={setActive} active={active} item="Login" />
          </Link>
        ) : (
          <div>
            <button onClick={logout}>
              <MenuItem setActive={setActive} active={active} item="Logout" />
            </button>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
