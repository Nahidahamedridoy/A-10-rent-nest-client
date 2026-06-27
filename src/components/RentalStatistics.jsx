"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FaBuilding, FaUsers, FaCheckCircle, FaAward } from "react-icons/fa";

export default function RentalStatistics() {
  const stats = [
    { id: 1, icon: <FaBuilding />, count: "12,000+", label: "Verified Properties" },
    { id: 2, icon: <FaUsers />, count: "45,000+", label: "Happy Tenants" },
    { id: 3, icon: <FaCheckCircle />, count: "98.5%", label: "Safe Bookings Rate" },
    { id: 4, icon: <FaAward />, count: "15+", label: "National Awards" },
  ];

  return (
    <section className="py-20 px-6 bg-white w-full border-b border-slate-100">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Our Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Platform Trust In Numbers
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* 💡 ফিক্স: এখানে group এবং hover:-translate-y-1 দিয়ে ইন্টারঅ্যাকশন স্মুথ করা হয়েছে */}
              <Card 
                className="p-8 text-center bg-slate-50/60 border border-slate-100 rounded-2xl shadow-sm hover:bg-white hover:border-indigo-200 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer" 
                shadow="none"
              >
                {/* আইকন বক্স: হোভার করলে ব্যাকগ্রাউন্ড নীল এবং আইকন সাদা হবে */}
                <div className="text-indigo-600 text-3xl mx-auto mb-4 bg-indigo-50 p-4 rounded-xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                
                {/* 💡 নাম্বার টেক্সট: হোভার করলে সাদা না হয়ে চমৎকার ইন্ডিগো কালার হবে */}
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
                  {stat.count}
                </h3>
                
                {/* লেবেল টেক্সট */}
                <p className="text-slate-500 text-sm font-medium">
                  {stat.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}