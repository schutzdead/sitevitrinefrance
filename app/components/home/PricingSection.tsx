"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Shield } from "lucide-react";
import type { PricingContent } from "@/lib/contentful";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  content: PricingContent;
}

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm mb-4">
            {content.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 tracking-tight uppercase" style={{ fontFamily: 'var(--font-heading)' }}>{content.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--brand-blue)]/30 to-[var(--brand-blue-dark)]/30 rounded-3xl opacity-20 blur-2xl" />

          <div className="relative bg-white rounded-2xl p-8 md:p-12 border-2 border-slate-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left: Price */}
              <div className="lg:col-span-2 text-center lg:text-left lg:border-r lg:border-slate-200 lg:pr-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="inline-flex items-baseline gap-2 mb-2">
                    <span className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-blue-dark)]">
                      {content.priceAmount}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6">{content.priceLabel}</p>

                  <Button
                    size="lg"
                    onClick={() => {
                      const element = document.querySelector("#contact");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white group"
                  >
                    {content.ctaButton}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>

              {/* Right: Included items */}
              <div className="lg:col-span-3">
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {content.includedItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
