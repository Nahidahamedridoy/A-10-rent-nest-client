"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

export default function PropertyCard({ property }) {
  if (!property) return null;

  // 🛠️ আপনার দেওয়া ডাটা স্ট্রাকচার অনুযায়ী নিখুঁত ডেসট্রাকচারিং
  const {
    _id,
    title,          
    description,
    location,
    propertyType,
    rentPrice,      // 💡 ডাটাবেজে 'rentPrice' ই আছে
    price,          // ফলব্যাক সেফটি
    rentType,
    bedrooms,
    bathrooms,
    propertySize,   // 💡 ডাটাবেজে 'propertySize' ই আছে
    size,           // ফলব্যাক সেফটি
    image,          // 🔥 মূল ফিক্স: ডাটাবেজে ফিল্ডের নাম 'image', 'images' নয়!
    images          // ফলব্যাক সেফটি
  } = property;

  // ভাড়ার সংখ্যা সেফলি হ্যান্ডেল করা
  const finalPrice = rentPrice || price || 0;
  const displayPrice = Number(finalPrice);

  // স্কয়ার ফিট হ্যান্ডেল করা
  const finalSize = propertySize || size || 0;

  // 📸 ইমেজ হ্যান্ডলিং: 'image' বা 'images' যা-ই আসুক, পারফেক্টলি শো করবে
  let displayImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"; // ডিফল্ট ব্যাকআপ

  // ১. প্রথমে ডাটাবেজের আসল 'image' ফিল্ড চেক করা হচ্ছে
  if (image && typeof image === "string" && image.trim() !== "") {
    displayImage = image;
  } 
  // ২. যদি কোনো প্রপার্টিতে 'images' ফিল্ড থাকে (অ্যারে বা স্ট্রিং), তার জন্য ফলব্যাক চেক
  else if (images) {
    if (typeof images === "string" && images.trim() !== "") {
      displayImage = images;
    } else if (Array.isArray(images) && images.length > 0) {
      displayImage = typeof images[0] === "object" ? images[0].url : images[0];
    }
  }

  return (
    <Card 
      className="bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-500/20 transition-all duration-300 h-full flex flex-col p-0 overflow-hidden group" 
      radius="xl"
    >
      {/* Property Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-50">
        <img
          src={displayImage}
          alt={title || "Property Image"}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        {/* Property Type Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 z-10">
          {propertyType || "Property"}
        </span>
      </div>

      {/* Property Details Section */}
      <div className="p-5 flex-grow flex flex-col justify-between gap-4">
        <div className="space-y-2">
          
          {/* Rent Price & Type */}
          <div className="flex items-baseline gap-1 text-slate-900">
            <span className="text-2xl font-extrabold text-indigo-600">
              ${displayPrice.toLocaleString()}
            </span>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
              / {rentType || "Monthly"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-pink-500 transition-colors line-clamp-1 capitalize">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <FaMapMarkerAlt className="text-pink-500 shrink-0 text-xs" />
            <span className="truncate font-medium">{location}</span>
          </div>

          {/* Short Description */}
          <p className="text-slate-400 text-xs line-clamp-2 pt-1 font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Amenities Info Grid (Bed, Bath, Sqft) */}
        <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-xs font-medium">
          <div className="flex items-center justify-center gap-1.5 border-r border-slate-200">
            <FaBed className="text-indigo-500 text-sm" />
            <span>{bedrooms || 0} Bed</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 border-r border-slate-200">
            <FaBath className="text-indigo-500 text-sm" />
            <span>{bathrooms || 0} Bath</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <FaRulerCombined className="text-indigo-500 text-xs" />
            <span>{finalSize} sqft</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-slate-100 mt-auto bg-slate-50/50">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Available Now
        </span>
        <Link href={`/property/${_id || "#"}`} className="inline-block">
          <Button
            size="sm"
            className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold h-9 px-5 text-xs shadow-sm hover:shadow transition-all"
            radius="lg"
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}