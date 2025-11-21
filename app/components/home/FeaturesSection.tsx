"use client";

import { motion } from "framer-motion";
import { Zap, Search, Edit3, Palette } from "lucide-react";
import type { FeaturesContent } from "@/lib/contentful";
import { ImageWithFallback } from "@/test/src/components/figma/ImageWithFallback";

const featureIcons = [Zap, Search, Edit3, Palette];

interface FeaturesSectionProps {
  content: FeaturesContent;
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
    green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
    orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
  };

  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-slate-50">
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

        {/* Features Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {content.items.map((feature, index) => {
            const Icon = featureIcons[index];
            const colors = colorClasses[feature.color];

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 ${colors.bg} ${colors.text} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${colors.bg} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
