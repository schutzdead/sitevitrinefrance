"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroContent } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-blue)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--brand-slate)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(70, 143, 175, 0.1)',
                color: 'var(--brand-blue)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">{content.badge}</span>
            </motion.div>

            {/* Main Title - Big and impactful */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content.title}{" "}
              <span className="text-[var(--brand-blue)]">
                {content.titleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {content.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white group"
              >
                {content.ctaPrimary}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.querySelector("#process");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-slate-300 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
              >
                {content.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                className="w-full h-auto"
                width={800}
                height={800}
              />
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200"
            >
              <div className="text-2xl">⚡</div>
              <div className="text-xs text-slate-600">Ultra-rapide</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200"
            >
              <div className="text-2xl">🎨</div>
              <div className="text-xs text-slate-600">Design unique</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
