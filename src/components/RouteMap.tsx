import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { MapPin, Sparkles, Navigation } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  // Проверка режима экспорта в ссылке (?export=1)
  const isExport = typeof window !== 'undefined' && window.location.search.includes('export');

  const stopPerks: Record<string, string> = {
    tokyo: 'Индивидуальный трансфер из аэропорта, отель в Гинзе, экскурсия по Токио с русскоязычным гидом.',
    disney: 'Трансфер в парк, входной безлимитный 1-Day Passport и билеты на поезд обратно.',
    shinkansen: 'Скоростной поезд-пуля Синкансэн (Токио → Киото, 2 ч 20 мин), забронированные места.',
    kyoto: 'Отель у вокзала JR Kyoto, экскурсия в Золотой павильон, замок Нидзё, ворота Фусими Инари и свободный день.',
    nara: 'Экскурсионный выезд в Нару, парк священных ручных оленей и храм Тодайдзи с Большим Буддой.',
    osaka: 'Прямой скоростной экспресс JR Haruka по морскому мосту в терминал аэропорта Кансай (KIX).',
  };

  return (
    <section id="map" className="py-14 sm:py-20 lg:py-24 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Заголовок */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-2">
            <span className="font-kanji text-sm">路線図</span>
            <span>· 3D-Панорама маршрута</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Карта путешествия по Японии
          </h2>
          <p className="mt-2 text-xs sm:text-base text-stone-600 font-light leading-relaxed">
            Полноценный панорамный маршрут: скоростной Синкансэн вдоль побережья мимо священной Фудзиямы, святыни древнего Киото, Нара и вылет из Осаки.
          </p>
        </div>

        {/* Главная карточка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-xl border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8 items-start">
          
          {/* Левая колонка: Карта */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-stone-200 shadow-md bg-sky-100 select-none">
              
              {/* Фотография 3D-карты */}
              <img
                src="/images/japan-map-3d.jpg"
                alt="3D Карта тура по Японии"
                className="w-full h-full object-cover block pointer-events-none"
              />

              <div className={`absolute top-3 left-3 text-stone-800 text-[10px] sm:text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs z-20 pointer-events-none ${isExport ? 'hidden' : 'print:hidden'}`}>
                <Navigation className="h-3 w-3 text-[#B82626] animate-spin" style={{ animationDuration: '24s' }} />
                <span>Хонсю • Линия Синкансэн Токайдо</span>
              </div>

              {/* Поезд */}
              <svg viewBox="0 0 1000 562" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <defs>
                  <linearGradient id="headlightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="bridgeRail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFE066" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                <path
                  id="shinkansenBridgeTrack"
                  d="M 715,298 C 630,312 565,354 490,354 C 415,354 320,298 245,308"
                  fill="none"
                  stroke="url(#bridgeRail)"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                <g>
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path="M 715,298 C 630,312 565,354 490,354 C 415,354 320,298 245,308"
                  />
                  <polygon points="12,0 46,-8 46,8" fill="url(#headlightGlow)" />
                  <rect x="-14" y="-6" width="28" height="8" rx="4" fill="#FFFFFF" stroke="#004499" strokeWidth="1.2" />
                  <rect x="-8" y="-3" width="18" height="2" fill="#0066CC" />
                  <circle cx="12" cy="-1" r="2" fill="#FFF9C4" />
                </g>
              </svg>

              {/* Метки (HTML) */}
              <div className="absolute inset-0 z-20 pointer-events-auto">
                <button
                  onClick={() => setActiveStopId('tokyo')}
                  style={{ left: '71.5%', top: '48%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-sm">🗼</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Токио</span>
                </button>

                <button
                  onClick={() => setActiveStopId('disney')}
                  style={{ left: '78.5%', top: '38%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2 py-0.5 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-xs">🏰</span>
                  <span className="text-[11px] font-bold text-amber-900 whitespace-nowrap">Дисней</span>
                </button>

                <button
                  onClick={() => setActiveStopId('shinkansen')}
                  style={{ left: '52%', top: '24%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-3 py-1 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-sm">🗻</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Фудзияма</span>
                </button>

                <button
                  onClick={() => setActiveStopId('kyoto')}
                  style={{ left: '22.5%', top: '48%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-sm">⛩️</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Киото</span>
                </button>

                <button
                  onClick={() => setActiveStopId('nara')}
                  style={{ left: '31%', top: '58%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2 py-0.5 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-xs">🦌</span>
                  <span className="text-[11px] font-bold text-stone-800 whitespace-nowrap">Нара</span>
                </button>

                <button
                  onClick={() => setActiveStopId('osaka')}
                  style={{ left: '14%', top: '56%' }}
                  className="cursor-pointer absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md bg-white border border-stone-200"
                >
                  <span className="text-xs">✈️</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Осака KIX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Правая колонка: Детали пункта */}
          <div className="lg:col-span-5 w-full min-w-0 flex flex-col justify-between space-y-5">
            
            {/* 1. ЭКРАННЫЙ ВИД (Скрывается при печати и при ?export=1) */}
            <div className={isExport ? 'hidden' : 'print:hidden'}>
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-[#B82626] font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{activeStop.days}</span>
                </span>
                <span className="font-kanji text-xl font-light text-[#C5A059]">
                  {activeStop.kanji}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-stone-900 mt-3 mb-1.5">
                {activeStop.name}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4">
                {activeStop.description}
              </p>

              <div className="rounded-md bg-stone-50 border border-stone-200 p-3.5 space-y-1.5 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center gap-1.5 font-medium text-stone-900 text-xs sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#B82626]" />
                  <span>Что включено на этом участке:</span>
                </div>
                <p className="text-stone-600 text-xs sm:text-sm">
                  {stopPerks[activeStop.id]}
                </p>
              </div>

              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  Быстрый выбор пункта:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ROUTE_STOPS.map((stop) => (
                    <button
                      key={stop.id}
                      onClick={() => setActiveStopId(stop.id)}
                      className={`cursor-pointer px-2.5 py-1.5 rounded-sm text-xs font-medium transition-all ${
                        activeStopId === stop.id
                          ? 'bg-[#B82626] text-white shadow-xs scale-105'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {stop.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. ВИД ДЛЯ ЭКСПОРТА И PDF: СРАЗУ ВСЕ 6 ЛОКАЦИЙ! */}
            <div className={isExport ? 'block space-y-3' : 'hidden print:block space-y-3'}>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B82626] pb-1 border-b border-stone-200">
                Все ключевые локации маршрута:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {ROUTE_STOPS.map((stop) => (
                  <div key={stop.id} className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="font-bold text-stone-900 flex items-center justify-between">
                      <span>{stop.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B82626]/10 text-[#B82626] font-semibold">{stop.days}</span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1.5 leading-relaxed font-light">
                      {stopPerks[stop.id]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};