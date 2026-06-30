"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

import { Card, Button } from "@heroui/react";

import {
  FaDollarSign,
  FaBuilding,
  FaClipboardCheck,
  FaDownload,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OwnerDashboardHome = () => {
  const { data: session } = useSession();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadDashboard = async () => {
      try {
        const res = await fetch(
          `${baseURL}/api/owner/dashboard/${session.user.email}`
        );

        const data = await res.json();

        setStats(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [session]);

  const handleDownloadReport = () => {
    alert("Downloading Monthly Earnings Report...");
  };

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6 max-w-7xl mx-auto">
      {/* Header */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-slate-400 text-xs">
            Monitor your property performance and monthly revenue.
          </p>
        </div>

        <Button
          onClick={handleDownloadReport}
          className="bg-indigo-600 text-white"
        >
          <FaDownload />
          Download Earnings Report
        </Button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="bg-slate-900/60 border border-white/10">
          <div className="p-6 flex justify-between items-center">

            <div>

              <p className="text-xs uppercase text-slate-400">
                Total Earnings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ৳{stats.totalEarnings.toLocaleString()}
              </h2>

            </div>

            <div className="p-4 rounded-xl bg-green-500/10 text-green-400">
              <FaDollarSign size={24} />
            </div>

          </div>
        </Card>

        <Card className="bg-slate-900/60 border border-white/10">

          <div className="p-6 flex justify-between items-center">

            <div>

              <p className="text-xs uppercase text-slate-400">
                Total Properties
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalProperties}
              </h2>

            </div>

            <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400">
              <FaBuilding size={24} />
            </div>

          </div>

        </Card>

        <Card className="bg-slate-900/60 border border-white/10">

          <div className="p-6 flex justify-between items-center">

            <div>

              <p className="text-xs uppercase text-slate-400">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalBookings}
              </h2>

            </div>

            <div className="p-4 rounded-xl bg-pink-500/10 text-pink-400">
              <FaClipboardCheck size={24} />
            </div>

          </div>

        </Card>

      </div>

      {/* Chart */}

      <Card className="bg-slate-900/60 border border-white/10 p-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold">
            Monthly Earnings
          </h2>

          <p className="text-xs text-slate-400">
            Last 12 months earnings overview
          </p>

        </div>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={stats.monthlyEarnings}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `৳${value}`}
              />

              <Tooltip
                formatter={(value) => [`৳${value}`, "Earnings"]}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                }}
              />

              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#6366f1"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </Card>
    </div>
  );
};

export default OwnerDashboardHome;