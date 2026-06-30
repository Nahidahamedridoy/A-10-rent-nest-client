"use client";

import Link from "next/link";
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";

const MyBookingsTable = ({ bookings }) => {
  // console.log("bookings",bookings);

  return (
    <Card className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl">
      <div className="overflow-x-auto">
        <Table
          aria-label="My Bookings Table"
          removeWrapper
          classNames={{
            table: "min-w-full",
            th: "bg-slate-950 text-slate-400 uppercase text-xs font-bold tracking-widest h-14",
            td: "h-16",
            tr: "border-b border-white/5 hover:bg-white/5 transition-all duration-300",
          }}
        >
          <TableContent>
            <TableHeader>
              <TableColumn isRowHeader>PROPERTY NAME</TableColumn>
              <TableColumn>BOOKING DATE</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>TOTAL PAID</TableColumn>
              <TableColumn>PAYMENT STATUS</TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="py-14 text-center">
                  <p className="text-lg font-semibold text-slate-400">
                    No bookings found
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Book your first property to see it here.
                  </p>
                </div>
              }
            >
              {bookings?.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    {booking.propertyTitle ? (
                      <Link
                        href={`/property/${booking.propertyId}`}
                        className="font-semibold text-red-400 hover:text-cyan-400 transition-colors"
                      >
                        {booking.propertyTitle}
                      </Link>
                    ) : (
                      <span className="text-slate-500 italic">
                        Unknown Property
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-slate-300">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell className="text-slate-300">
                    {booking.duration || 1}{" "}
                    {booking.rentType === "Weekly"
                      ? "Week(s)"
                      : "Month(s)"}
                  </TableCell>

                  <TableCell>
                    <span className="font-bold text-emerald-400">
                      ${Number(booking.amount || 0).toFixed(2)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="sm"
                      radius="full"
                      variant="shadow"
                      color={
                        booking.paymentStatus === "paid"
                          ? "success"
                          : "danger"
                      }
                      className="font-semibold uppercase px-3"
                    >
                      {booking.paymentStatus || "Unpaid"}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
};

export default MyBookingsTable;