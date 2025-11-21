"use client";

import { motion } from "framer-motion";
import { MessageSquare, Layout, Code, Rocket } from "lucide-react";
import type { ProcessContent } from "@/lib/contentful";

const stepIcons = [MessageSquare, Layout, Code, Rocket];

interface ProcessSectionProps {
  content: ProcessContent;
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section id="process" className="py-16 md:py-24 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--brand-blue)]/20 text-white rounded-full text-sm mb-4">
            {content.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight uppercase" style={{ fontFamily: 'var(--font-heading)' }}>{content.title}</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.steps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                {/* Connection line */}
                {index < content.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                )}

                <div className="relative bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group h-full">
                  {/* Number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
