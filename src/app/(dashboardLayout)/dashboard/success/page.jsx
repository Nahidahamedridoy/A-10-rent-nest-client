import { baseURL } from '@/lib/api/baseUrl';
import { stripe } from '@/lib/stripe';
import { Button, Card } from '@heroui/react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaFileInvoiceDollar } from 'react-icons/fa';

export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const paymentData = {
    amount: session?.metadata?.amount,
    propertyId: session?.metadata?.propertyId,
    propertyTitle: session?.metadata?.propertyTitle,
    duration: session?.metadata?.duration,
    tenantEmail: session?.metadata?.tenantEmail || session?.customer_email,
    rentType: session?.metadata?.rentType,
    paymentType: "booking",
    transactionId: session?.payment_intent?.id,
    paymentStatus: session?.payment_status
  };

  // console.log(paymentData , "paymentData");

  const res = await fetch(`${baseURL}/api/property/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentData)
  });
  const data = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4">

      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full" />

      <Card
        className="w-full max-w-md bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 relative"
        radius="2xl"
      >
        <Card.Header className="flex flex-col items-center gap-3 pb-5">

          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-400/20">
            <FaCheckCircle className="text-4xl text-blue-400" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Payment Successful
          </h2>

          <p className="text-sm text-slate-400 text-center">
            Your booking has been confirmed successfully.
          </p>

        </Card.Header>

        <Card.Content className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/5 p-5">

          <h3 className="text-lg font-semibold text-white truncate">
            {paymentData.propertyTitle}
          </h3>

          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Duration</span>
            <span className="text-white">
              {paymentData.duration} {paymentData.rentType === "Weekly" ? "Week(s)" : "Month(s)"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Amount</span>
            <span className="font-bold text-white">
              ${Number(paymentData.amount).toFixed(2)}
            </span>
          </div>

          <div className="rounded-xl bg-[#0f172a] border border-white/5 p-3">
            <p className="text-[11px] text-slate-500 mb-1">
              Transaction ID
            </p>

            <p className="text-xs text-violet-400 font-mono break-all">
              {paymentData.transactionId}
            </p>
          </div>

        </Card.Content>

        <Card.Footer className="flex gap-3 pt-5">

          <Link
          href="/dashboard/tenant/my-bookings">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold h-11 rounded-xl"
            >
            My Bookings
          </Button>
              </Link>

          <Button
            href="/property"
            variant="bordered"
            className="flex-1 border-white/10 text-white h-11 rounded-xl hover:bg-white/5"
          >
            Explore
          </Button>

        </Card.Footer>

      </Card>

    </div>
  );
}