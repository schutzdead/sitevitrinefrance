"use client";

import { motion } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { useState } from "react";
import type { HeaderContent } from "@/lib/contentful";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  content: HeaderContent;
}

export function Header({ content }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-[var(--brand-blue)] rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl text-slate-900">{content.logo}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {content.navItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                className="text-slate-600 hover:text-[var(--brand-blue)] transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white"
            >
              {content.ctaButton}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[var(--brand-blue)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-4 pb-2 border-t border-slate-200 mt-4"
          >
            <div className="flex flex-col gap-4">
              {content.navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-left text-slate-600 hover:text-blue-600 transition-colors py-2"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                {content.ctaButton}
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
