import React from "react";

export function AboutOriginSection() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-b border-stone-border" id="about-origin">
      <div className="max-w-7xl mx-auto px-[10px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* 3-Image Mosaic: Fluid and touch-friendly (100% exact from index.html) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Main Community Card (Native ~1.42:1 aspect ratio matching 595x418 image) */}
            <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-md bg-[#0b1b3d] group">
              <div className="relative aspect-[595/418] overflow-hidden">
                <img
                  alt="Community solidarity paper cutouts holding hands"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  src="/community-paper-cutouts.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <div className="text-[10px] sm:text-xs text-secondary-fixed uppercase font-label-uppercase tracking-wider font-bold">
                    Grassroots Unity
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-surface">
                    Building Resilience Shoulder-to-Shoulder
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Cards (Native 16/9 aspect ratio matching 512x288 images exactly) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-[10px]">
              <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-[#121926] group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    alt="Mountain summit sunrise celebrating community silhouettes"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    src="/shared-hope-summit.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center gap-1.5 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                    <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">wb_sunny</span>
                    <span className="truncate">Shared Hope &amp; Vision</span>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-border shadow-sm bg-[#131d27] group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    alt="Hazara mountain valley landscape around Junglan base camp"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    src="/junglan-valley-terrain.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center gap-1.5 text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                    <span className="material-symbols-outlined text-xs sm:text-sm text-secondary-fixed">landscape</span>
                    <span className="truncate">Junglan Valley Terrain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Narrative (100% exact from index.html) */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
            <span className="text-label-uppercase font-label-uppercase text-secondary uppercase tracking-wider text-xs">
              Foundation Introduction &amp; Origin
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-primary tracking-tight leading-tight">
              Rooted in Community, Dedicated to Mountain Life
            </h2>
            <div className="space-y-3 sm:space-y-4 text-on-surface-variant text-sm sm:text-body-md font-body-md leading-relaxed">
              <p>
                Junglan Community Development Foundation was founded to bring tangible, transparent assistance to remote rural populations in Hazara Division, Khyber Pakhtunkhwa, where secondary clinical care and economic security remain beyond routine reach.
              </p>
              <p className="border-l-2 border-tertiary-container pl-3 sm:pl-4 text-on-surface font-medium bg-surface-container-lowest py-1.5 rounded-r">
                The foundation’s inception stems from heartbreak: the founder’s brother, a bright pre-medical student, tragically lost his life following an accident because emergency transport could not reach him in time over the rugged, unpaved mountain trails.
              </p>
              <p>
                From this irreplaceable loss arose an unwavering commitment: no family in Junglan Valley should ever bury a loved one simply because an ambulance was unavailable or unaffordable. Today, JCDF operates not only as a rapid emergency medical lifeline, but also as a civic engine establishing permanent agricultural wealth through commercial olive cultivation.
              </p>
            </div>

            {/* Institutional Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-surface-container-lowest border border-stone-border rounded-lg">
                <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0">account_balance</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-primary">Direct Grassroots Service</h4>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                    Working shoulder-to-shoulder with village jirgas and smallholders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 bg-surface-container-lowest border border-stone-border rounded-lg">
                <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl shrink-0">gavel</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-primary">Audited Governance</h4>
                  <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                    Strict statutory compliance under SECP registration CUIN 0348227.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutOriginSection;
