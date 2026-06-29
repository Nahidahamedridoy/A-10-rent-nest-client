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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminHomePage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const res = await fetch(`${baseURL}/api/admin/overview`);
        const data = await res.json();

        if (data.success) {
          setOverview(data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>

          <p className="text-slate-300 text-lg">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: overview?.totalUsers ?? 0,
      icon: FaUsers,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Total Owners",
      value: overview?.totalOwners ?? 0,
      icon: FaUserTie,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Total Properties",
      value: overview?.totalProperties ?? 0,
      icon: FaHome,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Total Bookings",
      value: overview?.totalBookings ?? 0,
      icon: FaCalendarCheck,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Revenue",
      value: `৳${overview?.totalRevenue?.toLocaleString() || 0}`,
      icon: FaMoneyBillWave,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Approved",
      value: overview?.approvedProperties ?? 0,
      icon: FaCheckCircle,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Pending",
      value: overview?.pendingProperties ?? 0,
      icon: FaClock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Rejected",
      value: overview?.rejectedProperties ?? 0,
      icon: FaTimesCircle,
      color: "from-red-500 to-rose-500",
    },
  ];

  const revenueData = overview?.monthlyRevenue || [];

  const bookingData = overview?.monthlyBookings || [];

  const pieData = [
    {
      name: "Approved",
      value: overview?.approvedProperties || 0,
    },
    {
      name: "Pending",
      value: overview?.pendingProperties || 0,
    },
    {
      name: "Rejected",
      value: overview?.rejectedProperties || 0,
    },
  ];

  const COLORS = [
    "#10b981",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="min-h-screen bg-[#030712] p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back! Here's what's happening on your platform.
          </p>
        </motion.div>

        {/* Summary Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${item.color}`}
                  >
                    <Icon className="text-white text-2xl" />
                  </div>

                </div>

              </motion.div>
            );

          })}

        </div>

        {/* Charts will start from here */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">
                    {/* Monthly Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Monthly Revenue
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData}>
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="revenue"
                  fill="#38bdf8"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Monthly Bookings
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={bookingData}>
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  stroke="#94a3b8"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="bookings"
                  fill="#8b5cf6"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Property Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Property Status
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={5}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

      </div>
    </div>
  );
}