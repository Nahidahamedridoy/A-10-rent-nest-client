"use client";

import { baseURL } from "@/lib/api/baseUrl";
import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const res = await fetch(`${baseURL}/api/admin/payments`);
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold ">
          Payment History
        </h1>

        <p className="text-slate-400 mt-2">
          Total Payments : {payments.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800">

            <tr className="text-xs uppercase text-slate-400">

              <th className="px-6 py-4 text-left">
                Tenant
              </th>

              <th className="px-6 py-4 text-left">
                Property
              </th>

              <th className="px-6 py-4 text-left">
                Owner
              </th>

              <th className="px-6 py-4 text-center">
                Amount
              </th>

              <th className="px-6 py-4 text-center">
                Payment
              </th>

              <th className="px-6 py-4 text-center">
                Transaction
              </th>

              <th className="px-6 py-4 text-center">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-slate-400"
                >
                  No Payment Found
                </td>

              </tr>

            ) : (

              payments.map((payment) => (

                <tr
                  key={payment._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="px-6 py-4">

                    <div>

                      <h2 className="font-semibold text-white">
                        {payment.tenantEmail}
                      </h2>

                      <p className="text-xs text-slate-500">
                        {payment.rentType}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-white">
                    {payment.propertyTitle}
                  </td>

                  <td className="px-6 py-4">

                    <div>

                      <h2 className="font-semibold text-white">
                        {payment.ownerName}
                      </h2>

                      <p className="text-xs text-slate-500">
                        {payment.ownerEmail}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-center font-bold text-green-400">
                    ৳{payment.amount}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <Chip
                      color="success"
                      variant="flat"
                    >
                      Paid
                    </Chip>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <span className="text-xs text-sky-400">
                      {payment.transactionId}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center text-slate-300">

                    {payment.bookingDate
                      ? new Date(
                          payment.bookingDate
                        ).toLocaleDateString()
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