"use client";

import { baseURL } from "@/lib/api/baseUrl";
import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await fetch(`${baseURL}/api/admin/bookings`);
      const data = await res.json();

      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          All Bookings
        </h1>

        <p className="text-slate-400 mt-2">
          Total Bookings : {bookings.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr className="text-slate-400 uppercase text-xs">
              <th className="px-6 py-4 text-left">Tenant</th>
              <th className="px-6 py-4 text-left">Property</th>
              <th className="px-6 py-4 text-left">Owner</th>
              <th className="px-6 py-4 text-center">Amount</th>
              <th className="px-6 py-4 text-center">Booking</th>
              <th className="px-6 py-4 text-center">Payment</th>
              <th className="px-6 py-4 text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-400"
                >
                  No Bookings Found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  {/* Tenant */}
                  <td className="px-6 py-4">
                    <div>
                      <h2 className="font-semibold text-white">
                        {booking.tenantEmail}
                      </h2>

                      <p className="text-xs text-slate-500">
                        {booking.rentType}
                      </p>
                    </div>
                  </td>

                  {/* Property */}
                  <td className="px-6 py-4 text-white">
                    {booking.propertyTitle}
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-4 text-white">
                    {booking.ownerName || "N/A"}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-center font-bold text-green-400">
                    ৳{booking.amount}
                  </td>

                  {/* Booking Status */}
                  <td className="px-6 py-4 text-center">
                    <Chip
                      variant="flat"
                      color={
                        booking.bookingStatus === "approved"
                          ? "success"
                          : booking.bookingStatus === "pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {booking.bookingStatus}
                    </Chip>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4 text-center">
                    <Chip
                      variant="flat"
                      color={
                        booking.paymentStatus === "paid"
                          ? "success"
                          : "warning"
                      }
                    >
                      {booking.paymentStatus}
                    </Chip>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-center text-slate-300">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString()
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}