"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

export default function BookingWidget({ rentPrice, rentType, propertyId, propertyTitle }) {
  
  const [duration, setDuration] = useState(1);
  const { data: session } = useSession();
  const user = session?.user;

  
  const isAvailable = rentPrice > 0;
  const pricePerUnit = Number(rentPrice) || 0;

 
  const currentDuration = duration > 0 ? duration : 1;
  const totalAmount = (pricePerUnit * currentDuration).toFixed(2);

  const handleBookProperty = async () => {
    if (!user) {
      alert("Please login to rent this property.");
      return;
    }

    const paymentData = {
      type: "property_rent",
      rentPrice: pricePerUnit.toFixed(2),
      rentType: rentType || "Monthly",
      propertyId,
      propertyTitle,
      duration: currentDuration, // কত মাসের জন্য ভাড়া নিতে চাচ্ছে
    };

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });
      const data = await res.json();
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout redirection failed:", error);
    }
  };

  return (
    <Card className="glass border-white/5 sticky top-24" radius="lg">
      {user?.role === "tenant" ? (
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold ">Rental Summary</h3>

          {/* Stat Matrix List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Rent Price:</span>
              <span className="text-pink-400 font-extrabold text-xl">
                ${pricePerUnit.toFixed(2)}
                <span className="text-xs text-slate-400 font-normal"> / {rentType || "month"}</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Availability Status:</span>
              <span className=" font-bold">
                {!isAvailable ? (
                  <span className="text-red-500 uppercase">Unavailable</span>
                ) : (
                  <span className="text-emerald-400 uppercase">Ready to Rent</span>
                )}
              </span>
            </div>
          </div>

          {isAvailable && (
            <>
              {/* Duration Input based on rentType */}
              <Input
                value={duration}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setDuration(""); // ব্যাকস্পেস দিয়ে পুরো ইনপুট ক্লিয়ার করতে দেবে
                  } else {
                    setDuration(Math.max(1, parseInt(val) || 1)); // মিনিমাম ১ বা তার বেশি হতে হবে
                  }
                }}
                type="number"
                label={`Duration (${rentType === "Weekly" ? "Weeks" : "Months"})`}
                labelPlacement="outside"
                placeholder="1"
                min={1}
                className="bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 "
              />

              <div className="flex justify-between items-center text-sm font-semibold  pt-2">
                <span>Total Payable:</span>
                <span className=" text-lg">
                  ${totalAmount}
                </span>
              </div>
            </>
          )}

          <Button
            isDisabled={!isAvailable}
            onClick={handleBookProperty}
            className={`w-full font-bold h-12 shadow-lg ${!isAvailable
              ? "bg-slate-800 text-slate-500 shadow-none cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-indigo-600  shadow-pink-500/10 hover:shadow-pink-500/20"
            }`}
            radius="lg"
          >
            {!isAvailable ? "Unavailable" : "Rent This Property Now"}
          </Button>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 text-center justify-center pt-2">
            <FaCheck className="text-green-500 shrink-0" />
            <span>Secure contract | Vetted landlords only</span>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <Card className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl shadow-none">
            <p className="text-red-400 font-semibold text-center text-sm">
              {user?.role ? `${user.role.toUpperCase()} role` : "Unauthenticated users"} cannot execute property bookings. Please log in as a Tenant.
            </p>
          </Card>
        </div>
      )}
    </Card>
  );
}