import React, { useState } from 'react';
import { TOUR_HOTELS, HotelInfo } from '../data/tourData';
import { Check, MapPin, Coffee, Wifi, Sparkles, Bed, Shield } from 'lucide-react';

export const Hotels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fresa-ginza' | 'fresa-kyoto'>('fresa-ginza');
  const selectedHotel: HotelInfo = TOUR_HOTELS.find((h) => h.id === activeTab) || TOUR_HOTELS[0];

  return (
    <section id="hotels" className="py-20 lg:py-28 bg-[#121214] text-white border-b border-stone-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E0C179] mb-3">
            <span className="font-kanji text-sm">厳選ホテル</span>
            <span>· Отели по маршруту</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
            Где вы будете жить: центры городов и комфорт без компромиссов
          </h2>
          <p className="mt-3 text-stone-300 text-base font-light">
            Мы не селим туристов в отдаленных спальных районах. Вы живете в фешенебельной Гинзе (Токио) и у центрального вокзала Киото с включенными горячими завтраками.
          </p>
        </div>

        {/* Hotel Switcher Segmented Control */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {TOUR_HOTELS.map((hotel) => (
            <button
              key={hotel.id}
              onClick={() => setActiveTab(hotel.id as 'fresa-ginza' | 'fresa-kyoto')}
              className={`cursor-pointer flex-1 p-5 rounded-sm border text-left transition-all ${
                activeTab === hotel.id
                  ? 'border-[#B82626] bg-[#B82626]/10 text-white shadow-lg shadow-black/40 ring-1 ring-[#B82626]'
                  : 'border-white/10 bg-white/5 text-stone-400 hover:text-stone-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#E0C179]">
                  {hotel.city} • {hotel.nights} ночи
                </span>
                <span className="text-xs text-amber-200">{hotel.stars}</span>
              </div>
              <div className="font-display text-xl font-semibold text-white">
                {hotel.name}
              </div>
              <div className="text-xs text-stone-300 mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#B82626]" />
                <span>{hotel.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Hotel In-Depth Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white/5 border border-white/10 rounded-sm p-6 lg:p-10 backdrop-blur-xs">
          {/* Left Column: Visual & Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-sm overflow-hidden aspect-4/3 border border-white/15 shadow-xl mb-6">
              <img
                src={selectedHotel.image}
                alt={selectedHotel.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs uppercase tracking-widest text-[#E0C179] font-medium">
                  {selectedHotel.badge}
                </div>
                <div className="text-sm font-light text-stone-200 mt-0.5">
                  {selectedHotel.metroDist}
                </div>
              </div>
            </div>

            {/* Breakfast highlight box */}
            <div className="rounded-sm bg-black/40 border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-[#E0C179] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-200 font-semibold mb-1">
                    Сытный завтрак «Шведский стол» включен
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {selectedHotel.breakfast}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hotel Details & Amenities (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                <span>Категория: {selectedHotel.stars}</span>
                <span>·</span>
                <span>{selectedHotel.nights} ночи пребывания</span>
                <span>·</span>
                <span className="text-[#E0C179]">Питание включено</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
                {selectedHotel.name}
              </h3>

              <p className="text-xs text-stone-400 mb-4 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#B82626]" />
                <span>{selectedHotel.location}</span>
              </p>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed mb-6">
                {selectedHotel.description}
              </p>

              {/* Amenities Grid */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#E0C179] mb-4 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Удобства и сервис в отеле:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedHotel.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                      <div className="h-4 w-4 rounded-full bg-[#B82626]/20 border border-[#B82626] flex items-center justify-center shrink-0 mt-0.5 text-[#E0C179]">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom guarantee */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-[#E0C179]" />
                <span>Опции размещения: Twin (раздельные кровати) / Double (одна большая кровать)</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#E0C179]" />
                <span>Возможен апгрейд категории номера по запросу</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
