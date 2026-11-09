"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";

const DONATION_FAQS = [
  {
    question: "How can I donate to JCDF?",
    answer: "You can contribute securely using direct Bank Transfer (IBAN/RAAST), mobile wallet services (JazzCash, Easypaisa), or via international wire remittances. Choose your preferred channel and amount in our secure form above.",
  },
  {
    question: "Can I make a one-time donation?",
    answer: "Yes. By default, all contributions on our platform are processed as one-time donations without any recurring commitment. You can support our work whenever you choose.",
  },
  {
    question: "Can I contribute monthly?",
    answer: "Yes, monthly contributions can be selected during checkout. Monthly donations are configured through standing payment orders or supported card/wallet recurring billing when active on your provider.",
  },
  {
    question: "Which payment methods are available?",
    answer: "We offer Direct Bank Transfer (IBAN), State Bank Raast Instant Pay, JazzCash, Easypaisa, and Debit/Credit Card (Visa/Mastercard tokenized gateway). All methods credit our registered institutional account.",
  },
  {
    question: "Can I donate to a specific community initiative?",
    answer: "Yes. In the 'Choose Where Your Support Goes' section, you can designate your contribution specifically for Healthcare Support, Ambulance & Patient Transportation, Mountain Community Relief, or General Community Support.",
  },
  {
    question: "Will I receive a donation receipt?",
    answer: "Yes. An instant confirmation code is provided upon submission, and our administrative desk issues an official digital receipt with your transaction reference once bank reconciliation is complete.",
  },
  {
    question: "How is my donation information protected?",
    answer: "We strictly follow our privacy guidelines. Personal information is encrypted, never shared with third parties, and raw payment card numbers are never stored on our website. You may also choose to remain anonymous.",
  },
  {
    question: "How can I contact JCDF regarding my donation?",
    answer: "You can reach our Valley Desk at +92 301 6541825, or message our dedicated WhatsApp coordinator directly at +49 171 5114247 for any donation inquiries or receipt queries.",
  },
];

export function DonationFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 lg:py-16 bg-surface-container-lowest border-b border-stone-border relative overflow-hidden" id="donation-faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <ScrollReveal variant="heading" delay={100}>
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest text-xs font-bold block mb-1">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary font-semibold">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text" delay={150}>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Find clear answers to common questions regarding donations, payment channels, privacy, and receipts.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {DONATION_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.question} variant="card" delay={100 + idx * 40}>
                <div className="rounded-xl border border-stone-border bg-surface overflow-hidden transition-all duration-300 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-slate-50 transition-colors"
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
export default DonationFaqSection;

