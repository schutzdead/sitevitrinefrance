"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Headphones, RefreshCw } from "lucide-react";
import type { FinalCtaContent } from "@/lib/contentful";
import { Button } from "@/components/ui/button";

interface FinalCtaSectionProps {
  content: FinalCtaContent;
}

export function FinalCtaSection({ content }: FinalCtaSectionProps) {
  const trustBadges = [
    { icon: Clock, text: content.trustBadges[0] },
    { icon: RefreshCw, text: content.trustBadges[1] },
    { icon: Headphones, text: content.trustBadges[2] },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-blue-dark)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--brand-slate)]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm mb-6">
            {content.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight uppercase"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {content.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto"
        >
          {content.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <Button
            size="lg"
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-[var(--brand-blue)] hover:bg-blue-50 group"
          >
            {content.ctaButton}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.4 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 flex-wrap"
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20"
              >
                <Icon className="w-5 h-5 text-blue-200 flex-shrink-0" strokeWidth={2} />
                <span className="text-sm text-white whitespace-nowrap">{badge.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
