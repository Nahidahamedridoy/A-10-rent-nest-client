"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  const role = session?.user?.role;

  const stats =
    role === "owner"
      ? [
          { title: "Properties", value: 12 },
          { title: "Bookings", value: 36 },
          { title: "Earnings", value: "$9,200" },
        ]
      : role === "tenant"
      ? [
          { title: "Bookings", value: 8 },
          { title: "Favorites", value: 15 },
          { title: "Reviews", value: 5 },
        ]
      : [
          { title: "Users", value: 45 },
          { title: "Properties", value: 60 },
          { title: "Bookings", value: 390 },
        ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 rounded-t-2xl" />

        <div className="-mt-16 px-8 pb-8">

          <Image
            src={
              session?.user?.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                session?.user?.name || "User"
              )}`
            }
            alt="profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-white"
          />

          <h2 className="mt-4 text-3xl font-bold">
            {session?.user?.name}
          </h2>

          <p className="text-gray-500">
            {session?.user?.email}
          </p>

          <span className="inline-block mt-3 rounded-full bg-blue-100 px-4 py-1 text-blue-700 font-semibold capitalize">
            {role}
          </span>

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-6 text-center"
              >
                <h3 className="text-gray-500">
                  {item.title}
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {item.value}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-10 rounded-xl border p-6">

            <h3 className="text-xl font-semibold mb-6">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="font-semibold">
                  {session?.user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold">
                  {session?.user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Role
                </p>

                <p className="font-semibold capitalize">
                  {role}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Joined
                </p>

                <p className="font-semibold">
                  June 2026
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}