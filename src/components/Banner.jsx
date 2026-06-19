"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
// সঠিক মডিউল থেকে আইকনগুলো আলাদা করা হলো
import { HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiSearch } from "react-icons/hi"; 
import { FaDollarSign } from "react-icons/fa"; 

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // এখানে তোমার ব্যাকএন্ড ফিল্টারিং API-এর সাথে ডেটা পাস করবে
  };

  // Framer Motion Animations Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* 🏙️ ব্যাকগ্রাউন্ড ইমেজ + ডার্ক ওভারলে */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/80 to-gray-900/40" />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl w-full mx-auto text-center lg:text-left z-10 flex flex-col items-center lg:items-start gap-10"
      >
        {/* 📢 টেক্সট সেকশন */}
        <div className="max-w-3xl space-y-5">
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Discover Your <span className="text-blue-500">Perfect Rental</span> Home Seamlessly
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed"
          >
            Connect directly with verified property owners. Browse premium listings, secure safe online bookings, and experience an effortless, transparent marketplace.
          </motion.p>
        </div>

        {/* 🔍 সার্চ বার ফর্ম */}
        <motion.div 
          variants={fadeInUp}
          className="w-full bg-white/95 backdrop-blur-md p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* ১. লোকেশন ইনপুট */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <HiOutlineLocationMarker className="text-blue-500 text-sm" /> Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Where to look?"
                value={searchQuery.location}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* ২. প্রপার্টি টাইপ ড্রপডাউন */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <HiOutlineOfficeBuilding className="text-blue-500 text-sm" /> Property Type
              </label>
              <select
                name="propertyType"
                value={searchQuery.propertyType}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            {/* ৩. মিনিমাম প্রাইস */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <FaDollarSign className="text-blue-500 text-sm" /> Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min ($)"
                value={searchQuery.minPrice}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* ৪. ম্যাক্সিমাম প্রাইস */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <FaDollarSign className="text-blue-500 text-sm" /> Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max ($)"
                value={searchQuery.maxPrice}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* ৫. সার্চ বাটন */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl py-3.5 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <HiSearch className="text-lg" />
                <span>Find Properties</span>
              </button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}