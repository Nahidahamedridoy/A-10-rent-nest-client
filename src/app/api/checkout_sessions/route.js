import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe'; 
import { getUser } from '@/lib/api/session';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();

    // console.log(body);

    const { type, rentPrice, rentType, propertyId, propertyTitle, duration } = body;

    const user = await getUser();

    const pricePerUnit = Number(rentPrice) || 0;
    const currentDuration = Number(duration) || 1;

    let lineObj = {
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(pricePerUnit * 100),
        product_data: {
          name: propertyTitle || "Property Rental Payment",
          description: `Rent Type: ${rentType || "Monthly"} | Duration: ${currentDuration} unit(s)`,
        },
      },
      quantity: currentDuration,
    };
    console.log(lineObj);

    let metaObj = {
      email: user?.email || '',
      userId: user?.id || '',
      propertyId: propertyId || '',
      paymentType: type || 'property_rent',
      propertyTitle: propertyTitle || '',
      rentType: rentType || 'Monthly',
      duration: currentDuration.toString(),
      amount: (pricePerUnit * currentDuration).toFixed(2),
    };

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [lineObj],
      metadata: metaObj,
      mode: 'payment',
      success_url: `${origin}/dashboard/owner/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}