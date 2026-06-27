"use client";

import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function TopLocations() {
  const locations = [
    { 
      id: 1, 
      name: "Gulshan", 
      district: "Dhaka",
      properties: "120+ Properties", 
      img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 2, 
      name: "Dhanmondi", 
      district: "Dhaka",
      properties: "85+ Properties", 
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 3, 
      name: "Agrabad", 
      district: "Chattogram",
      properties: "64+ Properties", 
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 4, 
      name: "Sreemangal", 
      district: "Sylhet",
      properties: "42+ Properties", 
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80" 
    },
  ];

  return (
    <section className="py-20 px-6 bg-white w-full border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Top Locations
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Explore the most popular neighborhoods and cities with high-demand rental spaces.
          </p>
        </div>

        {/* 💡 স্ক্রিনশটের মতো নিখুঁত কার্ড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer group"
            >
              {/* কার্ড ইমেজ এরিয়া */}
              <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                <img 
                  src={loc.img} 
                  alt={loc.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* কার্ড কন্টেন্ট এরিয়া (হুবহু স্ক্রিনশটের স্টাইলে কালার ও স্পেসিং) */}
              <div className="p-5 flex flex-col items-start text-left space-y-2.5">
                {/* ১. এরিয়ার নাম (Bold Heading) */}
                <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {loc.name}
                </h3>
                
                {/* ২. জেলার নাম (লোকেশন আইকন সহ) */}
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                  <FaMapMarkerAlt className="text-indigo-500 text-xs shrink-0" />
                  <span>{loc.district}</span>
                </div>
                
                {/* ৩. প্রপার্টি কাউন্ট (আপনার স্ক্রিনশটের নীল রঙের টেক্সটের মতো স্ট্যান্ডার্ড ইন্ডিগো কালার) */}
                <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold pt-1">
                  <FaBuilding className="text-xs shrink-0" />
                  <span>{loc.properties}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}