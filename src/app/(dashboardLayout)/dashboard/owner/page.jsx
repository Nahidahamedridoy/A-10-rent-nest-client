"use client"
import React from 'react';
import { Card, Button } from '@heroui/react';
import { 
    FaDollarSign, 
    FaBuilding, 
    FaClipboardCheck, 
    FaDownload 
} from 'react-icons/fa';

import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const OwnerDashboardHome = () => {
    // প্রজেক্ট রিকোয়ারমেন্ট অনুযায়ী ডামি অ্যানালিটিক্স ডেটা (পরবর্তীতে এটি ব্যাকএন্ড থেকে ফেচ করবেন)
    const stats = {
        totalEarnings: 8450.00, // Sum of all successful booking payments
        totalProperties: 8,       // Number of properties created by the owner
        totalBookings: 24,       // Number of confirmed bookings
    };

    // বিগত ১২ মাসের উপার্জনের চার্ট ডেটা (Line Chart Data)
    const monthlyEarningsData = [
        { month: 'Jul 25', earnings: 450 },
        { month: 'Aug 25', earnings: 600 },
        { month: 'Sep 25', earnings: 800 },
        { month: 'Oct 25', earnings: 550 },
        { month: 'Nov 25', earnings: 900 },
        { month: 'Dec 25', earnings: 1200 },
        { month: 'Jan 26', earnings: 700 },
        { month: 'Feb 26', earnings: 850 },
        { month: 'Mar 26', earnings: 950 },
        { month: 'Apr 26', earnings: 1100 },
        { month: 'May 26', earnings: 1300 },
        { month: 'Jun 26', earnings: 1450 },
    ];

    const handleDownloadReport = () => {
        // PDF ডাউনলোডের লজিক এখানে হবে (Optional Requirement)
        alert("Downloading Monthly Earnings Report as PDF...");
    };

    return (
        <div className="space-y-6 mt-6 max-w-7xl mx-auto">
            {/* হেডার এবং রিপোর্ট ডাউনলোড বাটন */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-slate-400 text-xs">Monitor your property performance and monthly revenue.</p>
                </div>
                <Button 
                    onClick={handleDownloadReport}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 h-10 px-4"
                    radius="lg"
                >
                    <FaDownload size={14} /> Download Earnings Report (PDF)
                </Button>
            </div>

            {/* ৩টি রিকোয়ার্ড সামারি কার্ডস */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ১. Total Earnings */}
                <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Earnings</span>
                            <h2 className="text-3xl font-extrabold text-white">
                                {`$${stats.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                            </h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
                            <FaDollarSign size={24} />
                        </div>
                    </div>
                </Card>

                {/* ২. Total Properties */}
                <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Properties</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.totalProperties}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                            <FaBuilding size={24} />
                        </div>
                    </div>
                </Card>

                {/* ৩. Total Bookings */}
                <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Bookings</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.totalBookings}</h2>
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
                            <FaClipboardCheck size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* ৪. Monthly Earnings Chart (React Rechart) */}
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6" radius="lg">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white">Monthly Earnings Chart</h3>
                    <p className="text-slate-400 text-xs">Earnings overview for the last 12 months generated from successful bookings.</p>
                </div>
                
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" h="100%">
                        <LineChart
                            data={monthlyEarningsData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                            <XAxis 
                                dataKey="month" 
                                stroke="#94a3b8" 
                                fontSize={12}
                                tickLine={false}
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={12}
                                tickLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                                formatter={(value) => [`$${value}`, 'Earnings']}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="earnings" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                activeDot={{ r: 6 }}
                                dot={{ strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default OwnerDashboardHome;