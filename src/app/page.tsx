'use client'
import FeaturedCourses from "./components/FeaturedCourses";
import HeroSection from "./components/HeroSection";
import MusicSchoolTestimonials from "./components/TestimonialCards";
import WhyChooseUs from "./components/WhyChooseUs";
import UpcomingWebinars from "./components/UpcomingWebinars";
import Instructors from "./components/Instructors";
import Footer from "./components/Footer";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';


export default function Home() {
   
  return (
    <main className=" min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">   
    <HeroSection/>
    <FeaturedCourses/>
    <WhyChooseUs/>
    <MusicSchoolTestimonials/>
    <UpcomingWebinars/>
    <Instructors/>
    <Footer/>
    </main>
  );
}
