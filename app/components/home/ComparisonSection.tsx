"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, Check } from "lucide-react";
import type { ComparisonContent } from "@/lib/contentful";
import Image from "next/image";

interface ComparisonSectionProps {
  content: ComparisonContent;
}

export function ComparisonSection({ content }: ComparisonSectionProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
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

        {/* Comparison Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Before/After Images with Slider */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
            {/* Before Image (Background) */}
            <div className="absolute inset-0">
              <Image
                src={content.beforeImage.src}
                                width={800}
                height={800}
                alt={content.beforeImage.alt}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay with X */}
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                <div className="text-center">
                  <X className="w-20 h-20 text-red-500 mx-auto mb-4" strokeWidth={3} />
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full">
                    {content.beforeLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* After Image (Overlay with clip-path) */}
            <div
              className="absolute inset-0 transition-all duration-75"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <Image
                              width={800}
                height={800}
                src={content.afterImage.src}
                alt={content.afterImage.alt}
                className="w-full h-full object-cover"
              />
              {/* Light overlay with Check */}
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <Check className="w-20 h-20 text-green-500 mx-auto mb-4" strokeWidth={3} />
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full">
                    {content.afterLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize">
                <div className="flex gap-1">
                  <div className="w-0.5 h-6 bg-slate-400" />
                  <div className="w-0.5 h-6 bg-slate-400" />
                </div>
              </div>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Comparison slider"
            />
          </div>

          {/* Comparison Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Points */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-slate-900">{content.beforeTitle}</h3>
              </div>
              <ul className="space-y-3">
                {content.beforePoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-slate-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After Points */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-slate-900">{content.afterTitle}</h3>
              </div>
              <ul className="space-y-3">
                {content.afterPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-slate-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
