"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { DONATION_TIERS } from "@/data/homepage-data";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  defaultProject = "All Foundation Initiatives",
}) => {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(60);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const effectiveProject = selectedProject || defaultProject || "All Foundation Initiatives";

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const currentTierInfo = DONATION_TIERS.find((t) => t.amount === selectedAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close donation modal"
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-red-300" />
            <span>Support Our Community Mission</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white">Make a Lasting Difference</h2>
          <p className="text-sky-100 text-sm mt-1">
            Your generous contribution directly funds healthcare emergency services and sustainable agriculture.
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Thank You, {name || "Generous Supporter"}!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Your pledge of <strong className="text-slate-900">${activeAmount} ({frequency})</strong> towards{" "}
                <strong className="text-sky-700">{effectiveProject}</strong> has been registered in our community pledge book.
              </p>
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-left text-xs text-slate-700 space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span>Designated Cause:</span>
                  <span className="text-slate-900">{effectiveProject}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Pledge Frequency:</span>
                  <span className="text-slate-900 uppercase">{frequency}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Donor Email:</span>
                  <span className="text-slate-900">{email || "donor@example.org"}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                * Note: This is the public phase demonstration. A confirmation receipt draft has been formatted for your records.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors shadow-md"
              >
                Close & Return to Homepage
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Frequency Selector */}
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    frequency === "one-time"
                      ? "bg-white text-sky-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  One-Time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    frequency === "monthly"
                      ? "bg-white text-sky-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  Monthly Supporter
                </button>
              </div>

              {/* Amount Preset Buttons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {DONATION_TIERS.map((tier) => {
                    const isSelected = !isCustom && selectedAmount === tier.amount;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setIsCustom(false);
                        }}
                        className={`relative py-3 px-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-sky-600 bg-sky-50 text-sky-900 font-bold ring-2 ring-sky-500/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                        }`}
                      >
                        {tier.isPopular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-red-600 text-white rounded-full">
                            Popular
                          </span>
                        )}
                        <div className="text-lg">${tier.amount}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustom(true);
                      }}
                      onFocus={() => setIsCustom(true)}
                      className={`w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border transition-colors outline-none ${
                        isCustom
                          ? "border-sky-600 ring-2 ring-sky-500/20"
                          : "border-slate-200 focus:border-sky-600"
                      }`}
                      min="5"
                    />
                  </div>
                </div>

                {/* Tier Impact Note */}
                {!isCustom && currentTierInfo && (
                  <div className="mt-2.5 p-2.5 bg-sky-50/70 rounded-lg border border-sky-100 flex items-start gap-2 text-xs text-sky-800">
                    <Sparkles className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Impact: </strong>
                      {currentTierInfo.impactNote}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Designate Your Support
                </label>
                <select
                  value={effectiveProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-sky-600 outline-none"
                >
                  <option value="All Foundation Initiatives">All Foundation Initiatives (Where needed most)</option>
                  <option value="Healthcare & Ambulance Project">Healthcare & Ambulance Project</option>
                  <option value="Olive / Zaitoon Agriculture Project">Olive / Zaitoon Agriculture Project</option>
                  <option value="Community Infrastructure Development">Community Infrastructure Development</option>
                </select>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-600 outline-none"
                  />
                </div>
              </div>

              {/* Trust & Guarantee Note */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>100% of your gift is dedicated directly to project execution and community aid.</span>
              </div>

              {/* Submit CTA Button - Red Accentuated Primary */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 group"
              >
                <span>Complete Pledge of ${activeAmount || 0}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
