import React, { useState } from 'react';
import { TOUR_DAYS, DayItinerary } from '../data/tourData';
import { Clock, MapPin, Utensils, Hotel, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const Itinerary: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay: DayItinerary = TOUR_DAYS[activeDayIndex];

  return (
    <section id="itinerary" className="py-20 lg:py-28 bg-[#121214] text-white overflow-hidden relative">
      {/* Decorative background grid and kanji */}
      <div className="absolute top-10 left-10 font-kanji text-[120px] text-white/5 pointer-events-none select-none">
        日程
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E0C179] mb-3">
              <span className="font-kanji text-sm">七日間の旅</span>
              <span>· Маршрут день за днем</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              7 дней полного погружения в Японию
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base font-light">
              От пульсирующего неона Токио до медитативных святилищ Киото и священных оленей Нары.
            </p>
          </div>

          {/* Day Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setActiveDayIndex((prev) => (prev > 0 ? prev - 1 : TOUR_DAYS.length - 1))}
              className="cursor-pointer p-3 rounded-sm border border-white/20 bg-white/5 text-stone-200 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Предыдущий день"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xs font-mono tracking-widest px-3 text-stone-400">
              0{activeDayIndex + 1} / 0{TOUR_DAYS.length}
            </span>
            <button
              onClick={() => setActiveDayIndex((prev) => (prev < TOUR_DAYS.length - 1 ? prev + 1 : 0))}
              className="cursor-pointer p-3 rounded-sm border border-white/20 bg-white/5 text-stone-200 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Следующий день"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Days Tab Switcher */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/10">
          {TOUR_DAYS.map((d, index) => {
            const isActive = index === activeDayIndex;
            return (
              <button
                key={d.day}
                onClick={() => setActiveDayIndex(index)}
                className={`cursor-pointer group flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all shrink-0 border ${
                  isActive
                    ? 'bg-[#B82626] border-[#B82626] text-white shadow-lg shadow-red-950/30'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="font-kanji text-lg opacity-80">{d.kanji}</span>
                <div>
                  <div className="text-[11px] uppercase tracking-wider opacity-75">
                    День {d.day}
                  </div>
                  <div className="text-sm font-semibold whitespace-nowrap">
                    {d.city}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual Asset and Quick Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-sm overflow-hidden border border-white/15 bg-stone-900 aspect-4/3 shadow-2xl">
              <img
                src={currentDay.image}
                alt={currentDay.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Day Badge & Kanji Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-[#E0C179] rounded-xs">
                  День 0{currentDay.day}
                </span>
                <span className="px-2.5 py-1 bg-[#B82626] text-white text-xs font-medium rounded-xs">
                  {currentDay.city}
                </span>
              </div>

              {/* Kanji Seal */}
              <div className="absolute bottom-4 right-4 text-right">
                <div className="font-kanji text-4xl text-[#E0C179] font-light">
                  {currentDay.kanji}
                </div>
                <div className="text-[10px] text-stone-300 tracking-wider">
                  {currentDay.kanjiMeaning}
                </div>
              </div>
            </div>

            {/* Practical Meta Box */}
            <div className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-xs space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <Utensils className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Питание</span>
                  <span className="text-stone-200">{currentDay.meals}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm pt-3 border-t border-white/10">
                <Hotel className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block">Размещение</span>
                  <span className="text-stone-200">{currentDay.hotel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Schedule Timeline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Day Title */}
              <div className="text-xs font-mono tracking-wider uppercase text-[#E0C179] mb-2">
                {currentDay.subtitle}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 leading-snug">
                {currentDay.title}
              </h3>

              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                {currentDay.description}
              </p>

              {/* Highlights */}
              <div className="mb-8">
                <div className="text-xs font-semibold tracking-wider uppercase text-amber-200/90 mb-3">
                  Главные впечатления дня:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentDay.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-200">
                      <div className="h-4 w-4 rounded-full bg-[#B82626]/20 border border-[#B82626] flex items-center justify-center shrink-0 mt-0.5 text-[#E0C179]">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-semibold tracking-wider uppercase text-stone-400 mb-4 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#E0C179]" />
                  <span>Поминутная программа дня:</span>
                </div>

                <div className="space-y-3">
                  {currentDay.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-3 rounded-sm bg-white/5 border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <span className="font-mono text-xs font-semibold text-[#E0C179] shrink-0 w-24 pt-0.5">
                        {item.time}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-200 leading-snug">
                        {item.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick jump to next day button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                Маршрут включает 3 дня с персональным русскоязычным гидом
              </span>
              <button
                onClick={() => setActiveDayIndex((prev) => (prev < TOUR_DAYS.length - 1 ? prev + 1 : 0))}
                className="cursor-pointer text-xs font-medium text-[#E0C179] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>
                  {activeDayIndex < TOUR_DAYS.length - 1
                    ? `Перейти к дню ${activeDayIndex + 2} →`
                    : 'В начало маршрута (День 1) →'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
