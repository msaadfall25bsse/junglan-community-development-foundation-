"use client";

import React from "react";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { FlipButton } from "@/components/common/FlipButton";

export function AmbulanceProgramSection() {
  return (
    <section
      className="py-20 border-y border-stone-border relative bg-surface-container-lowest"
      id="ambulance"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCD6I7WlDtDGbgXas3Tga8yr563mrZDs56treRbzfc1_cneYmwR4hxRH3CWptYUSkrYI6oDaKxE9lkV5MxBrjm16LEjVld5LrTo1BOPHsRd4YPAr6daZuwmiyLZFsDrYiHhVDPsRmAjX2regcl2vwuZ4BLEhVulUnnjiPf_HrtqzvyLKr4bdkq6-0yS8e37QB0tZ8D7pWitLfdrj1FJs7A3WEr0XWHf0IRXbjEa__sVCWQfFSZAel4f")',
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Light backdrop filter */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal variant="card" delay={50}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-error font-label-uppercase text-label-uppercase border border-red-200 mb-4 font-bold">
              <span className="material-symbols-outlined text-xs">emergency</span>
              FRONTLINE LIFELINE
            </div>
          </ScrollReveal>

          <ScrollReveal variant="heading" delay={150}>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mb-3">
              The only ambulance for four mountain villages.
            </h2>
            <p className="font-headline-md text-headline-md text-error font-semibold">
              462 patients in 2.5 years. One ambulance. No backup.
            </p>
          </ScrollReveal>
        </div>

        {/* Ambulance Image and Key Statistics Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <ScrollReveal variant="card" delay={200} className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden shadow-md bg-navy-deep h-[420px] md:h-[460px] group">
              <img
                alt="Unit AMB-01: High-traction rugged mountain patient transport van stationed in Junglan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkuiLguAFuhPaZdaGy60IxNos7aDRJyMtjWQkISzfxGUibXSTo0EvBDnkahG4epEaemByZOMbz5GzRw89mU3SY3ZYWUYbR-_N_6iYfzKAsRAHYmXyTGmg6Q9FkC-LvplI8x5Ir0O5_JRr_FLkhUBp06RVCbsEEJpvH-2SMiC2xydl7Vj7otcnTgQAaMa2ubSF7yB9myUJ7RT-ZdTMapoNHrPmDexMIVGHSI-aIdj9zRmUICsqyKngyRWhFe0q9boMKag"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/40 to-transparent p-4 flex items-end pointer-events-none">
                <div className="text-surface text-xs backdrop-blur-sm px-3 py-1.5 rounded-lg bg-navy-deep/60 border border-primary-container/60">
                  <span className="font-bold text-surface">Unit AMB-01:</span> High-traction rugged mountain patient transport van stationed in Junglan
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Statistics Strip (Border removed as requested) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <ScrollReveal variant="card" delay={250}>
              <div className="bg-surface-container-lowest/85 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <span className="text-stat-display font-stat-display text-primary font-extrabold">4</span>
                <span className="text-headline-sm font-headline-sm text-on-surface-variant font-semibold">villages served</span>
                <span className="text-xs text-outline mt-1 font-medium">Junglan, Battal ridge communities &amp; upper hamlets</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={350}>
              <div className="bg-surface-container-lowest/85 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <span className="text-stat-display font-stat-display text-primary font-extrabold">3,000</span>
                <span className="text-headline-sm font-headline-sm text-on-surface-variant font-semibold">people dependent</span>
                <span className="text-xs text-outline mt-1 font-medium">High-altitude agrarian mountain families</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="card" delay={450}>
              <div className="bg-red-50/85 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <span className="text-stat-display font-stat-display text-error font-extrabold">1</span>
                <span className="text-headline-sm font-headline-sm text-error font-semibold">ambulance in operation</span>
                <span className="text-xs text-error font-semibold mt-1">Single point of failure: zero secondary backup</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Narrative: Why this van exists & What it does */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Why this van exists */}
          <ScrollReveal variant="card" delay={200} className="lg:col-span-6">
            <div className="space-y-5 bg-surface-container-lowest/95 backdrop-blur-md p-8 rounded-2xl border border-stone-border shadow-sm h-full">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-xl text-error">history_edu</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Why this van exists</h3>
              </div>
              <div className="space-y-4 text-on-surface-variant font-body-md leading-relaxed">
                <p>
                  The founder’s deceased brother, a pre-medical student, died after a motorbike crash because no emergency transport reached him in time.
                </p>
                <p>
                  The nearest emergency hospital is 15–20 km away, in Mansehra or Abbottabad. The road takes 1–1.5 hours. Rain and landslides close it. Before 2021 there was no ambulance here. There is still only one.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* What it does */}
          <ScrollReveal variant="card" delay={300} className="lg:col-span-6">
            <div className="space-y-5 bg-surface-container-lowest/95 backdrop-blur-md p-8 rounded-2xl border border-stone-border shadow-sm h-full">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-xl text-secondary">task_alt</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">What it does</h3>
              </div>
              <ul className="space-y-3.5 text-on-surface-variant font-body-md">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">ring_volume</span>
                  <span>Emergency calls go to the driver. Day and night.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">medical_services</span>
                  <span>Oxygen, stretcher and first aid on board.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">local_taxi</span>
                  <span>Clinic trips when a private vehicle is out of reach.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">volunteer_activism</span>
                  <span>Transport of the deceased is free.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">vital_signs</span>
                  <span>200–250 calls a year. Most are maternity cases, high fevers, diabetes and heart trouble.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* The Gap & Financial Breakdown */}
        <ScrollReveal variant="card" delay={250}>
          <div className="bg-surface-container-lowest/95 backdrop-blur-md border border-stone-border rounded-2xl p-8 md:p-10 mb-16 shadow-md" id="gap-breakdown">
            <div className="max-w-2xl mb-8">
              <span className="font-label-uppercase text-label-uppercase text-outline font-bold">
                OPERATIONAL BALANCE SHEET
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold mt-1">
                Ambulance Service Funding Needs
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                Trip fees already cover part of the cost. The road takes the rest. (About 280 PKR = US$1)
              </p>
            </div>

            {/* Financial Breakdown Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-border">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-border text-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container-high/60">
                    <th className="py-3 px-4 font-bold">Annual Operational Line Item</th>
                    <th className="py-3 px-4 font-bold text-right">PKR Annual Amount</th>
                    <th className="py-3 px-4 font-bold text-right">Estimated USD Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border text-body-md text-on-surface">
                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-outline">local_gas_station</span>
                      Fuel
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">500,000–600,000 PKR</td>
                    <td className="py-3.5 px-4 text-right text-outline">~$1,785–$2,140</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-outline">build</span>
                      Maintenance and kit
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">200,000–250,000 PKR</td>
                    <td className="py-3.5 px-4 text-right text-outline">~$714–$890</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-outline">badge</span>
                      Driver and data staff
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">275,000–280,000 PKR</td>
                    <td className="py-3.5 px-4 text-right text-outline">~$980–$1,000</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 text-secondary">
                    <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      Fees collected
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">−300,000–350,000 PKR</td>
                    <td className="py-3.5 px-4 text-right">~−$1,070–$1,250</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 text-secondary">
                    <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">diversity_3</span>
                      Donations now
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">−50,000–150,000 PKR</td>
                    <td className="py-3.5 px-4 text-right">~−$178–$535</td>
                  </tr>
                  {/* Shortfall distinct visual styling */}
                  <tr className="bg-red-50 text-error font-bold border-t-2 border-red-300">
                    <td className="py-4 px-4 flex items-center gap-2 text-base">
                      <span className="material-symbols-outlined text-lg">warning</span>
                      Shortfall (Net Funding Deficit)
                    </td>
                    <td className="py-4 px-4 text-right text-base tracking-tight font-headline-sm">
                      about 600,000–800,000 PKR
                    </td>
                    <td className="py-4 px-4 text-right text-base font-headline-sm">
                      ~$2,140–$2,850
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Service Limitation Callout */}
            <div className="mt-8 p-6 bg-red-100/70 border border-red-200 rounded-xl flex items-center gap-4">
              <span className="material-symbols-outlined text-2xl text-error flex-shrink-0">crisis_alert</span>
              <p className="font-headline-sm text-headline-sm text-error font-bold">
                Two calls at once, and one of them is refused. That is what one vehicle means.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Ambulance Closing Statement & Immediate Stewardship Contacts */}
        <ScrollReveal variant="card" delay={250}>
          <div className="relative rounded-2xl overflow-hidden border border-primary-container text-surface p-8 md:p-12 bg-navy-deep">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAdgSE6e9s9K_KZAiTi8AuQjDrBRNzeOjGemw2SGkGRdWG77wkZSMwPtNvlKc1myL69c4JwSTNUS8txZlVaAfW23i7d5lZeYfDD4_Vrt33paShQPKM5X4EFwQwc70pTt86Qxh8S6gId2KeioxnuabP5Mr6ADkX8tEJYmxDKQsm7xgGUUzhdW0b-UgTGs8prSsKejXzOAlwYXnjoImdP4IX5Y_igwq5wAj2-Myp2tLNsCmQXsWa51_bl-2vkgHMSIPJ4w')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/85 to-navy-deep/75 backdrop-blur-[1px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-label-uppercase font-label-uppercase text-secondary-fixed font-bold tracking-wider">
                  STATION CALL FOR ACTION
                </span>
                <h3 className="font-headline-lg text-headline-lg text-surface font-semibold tracking-tight">
                  4 Villages. 3,000 People. 1 Ambulance. No Backup.
                </h3>
                <p className="font-body-lg text-body-lg text-surface-container-highest max-w-xl leading-relaxed">
                  Keep this ambulance on the road this year. Then a second vehicle, so two emergencies in one night do not compete.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-primary/90 border border-primary-container/80 text-xs text-surface-variant flex items-center gap-2 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-status-planned text-base">info</span>
                  <span className="font-medium">
                    [Bank transfer details &amp; donation account setup in progress under SECP compliance]
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-primary/80 backdrop-blur-sm border border-primary-container p-6 rounded-2xl space-y-4">
                <p className="font-label-uppercase text-label-uppercase text-secondary-fixed font-bold tracking-wider">
                  DIRECT CONTACT VALLEY DESK
                </p>
                <p className="text-body-sm text-surface-container-high font-medium">
                  Connect directly with our mountain operations coordinator via verified WhatsApp lines:
                </p>
                <div className="space-y-3 pt-2">
                  <a
                    className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 transition-all border border-surface-container-lowest/15 group"
                    href="https://wa.me/491715114247"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary-fixed">chat</span>
                      <span className="font-mono text-sm font-semibold tracking-wide text-surface">
                        +49 171 5114247
                      </span>
                    </div>
                    <span className="text-xs text-secondary-fixed font-medium group-hover:translate-x-1 transition-transform">
                      WhatsApp Liaison →
                    </span>
                  </a>

                  <a
                    className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 transition-all border border-surface-container-lowest/15 group"
                    href="https://wa.me/923016541825"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary-fixed">chat</span>
                      <span className="font-mono text-sm font-semibold tracking-wide text-surface">
                        +92 301 6541825
                      </span>
                    </div>
                    <span className="text-xs text-secondary-fixed font-medium group-hover:translate-x-1 transition-transform">
                      Field Operations Desk →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AmbulanceProgramSection;

