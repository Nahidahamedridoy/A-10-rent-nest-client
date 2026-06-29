"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHome,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserTie,
} from "react-icons/fa";
import { baseURL } from "@/lib/api/baseUrl";

export default function AdminHomePage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📦 Fetch overview data
  useEffect(() => {
    const loadOverview = async () => {
      try {
        const res = await fetch(`${baseURL}/api/admin/overview`);
        const data = await res.json();

        if (data) {
          setOverview(data);
        }
      } catch (error) {
        console.log("Overview error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  // 📊 Stats Cards
  const stats = [
    {
      title: "Total Users",
      value: overview?.totalUsers || 0,
      icon: FaUsers,
      color: "from-cyan-500 to-sky-500",
    },
    {
      title: "Total Properties",
      value: overview?.totalProperties || 0,
      icon: FaHome,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Total Bookings",
      value: overview?.totalBookings || 0,
      icon: FaCalendarCheck,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Total Revenue",
      value: `৳${overview?.totalRevenue || 0}`,
      icon: FaMoneyBillWave,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Approved",
      value: overview?.approvedProperties || 0,
      icon: FaCheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: overview?.pendingProperties || 0,
      icon: FaClock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Rejected",
      value: overview?.rejectedProperties || 0,
      icon: FaTimesCircle,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Total Owners",
      value: overview?.totalOwners || 0,
      icon: FaUserTie,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="text-white text-lg animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] p-6">
      <div className="max-w-7xl mx-auto">

        {/* 🏷️ Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back! Here's a quick overview of your platform.
          </p>
        </motion.div>

        {/* 📊 STATS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl"
              >
                {/* glow effect */}
                <div
                  className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl`}
                />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color}`}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 📈 CHART + ACTIVITY PLACEHOLDER */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          {/* 📈 Chart */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl h-80 flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold">
                Monthly Earnings Chart
              </h2>
              <p className="text-slate-400 mt-2">
                Recharts Line Chart Coming Soon
              </p>
            </div>
          </motion.div>

          {/* 📋 Activity */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl h-80 flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold">
                Recent Activities
              </h2>
              <p className="text-slate-400 mt-2">
                Bookings, Properties & Transactions
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}