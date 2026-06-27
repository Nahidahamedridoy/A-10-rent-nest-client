"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I know if a property listing is real?", a: "Every property listed on our platform goes through a strict manual verification process by our system admins before status becomes approved." },
    { q: "Are there any hidden broker commission fees?", a: "No, we believe in complete transparency. Our system directly connects tenants with verified property owners with zero intermediate broker costs." },
    { q: "What happens if an owner rejects my booking request?", a: "If an owner rejects your booking request, the booking status updates immediately, and your reservation fee is securely refunded back to your account within 3-5 business days." },
  ];

  return (
    <section className="py-20 px-6 bg-white w-full border-b border-slate-100">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:bg-slate-100/50 transition-colors"
              >
                <span className="text-sm md:text-base">{faq.q}</span>
                <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-indigo-600" : ""}`} />
              </button>
              
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-5 text-slate-500 text-xs md:text-sm leading-relaxed border-t border-slate-200/50 pt-2"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}