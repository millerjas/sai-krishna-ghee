"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function StorySection() {
  return (
    <section id="story" className="py-16 bg-[#FAF7F0] border-t border-b border-[#E5E0D8]">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#D69A24]/15 text-[#B87B10] border border-[#D69A24]/30 w-fit">
              🏺 Artisanal Heritage
            </span>
            <h2 className="font-serif text-3xl small:text-4xl font-bold text-[#1C1917] leading-tight">
              Rooted in Tradition.<br />
              <span className="italic font-normal text-[#D69A24]">Made for Today.</span>
            </h2>
            <div className="text-sm text-[#52525B] leading-relaxed flex flex-col gap-4">
              <p>
                Suddha Ghee was born from a simple belief — that the pure, traditional ghee of our grandmothers deserved to find its way into modern Indian kitchens. The kind of ghee that had an aroma that could fill the entire home and a taste that made every meal special.
              </p>
              <p>
                We prepare our ghee using the ancient Bilona hand-churning method — curd prepared from pure grass-fed A2 milk is churned using wooden churners, and butter is extracted before being slow-cooked over a gentle flame.
              </p>
              <p>
                Every jar we make carries time-honoured discipline, golden clarity, and natural richness. Nothing more. Nothing less.
              </p>
            </div>
            
            {/* Highlights */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#D69A24]/20 mt-2">
              <div>
                <div className="font-serif text-xl font-bold text-[#173B2F]">100% Bilona</div>
                <div className="text-xs text-[#71717A]">Hand Churned Method</div>
              </div>
              <div className="w-px h-10 bg-[#D69A24]/30" />
              <div>
                <div className="font-serif text-xl font-bold text-[#173B2F]">A2 Gir Milk</div>
                <div className="text-xs text-[#71717A]">Grass-Fed Farms</div>
              </div>
            </div>

            <LocalizedClientLink
              href="/store"
              className="btn-primary w-fit mt-2"
            >
              Shop Our Ghee →
            </LocalizedClientLink>
          </div>

          {/* Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#E5E0D8] bg-[#F4EFE6]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1596797882870-8c33deeac224?q=80&w=800&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F0]">
                <span className="text-xs font-semibold text-[#D69A24] uppercase tracking-wider">BILONA METHOD</span>
                <h3 className="font-serif text-xl font-bold mt-1">Slow Cooked in Small Batches</h3>
                <p className="text-xs text-[#FAF7F0]/80 mt-1">Preserving natural aroma &amp; granular texture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
