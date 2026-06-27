"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Anika Rahman",
      role: "Tenant (Gulshan)",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "Finding a verified apartment in Gulshan was incredibly seamless. The direct deal with the landlord saved me from heavy broker fees. Highly recommended!"
    },
    {
      id: 2,
      name: "Tanvir Ahmed",
      role: "Tenant (Dhanmondi)",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "The booking process through Stripe payment gateway was secure and fast. The entire system transparency is unmatched compared to others."
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      role: "Tenant (Uttara)",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "I rented a studio apartment for a week. Real-time flexible pricing models perfectly matched my budget. The 24/7 support team guided me perfectly."
    },
    {
      id: 4,
      name: "Zayan Malik",
      role: "Tenant (Banani)",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "Amazing UX! Properties are 100% genuine and verified by the admin panel. Love the favorites listing and instant booking modal workflow."
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-50/50 w-full border-b border-slate-100">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            What Our Tenants Say
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Discover real experiences from tenants who found their perfect rental spaces through our secure and verified marketplace.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card 
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between relative group overflow-hidden"
                shadow="none"
              >
                <div className="absolute top-4 right-4 text-slate-100 group-hover:text-indigo-50/70 transition-colors duration-300 pointer-events-none">
                  <FaQuoteLeft size={30} />
                </div>

                <div className="space-y-4 z-10">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar key={index} className="text-amber-500 text-sm" />
                    ))}
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-left font-normal italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* 💡 ফিক্স: Avatar এর বদলে স্ট্যান্ডার্ড প্রফেশনাল রাউন্ডেড img ট্যাগ */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100/80 z-10">
                  <img 
                    src={review.img} 
                    alt={review.name}
                    className="w-10 h-10 object-cover rounded-full border border-slate-200"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                      {review.name}
                    </h4>
                    <p className="text-slate-400 text-xs font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}