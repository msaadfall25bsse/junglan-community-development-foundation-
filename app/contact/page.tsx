"use client";

import React, { useState, useEffect } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { FOUNDATION_INFO } from "@/data/content";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState(FOUNDATION_INFO);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "GENERAL_INQUIRY",
    message: "",
  });

  const [status, setStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContactInfo((prev) => ({
            ...prev,
            hotline: data.data.emergencyHotline || prev.hotline,
            email: data.data.officialEmail || prev.email,
          }));
        }
      })
      .catch((err) => console.error("Error loading contact settings:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus("ERROR");
      setErrorMessage("Please complete all required fields (Name, Phone, and Message).");
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus("ERROR");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("LOADING");

    // Simulated clean submission delay
    setTimeout(() => {
      setStatus("SUCCESS");
      setShowToast(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "GENERAL_INQUIRY",
        message: "",
      });
    }, 700);
  };

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <SectionHeader
            badge="Get in Touch"
            badgeVariant="sky"
            title="Connect with Junglan Community Development Foundation"
            subtitle="Whether you need emergency ambulance assistance, wish to partner on olive agriculture, or have general questions, our team is here to assist you."
          />
        </Container>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Official Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* Emergency Hotline Alert Box */}
              <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span>24/7 Emergency Ambulance Helpline</span>
                </div>
                <div className="text-2xl font-black text-slate-900 mb-2">
                  {contactInfo.hotline}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  For urgent patient medical transfers, maternal care, or road trauma in Junglan and District Mansehra.
                </p>
                <a
                  href={`tel:${contactInfo.hotline}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Dispatch Desk</span>
                </a>
              </div>

              {/* Office Location Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700 mt-1 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Main Office</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700 mt-1 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-xs text-sky-700 hover:underline mt-0.5 block"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700 mt-1 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Office Hours</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday – Saturday: 9:00 AM – 5:00 PM<br />
                      <span className="font-semibold text-slate-800">
                        (Ambulance Hotline is open 24/7)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
                <span>We respect your privacy. Messages are kept confidential.</span>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-8">
                  Fill out the details below and our team will respond within 24 hours.
                </p>

                {/* Success Confirmation Banner */}
                {status === "SUCCESS" && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Thank You! Your message has been received.</div>
                      <div>A foundation representative will contact you via phone or email shortly.</div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {status === "ERROR" && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 text-xs">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Submission Error</div>
                      <div>{errorMessage}</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Muhammad Bilal"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Contact Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Subject / Department
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900"
                      >
                        <option value="GENERAL_INQUIRY">General Inquiry</option>
                        <option value="HEALTHCARE_AMBULANCE">Healthcare & Ambulance Service</option>
                        <option value="OLIVE_AGRICULTURE">Olive Agriculture Program</option>
                        <option value="DONATION_SUPPORT">Donation / Banking Query</option>
                        <option value="VOLUNTEER">Volunteer Opportunities</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your inquiry or requirements here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={status === "LOADING"}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Inquiry Sent Successfully!"
        message="Thank you for reaching out. A foundation representative will contact you shortly."
        type="success"
      />
    </PublicLayout>
  );
}
