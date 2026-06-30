"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaSignOutAlt,
  FaChartPie,
  FaPlus,
  FaList,
  FaClipboardList,
  FaUserCircle,
  FaHeart,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = session?.user?.role;

  const handleLogout = () => {
    // Logout Logic
  };

  const ownerMenu = [
    {
      key: "overview",
      label: "Dashboard Home",
      icon: FaChartPie,
      href: "/dashboard/owner",
    },
    {
      key: "my-properties",
      label: "My Properties",
      icon: FaList,
      href: "/dashboard/owner/my-properties",
    },
    {
      key: "add-property",
      label: "Add Property",
      icon: FaPlus,
      href: "/dashboard/owner/add-property",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/owner/profile",
    },
  ];

  const tenantMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaChartPie,
      href: "/dashboard/tenant",
    },
    {
      key: "my-bookings",
      label: "My Bookings",
      icon: FaClipboardList,
      href: "/dashboard/tenant/my-bookings",
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: FaHeart,
      href: "/dashboard/tenant/favorites",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/tenant/profile",
    },
  ];

  const adminMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaChartPie,
      href: "/dashboard/admin",
    },
    {
      key: "all-users",
      label: "Users",
      icon: FaUsers,
      href: "/dashboard/admin/all-users",
    },
    {
      key: "all-properties",
      label: "Properties",
      icon: FaBuilding,
      href: "/dashboard/admin/all-properties",
    },
    {
      key: "all-bookings",
      label: "Bookings",
      icon: FaCalendarAlt,
      href: "/dashboard/admin/all-bookings",
    },
    {
      key: "payment-history",
      label: "Transactions",
      icon: FaMoneyBillWave,
      href: "/dashboard/admin/payment-history",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/admin/profile",
    },
  ];

  const menuItems =
    role === "owner"
      ? ownerMenu
      : role === "tenant"
      ? tenantMenu
      : adminMenu;

  const panelTitle =
    role === "owner"
      ? "Owner Panel"
      : role === "tenant"
      ? "Tenant Panel"
      : "Admin Panel";

  return (
    <aside className="w-64 h-screen border-r border-white/5">
      <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/5 text-white">
          <IoHome size={24} />
        </div>

        {/* User */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60">
              <Image
                src={
                  session?.user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    session?.user?.name || "User"
                  )}&background=7c3aed&color=fff`
                }
                alt="avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="overflow-hidden">
              <h3 className="text-white text-sm font-bold truncate">
                {session?.user?.name || "Guest"}
              </h3>

              <p
                className={`text-[10px] uppercase font-bold tracking-wider ${
                  role === "admin"
                    ? "text-yellow-400"
                    : role === "owner"
                    ? "text-indigo-400"
                    : "text-pink-400"
                }`}
              >
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-3 pb-2">
            {panelTitle}
          </p>

          {menuItems.map(({ key, label, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={key}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-semibold
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center
                  ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  <Icon size={17} />
                </span>

                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/5 p-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <FaHome size={14} />
            </span>

            Back to Site
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <FaSignOutAlt size={14} />
            </span>

            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;