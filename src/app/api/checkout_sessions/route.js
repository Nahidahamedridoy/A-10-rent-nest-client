import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe';
import { getUser } from '@/lib/api/session';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();

    const { type, rentPrice, rentType, propertyId, propertyTitle, duration,
      tenantEmail } = body;

      // console.log("body" , body);

    const user = await getUser();

    const finalEmail = user?.email ||tenantEmail || '';
    const finalUserId = user?.id || '';

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

    let metaObj = {
      tenantEmail: finalEmail,
      userId: finalUserId,
      propertyId: propertyId || '',
      paymentType: type || 'property_rent',
      propertyTitle: propertyTitle || '',
      rentType: rentType || 'Monthly',
      duration: currentDuration.toString(),
      amount: (pricePerUnit * currentDuration).toFixed(2),
    };

    // console.log("metaObj" , metaObj);

    const session = await stripe.checkout.sessions.create({
      customer_email: finalEmail || undefined,
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