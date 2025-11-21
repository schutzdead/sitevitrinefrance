"use client";

import { motion } from "framer-motion";
import { Code2, Mail, Phone, Heart } from "lucide-react";
import type { FooterContent } from "@/lib/contentful";

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-[var(--brand-blue)] rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl">{content.tagline.split(" ")[0]}</span>
          </motion.div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {content.description}
          </p>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="mb-4 text-white">{content.quickLinks.title}</h3>
            <ul className="space-y-2">
              {content.quickLinks.items.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="mb-4 text-white">{content.services.title}</h3>
            <ul className="space-y-2">
              {content.services.items.map((service, index) => (
                <li key={index} className="text-slate-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="mb-4 text-white">{content.contact.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={`mailto:\${content.contact.email}`}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={`tel:\${content.contact.phone}`}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {content.contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-400 text-sm">{content.copyright}</p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>{content.madeWith}</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Next.js</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
