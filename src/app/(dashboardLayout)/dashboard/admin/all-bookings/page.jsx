"use client";

import { baseURL } from "@/lib/api/baseUrl";
import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);

  const loadBookings = async (currentPage = page) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${baseURL}/api/admin/bookings?page=${currentPage}&limit=5`
      );

      const data = await res.json();

      setBookings(data.bookings);
      setTotalBookings(data.totalBookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings(page);
  }, [page]);

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
          Total Bookings : {totalBookings}
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

                  <td className="px-6 py-4 text-white">
                    {booking.propertyTitle}
                  </td>

                  <td className="px-6 py-4 text-white">
                    {booking.ownerName}
                  </td>

                  <td className="px-6 py-4 text-center font-bold text-green-400">
                    ৳{booking.amount}
                  </td>

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

                  <td className="px-6 py-4 text-center text-slate-300">
                    {booking.bookingDate
                      ? new Date(
                          booking.bookingDate
                        ).toLocaleDateString()
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">

        <p className="text-sm text-gray-500">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-sky-600 hover:text-white transition disabled:opacity-40"
          >
            <FaAngleLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${
                page === index + 1
                  ? "bg-sky-600 text-white"
                  : "border border-gray-300 hover:bg-sky-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-sky-600 hover:text-white transition disabled:opacity-40"
          >
            <FaAngleRight />
          </button>

        </div>

      </div>
    </div>
  );
}