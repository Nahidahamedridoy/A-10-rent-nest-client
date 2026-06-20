import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
    FaHome,
    FaSignOutAlt,
    FaChartPie,
    FaPlus,
    FaList,
    FaClipboardList,
    FaUserCircle, // প্রোফাইলের জন্য আইকন
    FaHeart,
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaHistory
} from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';


const DashboardSidebar = () => {

    const { data: session } = useSession();
    const pathname = usePathname();

    const handleLogout = () => {
        // লগআউট লজিক
    };


    // ওনারের মেইন ৪টি ফিচার মেনু
    const ownerMenu = [
        { key: "overview", label: "Dashboard Home", icon: FaChartPie, href: "/dashboard/owner" },
        { key: "add-property", label: "Add Property", icon: FaPlus, href: "/dashboard/owner/add-property" },
        { key: "my-properties", label: "My Properties", icon: FaList, href: "/dashboard/owner/my-properties" },
        { key: "booking-requests", label: "Booking Requests", icon: FaClipboardList, href: "/dashboard/owner/booking-requests" },
    ];
    // tenant
    const tenantMenu = [
        { key: "overview", label: "Overview", icon: FaChartPie, href: "/dashboard/tenant" },
        // atar maddhome payment hobe ---> ticket
        { key: "my-bookings", label: "My Bookings", icon: FaClipboardList, href: "/dashboard/tenant/my-bookings" },
        { key: "favorites", label: "Favorites", icon: FaHeart, href: "/dashboard/tenant/favorites" }
    ];

    //admin 
    const adminMenu = [
        { key: "overview", label: "Overview", icon: FaChartPie, href: "/dashboard/admin" },
        { key: "all-users", label: "Users", icon: FaUsers, href: "/dashboard/admin/all-users" },
        { key: "all-properties", label: "Properties", icon: FaBuilding, href: "/dashboard/admin/all-properties" },
        { key: "all-bookings", label: "Bookings", icon: FaCalendarAlt, href: "/dashboard/admin/all-bookings" },
        { key: "transactions", label: "Transactions", icon: FaHistory, href: "/dashboard/admin/transactions" },
        { key: "profile", label: "Profile", icon: FaUserCircle, href: "/dashboard/admin/profile" }
    ];

    const role = session?.user?.role;
    // const role = "tenant"

    const menuItems = role === "owner" ? ownerMenu : role === "tenant" ? tenantMenu : role === "admin" ? adminMenu : null;

    return (
        <aside className="w-64 h-screen border-r border-white/5">
            <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
                {/* Brand / Logo */}
                <div className="px-6 py-5 border-b border-white/5 text-white">
                    <IoHome size={24} />
                </div>

                {/* User Profile */}
                <div className="px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                            <Image
                                width={40}
                                height={40}
                                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "Owner")}&background=7c3aed&color=fff&bold=true`}
                                alt="Avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-white text-sm font-bold truncate leading-tight">
                                {session?.user?.name || "Guest Owner"}
                            </p>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "owner" ? "text-indigo-400" : "text-pink-400"}`}>
                                {role || "owner"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-3 pb-2">Owner Panel</p>
                    {
                        menuItems?.map(({ key, label, icon: Icon, href }) => {
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer
                                            ${isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                                            ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                                        <Icon size={18} />
                                    </span>
                                    <span>{label}</span>
                                </Link>
                            )
                        })
                    }
                </nav>

                {/* Bottom Links (এখানে Profile রাউটটি যুক্ত করা হয়েছে) */}
                <div className="px-3 py-4 border-t border-white/5 space-y-1">
                    {/* ১. Profile Route (অ্যাক্টিভ হাইলাইটসহ) */}
                    <Link
                        href="/dashboard/owner/profile"
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                                ${pathname === "/dashboard/owner/profile"
                                ? "bg-blue-600 text-white"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                                ${pathname === "/dashboard/owner/profile" ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"}`}>
                            <FaUserCircle size={18} />
                        </span>
                        My Profile
                    </Link>

                    {/* ২. Back to Site */}
                    <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            <FaHome size={13} />
                        </span>
                        Back to Site
                    </Link>

                    {/* ৩. Sign Out */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
                    >
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            <FaSignOutAlt size={13} />
                        </span>
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>

    );
};

export default DashboardSidebar;