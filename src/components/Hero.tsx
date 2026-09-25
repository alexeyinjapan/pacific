import { useConfig } from '../context/ConfigContext';
import React from 'react';
import { ArrowRight, Calendar, Compass, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/hero_japan_tradition_future_1790223774740.jpg';

interface HeroProps {
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {

    const config = useConfig(); 

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#121214] text-white pt-24 pb-16">
      {/* Background Image with Measured Scrim for WCAG AA Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Панорама Японии: контраст древнего Киото и сияющего огнями Токио"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered measured scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#121214]/90" />
      </div>

      {/* Decorative Traditional Japanese Kanji Seal */}
      <div className="absolute top-28 right-8 lg:right-16 z-10 pointer-events-none hidden md:flex flex-col items-center opacity-30 select-none">
        <span className="font-kanji text-5xl lg:text-7xl font-light tracking-widest text-[#E0C179] [writing-mode:vertical-rl]">
          伝統と未来
        </span>
        <span className="text-[10px] tracking-widest uppercase text-[#C5A059] mt-3">Tradition & Future</span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Organization Pre-title */}
        <div className="mb-4 flex items-center gap-2 text-xs lg:text-sm tracking-widest uppercase text-[#E0C179] font-medium">
          <span className="inline-block h-px w-6 lg:w-10 bg-[#C5A059]" />
          <span>{config.company_name} • Авторский маршрут</span>
          <span className="inline-block h-px w-6 lg:w-10 bg-[#C5A059]" />
        </div>

        {/* H1 Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 max-w-4xl text-balance leading-[1.08]">
          Япония: между традицией и&nbsp;будущим
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl lg:text-2xl text-stone-200 font-light max-w-3xl mb-8 leading-relaxed text-balance">
          7 дней / 6 ночей • Еженедельные заезды по воскресеньям.
          <span className="block mt-1 text-stone-300 font-normal">
            Маршрут: Токио • Диснейленд • Киото • Нара • Осака
          </span>
        </p>

        {/* Zero-Pill Metadata Discipline: Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-stone-300 mb-10 max-w-2xl">
          <span className="font-medium text-amber-100">Отели 3*–4* в центре</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="font-medium text-amber-100">Русскоязычный лицензированный гид</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="font-medium text-amber-100">Синкансэн включён</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="text-stone-300">Гарантия туроператора в Токио</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenCalculator}
            className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-[#B82626] hover:bg-[#8B1515] text-white text-base font-medium rounded-sm shadow-lg shadow-red-950/40 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group whitespace-nowrap"
          >
            <span>Рассчитать стоимость тура</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#itinerary"
            className="cursor-pointer w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-base font-medium rounded-sm backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Compass className="h-4 w-4 text-[#E0C179]" />
            <span>Программа по дням</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-left w-full max-w-4xl">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#E0C179] shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Каждое воскресенье</div>
              <div className="text-xs text-stone-400">Гарантированные заезды круглый год</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#E0C179] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Без посредников</div>
              <div className="text-xs text-stone-400">Прямой японский оператор в Токио</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#E0C179] shrink-0">
              <span className="font-display text-base font-bold text-[#E0C179]">285</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Поезд-пуля Синкансэн</div>
              <div className="text-xs text-stone-400">2 ч 20 мин Токио → Киото включены</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#E0C179] shrink-0">
              <span className="font-kanji text-base text-[#E0C179]">安心</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Поддержка 24/7</div>
              <div className="text-xs text-stone-400">Русскоязычный консьерж в Японии</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
