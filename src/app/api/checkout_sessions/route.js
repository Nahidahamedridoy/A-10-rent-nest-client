import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe'; // আপনার স্ট্রাইপ ইনস্ট্যান্সের পাথ ঠিক রাখুন
import { getUser } from '@/lib/api/session';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();

    // console.log(body);
    
    // প্রপার্টি উইজেট থেকে পাঠানো ডাটা ডেস্ট্রাকচারিং
    const { type, rentPrice, rentType, propertyId, propertyTitle, duration } = body;

    const user = await getUser();

    // সেফটি চেক: ডাটা ঠিকঠাক কনভার্ট করা
    const pricePerUnit = Number(rentPrice) || 0;
    const currentDuration = Number(duration) || 1;

    // ১. Stripe Line Items অবজেক্ট তৈরি (এখানে সাবস্ক্রিপশনের কোনো ঝামেলা নেই)
    let lineObj = {
      price_data: {
        currency: 'usd', // আপনার রিকোয়ারমেন্ট অনুযায়ী কারেন্সি (usd/bdt) রাখুন
        unit_amount: Math.round(pricePerUnit * 100), // স্ট্রাইপ সেন্টস (Cents) এ হিসাব করে, তাই ১০০ দিয়ে গুণ
        product_data: {
          name: propertyTitle || "Property Rental Payment",
          description: `Rent Type: ${rentType || "Monthly"} | Duration: ${currentDuration} unit(s)`,
        },
      },
      quantity: currentDuration, // duration টাই মূলত কোয়ান্টিটি হিসেবে কাজ করবে
    };

    // ২. Webhook বা ডাটাবেজে ট্র্যাক করার জন্য মেটাডাটা অবজেক্ট
    const metaObj = {
      email: user?.email || '',
      userId: user?.id || '',
      propertyId: propertyId || '',
      paymentType: type || 'property_rent',
      propertyTitle: propertyTitle || '',
      rentType: rentType || 'Monthly',
      duration: currentDuration.toString(),
      totalAmount: (pricePerUnit * currentDuration).toFixed(2),
    };

    // ৩. Stripe Checkout Session তৈরি করা
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [lineObj],
      metadata: metaObj,
      mode: 'payment', // ওয়ান-টাইম পেমেন্টের জন্য সবসময় 'payment' মোড হবে
      
      success_url: `${origin}/dashboard/owner/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    // ক্লায়েন্ট সাইডে রিডাইরেকশনের জন্য স্ট্রাইপ ইউআরএল রিটার্ন করা
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}