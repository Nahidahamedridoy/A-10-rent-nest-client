"use client";
import { Card, Button } from "@heroui/react";
import { FaDollarSign, FaBuilding, FaHeart, FaArrowRight } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const data = [
  { name: "Jan", spent: 150 },
  { name: "Feb", spent: 300 },
  { name: "Mar", spent: 150 },
  { name: "Apr", spent: 450 },
  { name: "May", spent: 150 },
  { name: "Jun", spent: 150 },
];

export default function TenantOverview() {
  return (
    <div className="space-y-8 p-4 md:p-6 w-full max-w-[1400px] mx-auto relative z-10">
      
      {/* 🔝 মেইন হেডিং - টেক্সট কালার ডার্ক করা হয়েছে যাতে লাইট ব্যাকগ্রাউন্ডে পরিষ্কার দেখা যায় */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 drop-shadow-sm">
          Welcome Back, Tenant!
        </h1>
        <p className="text-slate-600 font-medium text-sm mt-1">
          Here is your rental overview and recent activities.
        </p>
      </div>

      {/* 📊 ১. সামারি কার্ড সেকশন - ব্যাকগ্রাউন্ড সলিড ডার্ক এবং টেক্সট ভিজিবিলিটি ফিক্সড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* কার্ড ১: Total Spent */}
        <Card className="border border-slate-800 bg-slate-900 shadow-xl p-6 transition-transform hover:scale-[1.01]" radius="2xl">
          <Card.Content className="flex items-center gap-5">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-inner">
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spent</p>
              <h3 className="text-3xl font-black text-white mt-1.5 tracking-tight">$1,350.00</h3>
            </div>
          </Card.Content>
        </Card>

        {/* 🏢 কার্ড ২: Active Bookings */}
        <Card className="border border-slate-800 bg-slate-900 shadow-xl p-6 transition-transform hover:scale-[1.01]" radius="2xl">
          <Card.Content className="flex items-center gap-5">
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 shadow-inner">
              <FaBuilding size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</p>
              <h3 className="text-3xl font-black text-white mt-1.5 tracking-tight">2 Properties</h3>
            </div>
          </Card.Content>
        </Card>

        {/* ❤️ কার্ড ৩: My Favorites */}
        <Card className="border border-slate-800 bg-slate-900 shadow-xl p-6 transition-transform hover:scale-[1.01]" radius="2xl">
          <Card.Content className="flex items-center gap-5">
            <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-400 border border-pink-500/20 shadow-inner">
              <FaHeart size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Favorites</p>
              <h3 className="text-3xl font-black text-white mt-1.5 tracking-tight">5 Items</h3>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* 📈 ২. চার্ট এবং কুইক অ্যাকশন সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* রিচার্টস এরিয়া গ্রাফ কার্ড */}
        <Card className="lg:col-span-2 border border-slate-800 bg-slate-900 shadow-xl p-6" radius="2xl">
          <Card.Header className="pb-4 flex flex-col items-start gap-1">
            <Card.Title className="text-xl font-bold text-white">Monthly Expense Analytics</Card.Title>
          </Card.Header>
          <Card.Content className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {/* গ্রিড লাইন এবং এক্সিস টেক্সট স্পষ্ট করা হয়েছে */}
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontWeight={600} tickLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} fontWeight={600} tickLine={false} dx={-5} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="spent" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* 🧭 কুইক নেভিগেশন কার্ড */}
        <Card className="border border-slate-800 bg-slate-900 shadow-xl p-6 flex flex-col justify-between" radius="2xl">
          <Card.Header className="flex flex-col items-start gap-2">
            <Card.Title className="text-xl font-extrabold text-white">Looking for a New Home?</Card.Title>
            <Card.Description className="text-slate-400 font-medium text-sm leading-relaxed mt-1">
              Explore hundreds of verified premium rental properties around you. Find your perfect match today!
            </Card.Description>
          </Card.Header>
          <Card.Content className="pt-6 w-full">
            <Button
              as={Link}
              href="/property"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-extrabold h-12 shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-[1.02]"
              radius="xl"
              endContent={<FaArrowRight className="text-sm" />}
            >
              Browse Properties
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}