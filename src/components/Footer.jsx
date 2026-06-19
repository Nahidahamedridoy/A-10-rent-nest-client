"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineOfficeBuilding, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"; // FaXTwitter হচ্ছে নতুন X লোগো

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 w-full mt-auto">
      {/* মেইন কন্টেন্ট সেকশন */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* ১. ব্র্যান্ড এবং বিবরণ */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
              <HiOutlineOfficeBuilding className="text-2xl text-blue-500" />
              <span className="tracking-tight">
                Rent <span className="text-blue-500">Nest</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Find, book, and rent your dream property seamlessly. A secure and transparent marketplace connecting tenants and property owners.
            </p>
            {/* সোশ্যাল মিডিয়া আইকনসমূহ (রিকোয়ারমেন্ট অনুযায়ী নতুন X লোগো সহ) */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-200">
                <FaXTwitter size={16} /> {/* Latest X Brand Rebrand */}
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-200">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-200">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* ২. কুইক লিংকস */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/all-properties" className="hover:text-blue-500 transition-colors duration-200">All Properties</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-500 transition-colors duration-200">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-500 transition-colors duration-200">Join as Owner</Link>
              </li>
            </ul>
          </div>

          {/* ৩. লিগ্যাল সেকশন */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-200">Trust & Safety</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors duration-200">FAQs</a>
              </li>
            </ul>
          </div>

          {/* ৪. কন্ট্যাক্ট ও সাপোর্ট */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <HiOutlineLocationMarker className="text-xl text-blue-500 mt-0.5 flex-shrink-0" />
                <span>123 Innovation Tower, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone className="text-lg text-blue-500 flex-shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlineMail className="text-lg text-blue-500 flex-shrink-0" />
                <span>support@urbannest.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* নিচের কপিরাইট অংশ */}
        <div className="mt-12 pt-8 border-t border-gray-900 text-center md:flex md:items-center md:justify-between text-xs tracking-wide">
          <p>&copy; {currentYear} RentNest Platforms Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-500">
            Designed for secure & professional rental solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}