"use client";

import React from "react";

export function CommitmentSection() {
  return (
    <section className="py-14 md:py-18 bg-surface-container-lowest border-b border-stone-border">
      <div className="max-w-5xl mx-auto px-margin-sm md:px-margin">
        <div className="border border-stone-border rounded-2xl p-8 md:p-12 bg-surface-container-low text-center">
          <div className="w-12 h-12 rounded-full bg-secondary-fixed/60 text-secondary mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[24px]">balance</span>
          </div>
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
            INSTITUTIONAL PLEDGE
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-4">
            A Commitment to Practical Community Support
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-6 leading-relaxed">
            Janglan Community Development Foundation is grounded in genuine stewardship. We commit to transparent communication, responsible management of every rupee entrusted to our care, and steadfast adherence to SECP non-profit standards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-body-sm text-on-surface-variant font-medium">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              SECP CUIN: 0348227
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">assignment</span>
              Annual Financial Audits
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">public</span>
              100% On-Ground Valley Focus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommitmentSection;
