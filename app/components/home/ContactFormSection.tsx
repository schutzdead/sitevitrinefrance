"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import type { FormContent } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormSectionProps {
  content: FormContent;
}

export function ContactFormSection({ content }: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project: "",
    inspiration: "",
    colors: "",
    additional: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setSubmitStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          project: "",
          inspiration: "",
          colors: "",
          additional: "",
        });
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitStatus === "success") {
    return (
      <section id="contact" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 border-2 border-green-200 shadow-xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" strokeWidth={2} />
            </motion.div>
            <h2 className="mb-4 text-slate-900">{content.successTitle}</h2>
            <p className="text-lg text-slate-600 mb-8">{content.successMessage}</p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Envoyer une nouvelle demande
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto">
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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">
                {content.nameLabel}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={content.namePlaceholder}
                className="w-full"
              />
            </div>

            {/* Email & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  {content.emailLabel}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={content.emailPlaceholder}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-700">
                  {content.companyLabel}
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={content.companyPlaceholder}
                  className="w-full"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">
                {content.phoneLabel}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={content.phonePlaceholder}
                className="w-full"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="project" className="text-slate-700">
                {content.projectLabel}
              </Label>
              <Textarea
                id="project"
                name="project"
                required
                value={formData.project}
                onChange={handleChange}
                placeholder={content.projectPlaceholder}
                className="w-full min-h-[120px] resize-y"
              />
            </div>

            {/* Inspiration URLs */}
            <div className="space-y-2">
              <Label htmlFor="inspiration" className="text-slate-700">
                {content.inspirationLabel}
              </Label>
              <Input
                id="inspiration"
                name="inspiration"
                type="text"
                value={formData.inspiration}
                onChange={handleChange}
                placeholder={content.inspirationPlaceholder}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label htmlFor="colors" className="text-slate-700">
                {content.colorsLabel}
              </Label>
              <Input
                id="colors"
                name="colors"
                type="text"
                value={formData.colors}
                onChange={handleChange}
                placeholder={content.colorsPlaceholder}
                className="w-full"
              />
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="additional" className="text-slate-700">
                {content.additionalLabel}
              </Label>
              <Textarea
                id="additional"
                name="additional"
                value={formData.additional}
                onChange={handleChange}
                placeholder={content.additionalPlaceholder}
                className="w-full min-h-[100px] resize-y"
              />
            </div>

            {/* Required note */}
            <p className="text-sm text-slate-500">{content.requiredNote}</p>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white group"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {content.submitting}
                </>
              ) : (
                <>
                  {content.submitButton}
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm">{content.errorMessage}</p>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
