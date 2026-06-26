"use client";

import { Card } from "@heroui/react";
import { FaShieldAlt, FaHandshake, FaCoins, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
      title: "Verified Listings Only",
      description: "Every single property goes through a strict verification process by our admin panel before it goes live. No ghost listings, no scams.",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: <FaHandshake className="text-indigo-600 text-3xl" />,
      title: "Direct Owner Deals",
      description: "Connect directly with verified landlords and owners. Transparency is our core value, ensuring zero hidden broker fees or commission hassles.",
      bgColor: "bg-indigo-50"
    },
    {
      id: 3,
      icon: <FaCoins className="text-emerald-600 text-3xl" />,
      title: "Transparent Rent & Pricing",
      description: "No unexpected surprises. Real-time pricing models with clear daily, weekly, or monthly rent options tailored perfectly to your budget.",
      bgColor: "bg-emerald-50"
    },
    {
      id: 4,
      icon: <FaHeadset className="text-amber-600 text-3xl" />,
      title: "24/7 Dedicated Support",
      description: "Whether you are a tenant trying to book or an owner managing your properties, our dedicated helpline is always ready to assist you.",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-50/50 w-full border-y border-slate-100">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Our Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Choose Our Platform?
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            We bridge the gap between landlords and tenants with trust, transparency, and a seamless digital booking experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="p-6 md:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-4 group"
              shadow="none"
              isPressable
            >
              {/* Icon Container */}
              <div className={`p-4 ${feature.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-2 text-left">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}