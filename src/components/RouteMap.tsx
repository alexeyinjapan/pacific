import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { MapPin, Sparkles, Navigation } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

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

        {/* Главная карточка: Двухколоночный Grid с жесткой фиксацией */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-xl border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8 items-start">
          
          {/* Левая колонка: Карта (Ровно 7 колонок из 12, min-w-0 защищает от вылезания) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-stone-300 shadow-md bg-sky-100">
              
              {/* Фоновое 3D-изображение */}
              <img
                src="/images/japan-map-3d.jpg"
                alt="3D Карта тура по Японии"
                className="w-full h-full object-cover block select-none pointer-events-none"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/japan-map-3d.jpg';
                }}
              />

              {/* Плашка компаса в углу */}
              <div className="absolute top-3 left-3 text-stone-800 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs z-20 pointer-events-none">
                <Navigation className="h-3 w-3 text-[#B82626] animate-spin" style={{ animationDuration: '24s' }} />
                <span>Хонсю • Линия Синкансэн Токайдо</span>
              </div>

              {/* ИНТЕРАКТИВНЫЙ СЛОЙ: МЕТКИ И ПОЕЗД СТРОГО ПО МОСТУ */}
              <svg
                viewBox="0 0 1000 562"
                className="absolute inset-0 w-full h-full z-10 select-none"
              >
                <defs>
                  {/* Луч света от фар */}
                  <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
                  </linearGradient>

                  {/* Золотая подсветка рельсов */}
                  <linearGradient id="railGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFE066" stopOpacity="0.8" />
                  </linearGradient>

                  <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* 1. ТОЧНАЯ ТРАЕКТОРИЯ МОСТА НА ВАШЕМ ФОТО */}
                {/* От башни Токио (730, 280) через клёны (610, 310) к воде у Фудзи (480, 350) и в Киото (235, 335) */}
                <path
                  id="bridgeExactPath"
                  d="M 730,280 C 660,290 580,350 480,350 C 390,350 310,310 235,335"
                  fill="none"
                  stroke="url(#railGlow)"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.75"
                />

                {/* 2. СИНКАНСЭН, МЧАЩИЙСЯ СТРОГО ПО МОСТУ */}
                <g>
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path="M 730,280 C 660,290 580,350 480,350 C 390,350 310,310 235,335"
                  />
                  {/* Луч фар вперед */}
                  <polygon points="12,0 44,-8 44,8" fill="url(#headlightBeam)" />
                  {/* Корпус поезда N700S */}
                  <rect x="-14" y="-4.5" width="28" height="9" rx="4" fill="#FFFFFF" stroke="#004499" strokeWidth="1.2" />
                  <rect x="-8" y="-1.5" width="18" height="2" fill="#0066CC" />
                  <circle cx="12" cy="0" r="2" fill="#FFF9C4" />
                </g>

                {/* 3. ТОЧНЫЕ ПАРЯЩИЕ МЕТКИ НАД ОБЪЕКТАМИ ФОТО */}

                {/* ТОКИО: над красной башней справа */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('tokyo')} transform="translate(730, 240)">
                  {activeStopId === 'tokyo' && <circle r="22" fill="#E53E3E" opacity="0.35" className="animate-ping" />}
                  <rect x="-34" y="-36" width="68" height="32" rx="8" fill="#FFFFFF" stroke={activeStopId === 'tokyo' ? '#C53030' : '#E2E8F0'} strokeWidth={activeStopId === 'tokyo' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-16" y="-16" fontSize="13">🗼</text>
                  <text x="8" y="-15" fill="#1A202C" fontSize="10" fontWeight="bold" textAnchor="middle">Токио</text>
                  <line x1="0" y1="-4" x2="0" y2="12" stroke="#C53030" strokeWidth="2" />
                  <circle cx="0" cy="12" r="3.5" fill="#C53030" />
                </g>

                {/* ДИСНЕЙЛЕНД: чуть правее в заливе */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('disney')} transform="translate(805, 215)">
                  {activeStopId === 'disney' && <circle r="18" fill="#D69E2E" opacity="0.35" className="animate-ping" />}
                  <rect x="-36" y="-32" width="72" height="28" rx="7" fill="#FFFFFF" stroke={activeStopId === 'disney' ? '#D69E2E' : '#E2E8F0'} strokeWidth={activeStopId === 'disney' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-18" y="-14" fontSize="12">🏰</text>
                  <text x="8" y="-14" fill="#744210" fontSize="9" fontWeight="bold" textAnchor="middle">Дисней</text>
                  <line x1="0" y1="-4" x2="0" y2="10" stroke="#D69E2E" strokeWidth="2" />
                  <circle cx="0" cy="10" r="3" fill="#D69E2E" />
                </g>

                {/* ГОРА ФУДЗИ: строго над белой шапкой вулкана */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('shinkansen')} transform="translate(515, 140)">
                  {activeStopId === 'shinkansen' && <circle r="22" fill="#E53E3E" opacity="0.35" className="animate-ping" />}
                  <rect x="-42" y="-32" width="84" height="30" rx="8" fill="#FFFFFF" stroke={activeStopId === 'shinkansen' ? '#C53030' : '#E2E8F0'} strokeWidth={activeStopId === 'shinkansen' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-22" y="-13" fontSize="13">🗻</text>
                  <text x="10" y="-12" fill="#1A202C" fontSize="10" fontWeight="bold" textAnchor="middle">Фудзияма</text>
                  <line x1="0" y1="-2" x2="0" y2="14" stroke="#C53030" strokeWidth="2" />
                  <circle cx="0" cy="14" r="3.5" fill="#C53030" />
                </g>

                {/* КИОТО: строго над пагодой слева */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('kyoto')} transform="translate(195, 290)">
                  {activeStopId === 'kyoto' && <circle r="22" fill="#E53E3E" opacity="0.35" className="animate-ping" />}
                  <rect x="-34" y="-36" width="68" height="32" rx="8" fill="#FFFFFF" stroke={activeStopId === 'kyoto' ? '#C53030' : '#E2E8F0'} strokeWidth={activeStopId === 'kyoto' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-16" y="-16" fontSize="13">⛩️</text>
                  <text x="8" y="-15" fill="#1A202C" fontSize="10" fontWeight="bold" textAnchor="middle">Киото</text>
                  <line x1="0" y1="-4" x2="0" y2="12" stroke="#C53030" strokeWidth="2" />
                  <circle cx="0" cy="12" r="3.5" fill="#C53030" />
                </g>

                {/* НАРА: южнее пагоды Киото в холмах */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('nara')} transform="translate(285, 360)">
                  {activeStopId === 'nara' && <circle r="18" fill="#D69E2E" opacity="0.35" className="animate-ping" />}
                  <rect x="-30" y="-32" width="60" height="28" rx="7" fill="#FFFFFF" stroke={activeStopId === 'nara' ? '#D69E2E' : '#E2E8F0'} strokeWidth={activeStopId === 'nara' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-15" y="-14" fontSize="12">🦌</text>
                  <text x="8" y="-14" fill="#744210" fontSize="9" fontWeight="bold" textAnchor="middle">Нара</text>
                  <line x1="0" y1="-4" x2="0" y2="10" stroke="#D69E2E" strokeWidth="2" />
                  <circle cx="0" cy="10" r="3" fill="#D69E2E" />
                </g>

                {/* ОСАКА KIX: морской залив на крайнем западе */}
                <g className="cursor-pointer group" onClick={() => setActiveStopId('osaka')} transform="translate(100, 360)">
                  {activeStopId === 'osaka' && <circle r="22" fill="#E53E3E" opacity="0.35" className="animate-ping" />}
                  <rect x="-42" y="-36" width="84" height="32" rx="8" fill="#FFFFFF" stroke={activeStopId === 'osaka' ? '#C53030' : '#E2E8F0'} strokeWidth={activeStopId === 'osaka' ? '2.5' : '1.5'} filter="url(#badgeShadow)" />
                  <text x="-22" y="-16" fontSize="12">✈️</text>
                  <text x="12" y="-15" fill="#1A202C" fontSize="9" fontWeight="bold" textAnchor="middle">Осака KIX</text>
                  <line x1="0" y1="-4" x2="0" y2="12" stroke="#C53030" strokeWidth="2" />
                  <circle cx="0" cy="12" r="3.5" fill="#C53030" />
                </g>
              </svg>
            </div>
          </div>

          {/* Правая колонка: Детали пункта (Ровно 5 колонок из 12, min-w-0 защищает верстку) */}
          <div className="lg:col-span-5 w-full min-w-0 flex flex-col justify-between space-y-5">
            <div>
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

              {/* Плашка включенных услуг */}
              <div className="rounded-md bg-stone-50 border border-stone-200 p-3.5 space-y-1.5 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center gap-1.5 font-medium text-stone-900 text-xs sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#B82626]" />
                  <span>Что включено на этом участке:</span>
                </div>
                {activeStop.id === 'tokyo' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Индивидуальный трансфер из аэропорта, отель в Гинзе, экскурсия по Токио с русскоязычным гидом.
                  </p>
                )}
                {activeStop.id === 'disney' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Трансфер в парк, входной безлимитный 1-Day Passport и билеты на поезд обратно.
                  </p>
                )}
                {activeStop.id === 'shinkansen' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Скоростной поезд-пуля Синкансэн (Токио → Киото, 2 ч 20 мин), забронированные места и свежий ланч экибэн с панорамой горы Фудзи.
                  </p>
                )}
                {activeStop.id === 'kyoto' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Отель у вокзала JR Kyoto, экскурсия в Золотой павильон, замок Нидзё, ворота Фусими Инари и свободный день.
                  </p>
                )}
                {activeStop.id === 'nara' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Экскурсионный выезд в Нару, парк священных ручных оленей и великий храм Тодайдзи с Большим Буддой.
                  </p>
                )}
                {activeStop.id === 'osaka' && (
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Прямой скоростной экспресс JR Haruka по морскому мосту прямо в терминал аэропорта Кансай (KIX) за 75 минут.
                  </p>
                )}
              </div>
            </div>

            {/* Быстрые кнопки выбора внизу */}
            <div>
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

        </div>
      </div>
    </section>
  );
};