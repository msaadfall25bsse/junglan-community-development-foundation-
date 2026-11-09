"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const FAQS = [
  {
    question: "Is Junglan Community Development Foundation legally registered?",
    answer: "Yes. JCDF is legally incorporated under the Securities and Exchange Commission of Pakistan (SECP) under Corporate Universal Identification Number (CUIN: 0348227) as an authorized non-profit community development entity.",
  },
  {
    question: "How do I know my donation is actually spent on mountain relief?",
    answer: "We uphold a strict 100% direct frontline allocation mandate. Fuel receipts, ambulance GPS mileage logs, and nursery sapling registers are recorded post-run and reconciled monthly against official bank statements. All summaries are openly published in our Impact & Audits section.",
  },
  {
    question: "Can I donate Zakat, Sadaqah, or Lillah?",
    answer: "Yes. Contributions intended for emergency medical transport for poor and indigent mountain patients who cannot afford commercial vehicle transport qualify for Zakat and Sadaqah under orthodox welfare provisions. You can specify this in the transfer note.",
  },
  {
    question: "How can overseas Pakistani and international donors contribute?",
    answer: "Overseas donors can send remittances directly via our official bank IBAN with SWIFT code (MEZNPKKA), or connect via our international WhatsApp coordinator (+49 171 5114247) for assistance with wire routing and receipts.",
  },
  {
    question: "Will I receive an official receipt for my contribution?",
    answer: "Yes. After you submit the transaction notification form or message your transfer slip to our WhatsApp desk, our accounting team issues a stamped digital acknowledgment receipt reflecting your transaction reference.",
  },
];

export function DonationTransparencyFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-[48px] lg:py-[64px] bg-surface border-b border-stone-border relative overflow-hidden" id="transparency-faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block">
              FREQUENT QUESTIONS &amp; FIDUCIARY GOVERNANCE
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-semibold">
              Frequently Asked Questions About Donations
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Transparent answers regarding legal registration, fund disbursement, tax compliance, and tracking protocols.
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.question} variant="card" delay={100 + idx * 50}>
                <div className="rounded-xl border border-stone-border bg-surface-container-lowest overflow-hidden transition-all duration-300 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-surface-container-low transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-secondary text-base transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-stone-border/40 font-body-sm">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default DonationTransparencyFaqSection;

