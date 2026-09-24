import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { Train, Clock, MapPin, Sparkles } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  return (
    <section id="map" className="py-20 lg:py-28 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-3">
            <span className="font-kanji text-sm">路線図</span>
            <span>· Логистика и география тура</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Карта путешествия: от Тихого океана до древних святынь
          </h2>
          <p className="mt-3 text-base text-stone-600 font-light">
            Продуманный кольцевой маршрут: прилет в Токио (HND/NRT), скоростной переезд на Синкансэне мимо Фудзиямы, Киото и Нара, вылет из Осаки (KIX). Без пустых обратных переездов.
          </p>
        </div>

        {/* Map Interactive Canvas / Diagram Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-sm border border-stone-200/90 shadow-sm p-6 lg:p-10">
          {/* Left: Interactive SVG Map of Honshu corridor (7 cols) */}
          <div className="lg:col-span-7 relative bg-[#121214] rounded-sm p-6 overflow-hidden min-h-[380px] lg:min-h-[440px] flex items-center justify-center">
            {/* Map Background Aesthetics */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute bottom-4 left-6 text-stone-500 text-[11px] font-mono tracking-wider">
              Трасса Синкансэн Токайдо (Tokaido Line) • Скорость: 285 км/ч
            </div>

            {/* SVG Japan Central Honshu Route */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full max-h-[400px] select-none"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
            >
              <defs>
                <linearGradient id="shinkansenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#B82626" />
                  <stop offset="100%" stopColor="#E0C179" />
                </linearGradient>

                {/* Pulsing glow animation */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Stylized Island Honshu Landmass Outlines (Minimalist Japanese Map Silhouette) */}
              <path
                d="M 120 420 C 180 380, 240 370, 310 360 C 370 350, 410 320, 480 300 C 560 280, 640 240, 720 220 C 760 210, 780 230, 740 280 C 690 320, 620 370, 520 400 C 440 430, 320 450, 220 460 Z"
                fill="#1C1C22"
                stroke="#2A2A35"
                strokeWidth="1.5"
              />

              {/* Mt. Fuji Stylized Landmark */}
              <g transform="translate(530, 260)">
                <polygon points="0,-22 20,12 -20,12" fill="#2D2D38" stroke="#4A4A5A" strokeWidth="1" />
                <polygon points="0,-22 8,-8 -8,-8" fill="#F9F8F6" />
                <text x="0" y="24" fill="#C5A059" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                  гора Фудзи
                </text>
              </g>

              {/* Main Shinkansen High-Speed Route Line (Tokyo -> Kyoto -> Osaka) */}
              <path
                d="M 640 250 Q 530 300 370 340 T 260 410"
                fill="none"
                stroke="#333340"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Animated Glowing Shinkansen Track */}
              <path
                d="M 640 250 Q 530 300 370 340 T 260 410"
                fill="none"
                stroke="url(#shinkansenGradient)"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                className="animate-[dash_15s_linear_infinite]"
              />

              {/* Spur to Disneyland */}
              <line
                x1="640"
                y1="250"
                x2="675"
                y2="245"
                stroke="#E0C179"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Spur to Nara */}
              <line
                x1="370"
                y1="340"
                x2="390"
                y2="385"
                stroke="#E0C179"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Spur to Osaka KIX Airport */}
              <line
                x1="370"
                y1="340"
                x2="260"
                y2="410"
                stroke="#B82626"
                strokeWidth="2.5"
              />

              {/* Station Node Markers */}
              {/* 1. Tokyo Station & Ginza */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('tokyo')}
                transform="translate(640, 250)"
              >
                <circle r={activeStopId === 'tokyo' ? "12" : "8"} fill="#B82626" className="transition-all" />
                <circle r="4" fill="#FFFFFF" />
                <text x="16" y="5" fill="#FFFFFF" fontSize="13" fontWeight="bold">Токио</text>
                <text x="16" y="20" fill="#A0A0B0" fontSize="10">Дни 1–3</text>
              </g>

              {/* 2. Disneyland */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('disney')}
                transform="translate(675, 245)"
              >
                <circle r={activeStopId === 'disney' ? "10" : "6"} fill="#D4AF37" className="transition-all" />
                <circle r="3" fill="#FFFFFF" />
                <text x="14" y="4" fill="#E0C179" fontSize="11">Диснейленд</text>
              </g>

              {/* 3. Shinkansen Line midpoint */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('shinkansen')}
                transform="translate(500, 310)"
              >
                <circle r={activeStopId === 'shinkansen' ? "11" : "7"} fill="#C5A059" className="transition-all" />
                <text x="0" y="-12" fill="#E0C179" fontSize="10" textAnchor="middle">Синкансэн (285 км/ч)</text>
              </g>

              {/* 4. Kyoto */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('kyoto')}
                transform="translate(370, 340)"
              >
                <circle r={activeStopId === 'kyoto' ? "12" : "8"} fill="#B82626" className="transition-all" />
                <circle r="4" fill="#FFFFFF" />
                <text x="-16" y="-10" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="end">Киото</text>
                <text x="-16" y="6" fill="#A0A0B0" fontSize="10" textAnchor="end">Дни 4–6</text>
              </g>

              {/* 5. Nara */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('nara')}
                transform="translate(390, 385)"
              >
                <circle r={activeStopId === 'nara' ? "10" : "6"} fill="#C5A059" className="transition-all" />
                <circle r="3" fill="#FFFFFF" />
                <text x="14" y="4" fill="#FFFFFF" fontSize="11">Нара (Олени)</text>
              </g>

              {/* 6. Osaka KIX */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveStopId('osaka')}
                transform="translate(260, 410)"
              >
                <circle r={activeStopId === 'osaka' ? "12" : "8"} fill="#B82626" className="transition-all" />
                <circle r="4" fill="#FFFFFF" />
                <text x="-14" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="end">Осака KIX</text>
                <text x="-14" y="20" fill="#A0A0B0" fontSize="10" textAnchor="end">Вылет (День 7)</text>
              </g>
            </svg>
          </div>

          {/* Right: Selected Station Detail Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs uppercase tracking-widest text-[#B82626] font-semibold flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Точка маршрута: {activeStop.days}</span>
                </span>
                <span className="font-kanji text-2xl font-light text-[#C5A059]">
                  {activeStop.kanji}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-4 mb-2">
                {activeStop.name}
              </h3>

              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-6">
                {activeStop.description}
              </p>

              {/* Station Specific Highlight */}
              <div className="rounded-sm bg-stone-50 border border-stone-200/80 p-4 space-y-2 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center gap-2 font-medium text-stone-900">
                  <Sparkles className="h-4 w-4 text-[#B82626]" />
                  <span>Что включено на этом участке:</span>
                </div>
                {activeStop.id === 'tokyo' && (
                  <p className="text-stone-600">
                    Индивидуальный трансфер из аэропорта, проживание в Гинзе, экскурсия по Токио с русскоязычным гидом.
                  </p>
                )}
                {activeStop.id === 'disney' && (
                  <p className="text-stone-600">
                    Трансфер в парк, входной безлимитный 1-Day Passport и билеты на поезд обратно.
                  </p>
                )}
                {activeStop.id === 'shinkansen' && (
                  <p className="text-stone-600">
                    Скоростной поезд-пуля Синкансэн (Токио → Киото, 2 ч 20 мин), забронированные места и свежий ланч экибэн.
                  </p>
                )}
                {activeStop.id === 'kyoto' && (
                  <p className="text-stone-600">
                    Отель прямо у вокзала JR Kyoto, экскурсия в Золотой павильон, замок Нидзё, Фусими Инари и свободный день.
                  </p>
                )}
                {activeStop.id === 'nara' && (
                  <p className="text-stone-600">
                    Экскурсионный выезд в Нару, парк священных оленей и храм Тодайдзи с Большим Буддой.
                  </p>
                )}
                {activeStop.id === 'osaka' && (
                  <p className="text-stone-600">
                    Прямой скоростной экспресс JR Haruka прямо в терминал аэропорта Кансай (KIX) за 75 минут.
                  </p>
                )}
              </div>
            </div>

            {/* Station Quick Selector Buttons */}
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                Выберите пункт на карте:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ROUTE_STOPS.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => setActiveStopId(stop.id)}
                    className={`cursor-pointer px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                      activeStopId === stop.id
                        ? 'bg-[#B82626] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {stop.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
