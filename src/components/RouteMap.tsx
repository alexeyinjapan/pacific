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

        {/* Главная карточка: Двухколоночный Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-xl border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8 items-start">
          
          {/* Левая колонка: Карта (7 колонок из 12) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-stone-200 shadow-md bg-sky-100 select-none">
              
              {/* Фотография 3D-карты */}
              <img
                src="/images/japan-map-3d.jpg"
                alt="3D Карта тура по Японии"
                className="w-full h-full object-cover block pointer-events-none"
              />

              {/* Плашка компаса в углу */}
              <div className="absolute top-3 left-3 text-stone-800 text-[10px] sm:text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs z-20 pointer-events-none">
                <Navigation className="h-3 w-3 text-[#B82626] animate-spin" style={{ animationDuration: '24s' }} />
                <span>Хонсю • Линия Синкансэн Токайдо</span>
              </div>

              {/* SVG-СЛОЙ: ТОЛЬКО ЖИВОЙ ПОЕЗД И ЗОЛОТАЯ ЛИНИЯ МОСТА */}
              <svg
                viewBox="0 0 1000 562"
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <defs>
                  {/* Луч света от фар поезда */}
                  <linearGradient id="headlightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
                  </linearGradient>

                  {/* Золотая трасса на мосту */}
                  <linearGradient id="bridgeRail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFE066" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* ТОЧНЕЙШАЯ ТРАЕКТОРИЯ БЕЛОГО МОСТА НА ВАШЕМ ФОТО */}
                {/* От башни Токио (715, 278) -> плавно через правые клены (600, 310) -> нижняя точка у воды у Фудзи (490, 332) -> изгиб через левые клены (370, 288) -> Пагода (240, 285) */}
                <path
                  id="shinkansenBridgeTrack"
                  d="M 715,278 C 630,290 560,332 490,332 C 420,332 315,275 240,285"
                  fill="none"
                  stroke="url(#bridgeRail)"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                {/* ЖИВОЙ СИНКАНСЭН С ФАРАМИ СТРОГО НА РЕЛЬСАХ */}
                <g>
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path="M 715,278 C 630,290 560,332 490,332 C 420,332 315,275 240,285"
                  />
                  {/* Луч света фар вперед */}
                  <polygon points="12,0 46,-8 46,8" fill="url(#headlightGlow)" />
                  {/* Корпус поезда N700S */}
                  <rect x="-14" y="-4.5" width="28" height="9" rx="4" fill="#FFFFFF" stroke="#004499" strokeWidth="1.2" />
                  <rect x="-8" y="-1.5" width="18" height="2" fill="#0066CC" />
                  <circle cx="12" cy="0" r="2" fill="#FFF9C4" />
                </g>
              </svg>

              {/* ИНТЕРАКТИВНЫЕ МЕТКИ: ЧИСТЫЙ HTML (БОЛЬШЕ НИКАКИХ НАЛОЖЕНИЙ БУКВ НА ИКОНКИ!) */}
              <div className="absolute inset-0 z-20 pointer-events-auto">

                {/* 1. ТОКИО: над красной башней */}
                <button
                  onClick={() => setActiveStopId('tokyo')}
                  style={{ left: '71.5%', top: '48%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md ${
                    activeStopId === 'tokyo'
                      ? 'bg-white ring-2 ring-[#B82626] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-sm">🗼</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Токио</span>
                </button>

                {/* 2. ДИСНЕЙЛЕНД: побережье чуть выше Токио */}
                <button
                  onClick={() => setActiveStopId('disney')}
                  style={{ left: '78.5%', top: '38%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-2 py-0.5 rounded-full shadow-md ${
                    activeStopId === 'disney'
                      ? 'bg-white ring-2 ring-[#D4AF37] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-xs">🏰</span>
                  <span className="text-[11px] font-bold text-amber-900 whitespace-nowrap">Дисней</span>
                </button>

                {/* 3. ГОРА ФУДЗИ: строго над белой шапкой вулкана */}
                <button
                  onClick={() => setActiveStopId('shinkansen')}
                  style={{ left: '52%', top: '24%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-3 py-1 rounded-full shadow-md ${
                    activeStopId === 'shinkansen'
                      ? 'bg-white ring-2 ring-[#B82626] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-sm">🗻</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Фудзияма</span>
                </button>

                {/* 4. КИОТО: строго над пагодой слева */}
                <button
                  onClick={() => setActiveStopId('kyoto')}
                  style={{ left: '22.5%', top: '48%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md ${
                    activeStopId === 'kyoto'
                      ? 'bg-white ring-2 ring-[#B82626] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-sm">⛩️</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Киото</span>
                </button>

                {/* 5. НАРА: южнее моста в зеленых холмах */}
                <button
                  onClick={() => setActiveStopId('nara')}
                  style={{ left: '31%', top: '58%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-2 py-0.5 rounded-full shadow-md ${
                    activeStopId === 'nara'
                      ? 'bg-white ring-2 ring-[#C5A059] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-xs">🦌</span>
                  <span className="text-[11px] font-bold text-stone-800 whitespace-nowrap">Нара</span>
                </button>

                {/* 6. ОСАКА KIX: морская лагуна на крайнем западе */}
                <button
                  onClick={() => setActiveStopId('osaka')}
                  style={{ left: '14%', top: '56%' }}
                  className={`cursor-pointer absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md ${
                    activeStopId === 'osaka'
                      ? 'bg-white ring-2 ring-[#B82626] scale-105'
                      : 'bg-white/95 border border-stone-200'
                  }`}
                >
                  <span className="text-xs">✈️</span>
                  <span className="text-xs font-bold text-stone-900 whitespace-nowrap">Осака KIX</span>
                </button>

              </div>
            </div>
          </div>

          {/* Правая колонка: Детали пункта (5 колонок из 12) */}
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