import Link from "next/link";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react";

const MyBookingsTable = ({ bookings }) => {
  console.log(bookings);

  return (
    <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        {/* রিকোয়ারমেন্ট অনুযায়ী Table স্ট্রাকচার */}
        <Table aria-label="My Bookings Table" removeWrapper>
          <TableHeader className="bg-slate-100 dark:bg-slate-950/40 border-b border-slate-200 dark:border-white/5 rounded-t-xl">
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5" isRowHeader>
              PROPERTY NAME
            </TableColumn>
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5">
              BOOKING DATE
            </TableColumn>
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5">
              DURATION
            </TableColumn>
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5">
              AMOUNT PAID
            </TableColumn>
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5">
              BOOKING STATUS
            </TableColumn>
            <TableColumn className="py-4 px-6 text-slate-700 dark:text-slate-400 font-black uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-white/5">
              PAYMENT STATUS
            </TableColumn>
          </TableHeader>
          
          <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No property rental bookings found yet. Explore All Properties!</p>}>
            {bookings?.map((booking) => (
              <TableRow key={booking._id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                
                {/* ১. Property Name (ক্লিক করলে ডিটেইলস পেজে যাবে) */}
                <TableCell className="py-4 px-6 align-middle font-bold text-slate-900 dark:text-white">
                  <Link href={`/property/${booking.propertyId}`} className="hover:text-pink-500 dark:hover:text-pink-400 hover:underline">
                    {booking.propertyTitle}
                  </Link>
                </TableCell>
                
                {/* ২. Booking Date */}
                <TableCell className="py-4 px-6 align-middle text-slate-600 dark:text-slate-300 font-semibold">
                  {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </TableCell>
                
                {/* ৩. Duration & RentType */}
                <TableCell className="py-4 px-6 align-middle text-slate-600 dark:text-slate-300 font-medium">
                  {booking.duration} {booking.rentType === "Weekly" ? "Week(s)" : "Month(s)"}
                </TableCell>
                
                {/* ৪. Amount Paid */}
                <TableCell className="py-4 px-6 align-middle font-black text-emerald-600 dark:text-emerald-400">
                  ${Number(booking.amount)?.toFixed(2)}
                </TableCell>
                
                {/* ৫. Booking Status Badge (Pending, Approved, Rejected) */}
                <TableCell className="py-4 px-6 align-middle">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      booking.bookingStatus === "Approved" ? "success" : 
                      booking.bookingStatus === "Rejected" ? "danger" : "warning"
                    }
                    className="font-bold uppercase text-[10px] tracking-wider px-2"
                  >
                    {booking.bookingStatus || "Pending"}
                  </Chip>
                </TableCell>

                {/* ৬. Payment Status Badge */}
                <TableCell className="py-4 px-6 align-middle">
                  <Chip
                    size="sm"
                    variant="dot"
                    color={booking.paymentStatus === "paid" ? "success" : "danger"}
                    className="font-extrabold uppercase text-[10px] tracking-wider px-2"
                  >
                    {booking.paymentStatus || "unpaid"}
                  </Chip>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default MyBookingsTable;