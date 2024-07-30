"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true); // Initialize as true since the button should be disabled initially
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");
            router.push("/"); // Redirect to home or dashboard after successful login
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Enable button only if both email and password are provided
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-10 mt-6">
                {loading ? "Processing..." : "Login"}
            </h1>
            <hr />
            <label htmlFor="email" className="sr-only">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password" className="sr-only">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                disabled={buttonDisabled || loading}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <Link href="/signup" className="text-blue-500 hover:underline">New Account? Sign Up</Link>
        </div>
    );
}
