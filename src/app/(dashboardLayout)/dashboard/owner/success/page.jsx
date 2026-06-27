import { baseURL } from '@/lib/api/baseUrl';
import { stripe } from '@/lib/stripe';
import { Button, Card, CardFooter, CardHeader, CardBody } from '@heroui/react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaHome, FaFileInvoiceDollar } from 'react-icons/fa';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // স্ট্রাইপ সেশন থেকে মেটাডাটা সহ সব ডাটা রিট্রিভ করা
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const res = await fetch(`${baseURL}/api/property/payments`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
  const data = await res.json();
  console.log(data);

  // মেটাডাটা থেকে আমাদের পাঠানো কাস্টম ডাটাগুলো বের করা
  const propertyTitle = session?.metadata?.propertyTitle || "Property Rental";
  const rentType = session?.metadata?.rentType || "Monthly";
  const duration = session?.metadata?.duration || "1";
  const totalPaid = session?.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#080c16] px-6 py-12">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950 -z-10" />

      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4" radius="lg">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          {/* হোম/বিল্ডিং আইকন (রেন্টাল ভাইব দেওয়ার জন্য) */}
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400 border border-emerald-500/20 mb-2">
            <FaHome size={44} className="animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Thank you, {session?.customer_details?.name || "Tenant"}. Your lease is now active.
          </p>
        </CardHeader>

        <CardBody className="gap-6 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
          <div className="space-y-4 text-center border-b border-white/5 pb-4">
            <FaCheckCircle className="text-emerald-400 mx-auto" size={40} />
            <h3 className="text-white font-bold text-lg">Property Rented Successfully</h3>
            <p className="text-emerald-300 font-medium text-sm">
              {propertyTitle}
            </p>
          </div>

          {/* 📋 পেমেন্ট ও ইনভয়েস সামারি */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Rent Mode:</span>
              <span className="text-white font-semibold">{rentType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Duration:</span>
              <span className="text-white font-semibold">{duration} {rentType === "Weekly" ? "Week(s)" : "Month(s)"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="text-emerald-400 font-extrabold text-base">${totalPaid}</span>
            </div>
            {session?.payment_intent?.id && (
              <div className="flex flex-col pt-2 border-t border-white/5 gap-1 text-[11px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <FaFileInvoiceDollar /> Transaction ID:
                </span>
                <span className="text-slate-400 font-mono break-all">{session.payment_intent.id}</span>
              </div>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex pt-6 justify-center">
          {/* বাটন ডাবল লিংক ফিক্স করা হয়েছে */}
          <Button
            as={Link}
            href="/dashboard/owner"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold h-11 px-8 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            radius="lg"
            endContent={<FaArrowRight />}
          >
            Go to Tenant Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}