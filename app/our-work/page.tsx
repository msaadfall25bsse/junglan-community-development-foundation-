"use client";

import React from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function OurWorkPage() {
  return (
    <PublicLayout>
      <main>
        {/* 1. OUR WORK HERO SECTION */}
        <section className="relative bg-surface-container-lowest border-b border-stone-border overflow-hidden py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-uppercase text-label-uppercase border border-stone-border">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  OUR WORK
                </div>
                <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold max-w-xl">
                  Practical Support. Stronger Communities.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  JCDF focuses on practical areas of community support and development. Our work includes ambulance services for patient transportation and agriculture as an area of local development. Through these areas, we aim to highlight community needs, improve access to essential support, and explore opportunities for sustainable progress.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    className="bg-primary hover:bg-navy-deep text-on-primary font-headline-sm text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-2"
                    href="#overview"
                  >
                    <span>Explore Our Work</span>
                    <span className="material-symbols-outlined text-lg" data-icon="south">
                      south
                    </span>
                  </a>
                  <Link
                    className="border border-primary text-primary hover:bg-surface-container-low font-headline-sm text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-150"
                    href="/contact"
                  >
                    Contact JCDF
                  </Link>
                </div>
                {/* Operational Verification Indicators */}
                <div className="pt-6 border-t border-stone-border flex flex-wrap items-center gap-6 text-body-sm text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg" data-icon="domain_verification">
                      domain_verification
                    </span>
                    <span>Direct Field Execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg" data-icon="account_balance">
                      account_balance
                    </span>
                    <span>SECP Reg. CUIN 0348227</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg" data-icon="pin_drop">
                      pin_drop
                    </span>
                    <span>District Mansehra, KP</span>
                  </div>
                </div>
              </div>

              {/* Hero Imagery Composition (Mountainous Terrain + Community Context) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-md bg-surface-container">
                  <img
                    alt="A breathtaking documentary-style photograph of the rugged, mist-covered mountain valleys of Mansehra in Khyber Pakhtunkhwa, Pakistan. A narrow winding mountain road traces the emerald green terraced hillsides under a soft morning sky."
                    className="w-full h-[440px] object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF45Otk75jFfXxiddGnF9yJBDgAVxOU8SRVVAptYTea8sEOAyEDtrHn_mrXt5SBAoLutTsUUyteQ8PGnUznIG6F0E62y39O-1Y_AsImzIHt7xX1yE8J8bnWYQmLCulVlZDu9PSt-6m1pLmoL0arOiOFG7TJ2ummR9XLsfEp0iayuTnPcTkK9xilt48NG-btlvCuPy1a5QQ996bWGuXnXP-aPXTgJaucfN9SrIO8lafpkovnYqpdXI59Zp_BfyWxyEJdg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. OUR WORK OVERVIEW */}
        <section className="py-20 bg-surface" id="overview">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="max-w-2xl mb-12">
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold mb-3">
                The Areas We Work In
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Our work focuses on practical community needs, including access to healthcare transportation and opportunities related to agriculture and rural development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature Card 1: Ambulance & Healthcare Support */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 hover:border-outline-variant hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-error font-label-uppercase text-label-uppercase font-bold">
                      <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                      Active Frontline Service
                    </span>
                    <span
                      className="material-symbols-outlined text-outline-variant group-hover:text-error transition-colors"
                      data-icon="ambulance"
                    >
                      ambulance
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-error transition-colors">
                    Ambulance &amp; Healthcare Support
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    JCDF’s ambulance service supports patient transportation to healthcare facilities. The service is especially relevant where reaching medical care by private transport can be difficult.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      24/7 Rapid Triage
                    </span>
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      Maternity &amp; Emergency
                    </span>
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      Oxygen Onboard
                    </span>
                  </div>
                </div>
                <div className="pt-8 mt-6 border-t border-stone-border">
                  <a
                    className="inline-flex items-center gap-2 text-primary font-headline-sm text-sm font-bold group-hover:text-error transition-colors"
                    href="#ambulance"
                  >
                    <span>Learn About Ambulance Services</span>
                    <span
                      className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>

              {/* Feature Card 2: Agriculture & Rural Development */}
              <div className="bg-surface-container-lowest border border-stone-border rounded-xl p-8 hover:border-outline-variant hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-uppercase text-label-uppercase font-bold">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Community Pillar
                    </span>
                    <span
                      className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors"
                      data-icon="agriculture"
                    >
                      agriculture
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold group-hover:text-secondary transition-colors">
                    Agriculture &amp; Rural Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Agriculture is an important part of rural life and local development. This area can highlight agricultural opportunities, local farming needs, responsible use of natural resources, and practical ideas that may support rural livelihoods.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      Soil Stewardship
                    </span>
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      Water Efficiency
                    </span>
                    <span className="text-xs bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded">
                      Terraced Agroforestry
                    </span>
                  </div>
                </div>
                <div className="pt-8 mt-6 border-t border-stone-border">
                  <a
                    className="inline-flex items-center gap-2 text-primary font-headline-sm text-sm font-bold group-hover:text-secondary transition-colors"
                    href="#agriculture"
                  >
                    <span>Explore Agriculture</span>
                    <span
                      className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AMBULANCE & PATIENT TRANSPORTATION SECTION (VERBATIM ACCURACY REQUIRED) */}
        <section className="py-20 bg-surface-container-lowest border-y border-stone-border" id="ambulance">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            {/* Header */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-error font-label-uppercase text-label-uppercase border border-red-200 mb-4">
                <span className="material-symbols-outlined text-xs" data-icon="emergency">
                  emergency
                </span>
                FRONTLINE LIFELINE
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold mb-3">
                The only ambulance for four mountain villages.
              </h2>
              <p className="font-headline-md text-headline-md text-error font-semibold">
                462 patients in 2.5 years. One ambulance. No backup.
              </p>
            </div>

            {/* Ambulance Image and Key Statistics Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-navy-deep h-[420px] md:h-[460px]">
                <img
                  alt="Unit AMB-01: High-traction rugged mountain patient transport van stationed in Junglan"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkuiLguAFuhPaZdaGy60IxNos7aDRJyMtjWQkISzfxGUibXSTo0EvBDnkahG4epEaemByZOMbz5GzRw89mU3SY3ZYWUYbR-_N_6iYfzKAsRAHYmXyTGmg6Q9FkC-LvplI8x5Ir0O5_JRr_FLkhUBp06RVCbsEEJpvH-2SMiC2xydl7Vj7otcnTgQAaMa2ubSF7yB9myUJ7RT-ZdTMapoNHrPmDexMIVGHSI-aIdj9zRmUICsqyKngyRWhFe0q9boMKag"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/40 to-transparent p-4 flex items-end pointer-events-none">
                  <div className="text-surface text-xs backdrop-blur-sm px-3 py-1.5 rounded bg-navy-deep/60 border border-primary-container/60">
                    <span className="font-bold text-surface">Unit AMB-01:</span> High-traction rugged mountain patient transport van stationed in Junglan
                  </div>
                </div>
              </div>

              {/* Statistics Strip (exact numbers) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                <div className="bg-surface-container-low border border-stone-border rounded-xl p-6 flex flex-col justify-center">
                  <span className="text-stat-display font-stat-display text-primary font-extrabold">4</span>
                  <span className="text-headline-sm font-headline-sm text-on-surface-variant font-semibold">
                    villages served
                  </span>
                  <span className="text-xs text-outline mt-1">Junglan, Battal ridge communities &amp; upper hamlets</span>
                </div>
                <div className="bg-surface-container-low border border-stone-border rounded-xl p-6 flex flex-col justify-center">
                  <span className="text-stat-display font-stat-display text-primary font-extrabold">3,000</span>
                  <span className="text-headline-sm font-headline-sm text-on-surface-variant font-semibold">
                    people dependent
                  </span>
                  <span className="text-xs text-outline mt-1">High-altitude agrarian mountain families</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col justify-center">
                  <span className="text-stat-display font-stat-display text-error font-extrabold">1</span>
                  <span className="text-headline-sm font-headline-sm text-error font-semibold">
                    ambulance in operation
                  </span>
                  <span className="text-xs text-error font-medium mt-1">Single point of failure: zero secondary backup</span>
                </div>
              </div>
            </div>

            {/* Narrative: Why this van exists & What it does */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              {/* Why this van exists */}
              <div className="lg:col-span-6 space-y-5 bg-surface-container-low p-8 rounded-xl border border-stone-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined text-xl text-error" data-icon="history_edu">
                    history_edu
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Why this van exists</h3>
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

              {/* What it does */}
              <div className="lg:col-span-6 space-y-5 bg-surface-container-low p-8 rounded-xl border border-stone-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined text-xl text-secondary" data-icon="task_alt">
                    task_alt
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">What it does</h3>
                </div>
                <ul className="space-y-3.5 text-on-surface-variant font-body-md">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5" data-icon="ring_volume">
                      ring_volume
                    </span>
                    <span>Emergency calls go to the driver. Day and night.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5" data-icon="medical_services">
                      medical_services
                    </span>
                    <span>Oxygen, stretcher and first aid on board.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5" data-icon="local_taxi">
                      local_taxi
                    </span>
                    <span>Clinic trips when a private vehicle is out of reach.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5" data-icon="volunteer_activism">
                      volunteer_activism
                    </span>
                    <span>Transport of the deceased is free.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg mt-0.5" data-icon="vital_signs">
                      vital_signs
                    </span>
                    <span>170–200 calls a year. Most are maternity cases, high fevers, diabetes and heart trouble.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Gap & Financial Breakdown */}
            <div className="bg-surface border border-stone-border rounded-xl p-8 md:p-10 mb-16" id="gap-breakdown">
              <div className="max-w-2xl mb-8">
                <span className="font-label-uppercase text-label-uppercase text-outline font-bold">
                  OPERATIONAL BALANCE SHEET
                </span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold mt-1">The gap</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  Trip fees already cover part of the cost. The road takes the rest. About 280 PKR = US$1.
                </p>
              </div>

              {/* Exact Financial Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-border text-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container-high/50">
                      <th className="py-3 px-4 font-bold">Annual Operational Line Item</th>
                      <th className="py-3 px-4 font-bold text-right">PKR Annual Amount</th>
                      <th className="py-3 px-4 font-bold text-right">Estimated USD Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-border text-body-md text-on-surface">
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-outline" data-icon="local_gas_station">
                          local_gas_station
                        </span>
                        Fuel
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold">500,000–600,000 PKR</td>
                      <td className="py-3.5 px-4 text-right text-outline">~$1,785–$2,140</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-outline" data-icon="build">
                          build
                        </span>
                        Maintenance and kit
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold">200,000–250,000 PKR</td>
                      <td className="py-3.5 px-4 text-right text-outline">~$714–$890</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-outline" data-icon="badge">
                          badge
                        </span>
                        Driver and data staff
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold">275,000–280,000 PKR</td>
                      <td className="py-3.5 px-4 text-right text-outline">~$980–$1,000</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 text-secondary">
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" data-icon="payments">
                          payments
                        </span>
                        Fees collected
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold">−300,000–350,000 PKR</td>
                      <td className="py-3.5 px-4 text-right">~−$1,070–$1,250</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 text-secondary">
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" data-icon="diversity_3">
                          diversity_3
                        </span>
                        Donations now
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold">−50,000–150,000 PKR</td>
                      <td className="py-3.5 px-4 text-right">~−$178–$535</td>
                    </tr>
                    {/* Shortfall distinct visual styling */}
                    <tr className="bg-red-50 text-error font-bold border-t-2 border-red-300">
                      <td className="py-4 px-4 flex items-center gap-2 text-base">
                        <span className="material-symbols-outlined text-lg" data-icon="warning">
                          warning
                        </span>
                        Shortfall (Net Funding Deficit)
                      </td>
                      <td className="py-4 px-4 text-right text-base tracking-tight font-headline-sm">
                        about 600,000–800,000 PKR
                      </td>
                      <td className="py-4 px-4 text-right text-base font-headline-sm">~$2,140–$2,850</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Service Limitation Callout */}
              <div className="mt-8 p-6 bg-red-100/70 border border-red-200 rounded-lg flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-error flex-shrink-0" data-icon="crisis_alert">
                  crisis_alert
                </span>
                <p className="font-headline-sm text-headline-sm text-error font-bold">
                  Two calls at once, and one of them is refused. That is what one vehicle means.
                </p>
              </div>
            </div>

            {/* Ambulance Closing Statement & Immediate Stewardship Contacts */}
            <div className="bg-navy-deep text-surface rounded-xl p-8 md:p-12 border border-primary-container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-label-uppercase font-label-uppercase text-secondary-fixed">
                    STATION CALL FOR ACTION
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-surface font-extrabold tracking-tight">
                    4 Villages. 3000 People. 1 Ambulance. No Backup.
                  </h3>
                  <p className="font-body-lg text-body-lg text-surface-container-highest max-w-xl">
                    Keep this ambulance on the road this year. Then a second vehicle, so two emergencies in one night do not compete.
                  </p>
                  {/* Donation Notice Banner */}
                  <div className="mt-4 p-4 rounded-lg bg-primary border border-primary-container text-xs text-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-planned text-base" data-icon="info">
                      info
                    </span>
                    <span className="font-medium">
                      [Bank transfer details &amp; donation account setup in progress under SECP compliance]
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-primary/80 border border-primary-container p-6 rounded-xl space-y-4">
                  <p className="font-label-uppercase text-label-uppercase text-secondary-fixed">
                    DIRECT CONTACT VALLEY DESK
                  </p>
                  <p className="text-body-sm text-surface-container-high">
                    Connect directly with our mountain operations coordinator via verified WhatsApp lines:
                  </p>
                  <div className="space-y-3 pt-2">
                    <a
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 transition-colors border border-surface-container-lowest/15"
                      href="https://wa.me/491715114247"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-secondary-fixed" data-icon="chat">
                          chat
                        </span>
                        <span className="font-mono text-sm font-semibold tracking-wide text-surface">
                          +49 171 5114247
                        </span>
                      </div>
                      <span className="text-xs text-secondary-fixed font-medium">WhatsApp Liaison →</span>
                    </a>
                    <a
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 transition-colors border border-surface-container-lowest/15"
                      href="https://wa.me/923016541825"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-secondary-fixed" data-icon="chat">
                          chat
                        </span>
                        <span className="font-mono text-sm font-semibold tracking-wide text-surface">
                          +92 301 6541825
                        </span>
                      </div>
                      <span className="text-xs text-secondary-fixed font-medium">Field Operations Desk →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AGRICULTURE & RURAL DEVELOPMENT SECTION (PROPOSED CIVIC COPY) */}
        <section className="py-20 bg-surface" id="agriculture">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            {/* Header */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-uppercase text-label-uppercase border border-secondary/20 mb-4">
                <span className="material-symbols-outlined text-xs" data-icon="eco">
                  eco
                </span>
                AGRICULTURE &amp; RURAL DEVELOPMENT
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold mb-4">
                Growing Opportunities in Rural Communities
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Agriculture plays an important role in rural communities, supporting livelihoods, local food systems, and connections to the land. Through agriculture as a development focus, JCDF can highlight local opportunities, understand community priorities, and explore practical approaches to rural development.
              </p>
              <div className="mt-6">
                <a
                  className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-lg font-headline-sm text-sm font-semibold hover:bg-olive-deep transition-all shadow-sm active:scale-95"
                  href="#agri-opportunities"
                >
                  <span>Discover Agriculture</span>
                  <span className="material-symbols-outlined text-base" data-icon="south">
                    south
                  </span>
                </a>
              </div>
            </div>

            {/* Supporting Rural Potential: Two-column Narrative & Landscape */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-stone-border">
              <div className="lg:col-span-6 space-y-4">
                <span className="font-label-uppercase text-label-uppercase text-secondary font-bold">
                  COMMUNITY-ROOTED STEWARDSHIP
                </span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Supporting Rural Potential
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Junglan’s microclimate and terraced mountain topography hold distinct agricultural possibilities. Centuries of indigenous terrace farming have shaped the slopes, yet communities face mounting challenges from climate volatility, unpredictable rainfall, and road access barriers for harvest transport.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  JCDF works with valley growers to document micro-watersheds, test drought-resistant fruit and olive cultivars, and preserve organic soil microbiology without introducing prohibitive industrial overhead.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-lg overflow-hidden border border-stone-border shadow-sm">
                  <img
                    alt="An expansive panoramic view of lush green terraced mountain farmland in northern Pakistan, showing traditional stone irrigation channels and fruit groves under gentle morning sunlight."
                    className="w-full h-72 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxoX5qSPebcoIPrbuESZUY8_7j2mEubRmbJ3iJ13gemyopPJF2xIMkGVsS5XUzmGN_k8-nPaL6pUKkgJAyhp1cqO_pbiHyaWZHK21U-DKxVH3XO3byO-4QtqW2zcdoy4Q64lR6kx6Q_ej48oZmcG6Un0d9eY6Zc2s8_d52w9pkOWKfhjgFWMfsYLxA8etO51IGoO7Z129kc1yaUHfgk5BZsO7Mho_ckF5HFmuW6R2hOA2PavEir4Mm"
                  />
                </div>
              </div>
            </div>

            {/* Areas of Agricultural Opportunity (4 balanced cards) */}
            <div className="mb-16" id="agri-opportunities">
              <div className="mb-8">
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Areas of Agricultural Opportunity
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Four grounded development pathways identified through initial valley consultations:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Sustainable Farming */}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-stone-border flex flex-col justify-between hover:border-secondary transition-colors group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined" data-icon="compost">
                        compost
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      Sustainable Farming
                    </h4>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed">
                      Explore practical farming approaches that consider soil health, efficient resource use, and the long-term needs of rural land.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                    <span>Soil Longevity</span>
                    <span className="material-symbols-outlined text-xs" data-icon="check_circle">
                      check_circle
                    </span>
                  </div>
                </div>

                {/* Card 2: Crop and Seasonal Planning */}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-stone-border flex flex-col justify-between hover:border-secondary transition-colors group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined" data-icon="calendar_month">
                        calendar_month
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      Crop &amp; Seasonal Planning
                    </h4>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed">
                      Share general information about seasonal planning, crop selection, and the importance of understanding local growing conditions.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                    <span>Climate Adaptation</span>
                    <span className="material-symbols-outlined text-xs" data-icon="check_circle">
                      check_circle
                    </span>
                  </div>
                </div>

                {/* Card 3: Water and Natural Resources */}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-stone-border flex flex-col justify-between hover:border-secondary transition-colors group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined" data-icon="water_drop">
                        water_drop
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      Water &amp; Natural Resources
                    </h4>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed">
                      Highlight the role of responsible water use and natural resource management in supporting agricultural activities.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                    <span>Watershed Guard</span>
                    <span className="material-symbols-outlined text-xs" data-icon="check_circle">
                      check_circle
                    </span>
                  </div>
                </div>

                {/* Card 4: Rural Livelihood Opportunities */}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-stone-border flex flex-col justify-between hover:border-secondary transition-colors group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined" data-icon="trending_up">
                        trending_up
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      Rural Livelihood Opportunities
                    </h4>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed">
                      Explore ideas that may help rural communities understand agricultural opportunities and strengthen local livelihoods over time.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-border/60 mt-4 text-xs font-semibold text-secondary flex items-center gap-1">
                    <span>Economic Resilience</span>
                    <span className="material-symbols-outlined text-xs" data-icon="check_circle">
                      check_circle
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooted in Local Needs: Wide Visual & Consultation Focus */}
            <div className="relative rounded-xl overflow-hidden border border-stone-border bg-primary-container text-surface p-8 md:p-12 mb-12">
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="text-label-uppercase font-label-uppercase text-secondary-fixed">
                  COMMUNITY CONSULTATION
                </span>
                <h3 className="font-headline-lg text-headline-lg text-surface font-bold tracking-tight">
                  Rooted in Local Needs
                </h3>
                <p className="font-body-md text-body-md text-surface-container-highest leading-relaxed">
                  Development cannot be dictated from afar. JCDF conducts regular village jirga consultations with mountain smallholders, elder custodians of terraced waterways, and women involved in seasonal harvesting. By aligning directly with valley realities, our agrarian initiatives remain modest, durable, and free from administrative bloat.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    className="bg-surface text-primary hover:bg-stone-white font-headline-sm text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2"
                    href="/contact"
                  >
                    <span>Explore Rural Development Opportunities</span>
                    <span className="material-symbols-outlined text-base" data-icon="north_east">
                      north_east
                    </span>
                  </Link>
                  <Link
                    className="border border-surface/40 text-surface hover:bg-surface/10 font-headline-sm text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    href="/contact"
                  >
                    Contact JCDF
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FUTURE DEVELOPMENT INITIATIVES SECTION */}
        <section className="py-16 bg-surface-container-lowest border-y border-stone-border" id="future-initiatives">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin">
            <div className="bg-surface-container-low border border-stone-border rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-status-planned text-label-uppercase font-bold border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-status-planned"></span>
                    Planned Initiative
                  </span>
                  <span className="text-xs text-outline font-medium">In Pipeline Scoping</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Future Development Initiatives
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  JCDF’s future development priorities may include construction-related initiatives as plans and project details are confirmed. This section will communicate verified information about the purpose, scope, and progress of those initiatives.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  className="border border-primary text-primary hover:bg-surface-container font-headline-sm text-sm font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  href="/contact"
                >
                  <span>Learn More</span>
                  <span className="material-symbols-outlined text-base" data-icon="info">
                    info
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMMUNITY-FOCUSED CALL TO ACTION */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-margin-sm md:px-margin text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-surface mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl" data-icon="handshake">
                  handshake
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                Working Toward a Stronger Community
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Explore JCDF’s work in patient transportation and rural development. Learn more about the foundation’s priorities and contact us for further information.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  className="bg-primary hover:bg-navy-deep text-on-primary font-headline-sm text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all active:scale-95"
                  href="/about"
                >
                  About JCDF
                </Link>
                <Link
                  className="border border-primary text-primary hover:bg-surface-container-low font-headline-sm text-sm font-semibold px-6 py-3 rounded-lg transition-all"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
