import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { Sparkles, Compass, Train, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  return (
    <section id="map" className="py-14 sm:py-20 lg:py-24 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Заголовок */}
        <div className="max-w-3xl mb-6 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-2">
            <span className="font-kanji text-sm">路線図</span>
            <span>· Интерактивная панорама тура</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Карта путешествия по Японии
          </h2>
          <p className="mt-2 text-xs sm:text-base text-stone-600 font-light leading-relaxed">
            Полноценный панорамный маршрут: скоростной Синкансэн вдоль побережья мимо священной Фудзиямы, святыни древнего Киото, Нара и вылет из Осаки.
          </p>
        </div>

        {/* Главная карточка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white rounded-md border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8">
          
          {/* Левая колонка: 3D Фото-диорама с живой анимацией Синкансэна (7 колонок) */}
          <div className="lg:col-span-7 relative rounded-md overflow-hidden aspect-[16/9] min-h-[340px] sm:min-h-[440px] flex items-center justify-center border border-stone-200 shadow-md bg-stone-900">
            {/* Реалистичная 3D-модель (Фоновое изображение) */}
            <img
              src="/images/japan-map-3d.jpg"
              alt="3D Карта тура по Японии"
              className="absolute inset-0 w-full h-full object-cover select-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/japan-3d-map.webp';
              }}
            />

            {/* Декоративный компас в углу */}
            <div className="absolute top-3 left-3 text-stone-900 text-[10px] sm:text-xs font-medium tracking-wide flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md z-20">
              <Compass className="h-3.5 w-3.5 text-[#B82626] animate-spin" style={{ animationDuration: '24s' }} />
              <span className="font-semibold text-stone-800">Хонсю • Линия Синкансэн Токайдо</span>
            </div>

            {/* ИНТЕРАКТИВНЫЙ SVG СЛОЙ ПОВЕРХ 3D КАРТИНКИ */}
            <svg
              viewBox="0 0 1000 562"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none"
            >
              <defs>
                {/* Тень меток */}
                <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Трасса Синкансэна между Токио и Киото/Осакой */}
              <path
                id="bridgeTrack3D"
                d="M 740,247 C 680,260 620,290 530,300 C 470,308 440,315 380,365"
                fill="none"
                stroke="#E0C179"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className="opacity-80"
              />

              {/* ЖИВОЙ СИНКАНСЭН, МЧАЩИЙСЯ ПО ТРАССЕ */}
              <g>
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M 740,247 C 680,260 620,290 530,300 C 470,308 440,315 380,365"
                />
                <g transform="translate(-16, -6)">
                  {/* Корпус поезда */}
                  <rect x="0" y="0" width="32" height="12" rx="6" fill="#FFFFFF" stroke="#003580" strokeWidth="1.5" />
                  <path d="M 22,0 Q 32,6 22,12 Z" fill="#003580" />
                  {/* Фара */}
                  <circle cx="28" cy="6" r="3" fill="#FFF9C4" filter="drop-shadow(0 0 4px #FFF)" />
                  {/* Окна поезда */}
                  <rect x="5" y="3" width="3.5" height="3" rx="0.8" fill="#003580" />
                  <rect x="10" y="3" width="3.5" height="3" rx="0.8" fill="#003580" />
                  <rect x="15" y="3" width="3.5" height="3" rx="0.8" fill="#003580" />
                </g>
              </g>

              {/* Интерактивные точки маршрута */}
              {ROUTE_STOPS.map((stop) => {
                const isSelected = activeStopId === stop.id;
                const sx = stop.coords.x * 10;
                const sy = stop.coords.y * 5.62;

                return (
                  <g
                    key={stop.id}
                    transform={`translate(${sx}, ${sy})`}
                    className="cursor-pointer pointer-events-auto transition-transform hover:scale-110"
                    onClick={() => setActiveStopId(stop.id)}
                  >
                    {/* Пульсирующий ореол для выбранной точки */}
                    {isSelected && (
                      <circle r="16" fill="#B82626" opacity="0.3" className="animate-ping" />
                    )}
                    
                    {/* Базовая метка */}
                    <circle
                      r={isSelected ? 9 : 7}
                      fill={isSelected ? '#B82626' : '#FFFFFF'}
                      stroke={isSelected ? '#FFFFFF' : '#B82626'}
                      strokeWidth={isSelected ? '2.5' : '2'}
                      filter="url(#badgeShadow)"
                    />
                    <circle
                      r={isSelected ? 4 : 2.5}
                      fill={isSelected ? '#FFFFFF' : '#B82626'}
                    />

                    {/* Плашка с названием */}
                    <g transform="translate(0, -16)">
                      <rect
                        x="-36"
                        y="-11"
                        width="72"
                        height="18"
                        rx="9"
                        fill={isSelected ? '#1C1C1E' : 'rgba(255, 255, 255, 0.92)'}
                        stroke={isSelected ? '#E0C179' : 'rgba(0,0,0,0.1)'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                        filter="url(#badgeShadow)"
                      />
                      <text
                        x="0"
                        y="1"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill={isSelected ? '#FFFFFF' : '#1C1C1E'}
                      >
                        {stop.name.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Подсказка внизу карты */}
            <div className="absolute bottom-3 right-3 text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full z-20 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#E0C179]" />
              <span>Нажмите на любую точку для деталей</span>
            </div>
          </div>

          {/* Правая колонка: Детали выбранной точки и список всех остановок (5 колонок) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Карточка активной точки */}
            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-md p-4 sm:p-5 mb-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#B82626]/10 text-[#B82626]">
                    {activeStop.days}
                  </span>
                  <span className="font-kanji text-base text-stone-500">{activeStop.kanji}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Включено в тур</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                {activeStop.name}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {activeStop.description}
              </p>
            </div>

            {/* Интерактивный список всех точек маршрута */}
            <div className="space-y-1.5 mb-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 px-1 mb-1">
                Все ключевые локации тура:
              </div>
              {ROUTE_STOPS.map((stop) => {
                const isActive = stop.id === activeStopId;
                return (
                  <button
                    key={stop.id}
                    onClick={() => setActiveStopId(stop.id)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-xs sm:text-sm flex items-center justify-between transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1C1C1E] text-white shadow-sm ring-1 ring-stone-900'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#B82626] text-white' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {ROUTE_STOPS.findIndex(s => s.id === stop.id) + 1}
                      </span>
                      <span className="font-medium truncate">{stop.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs">
                      <span className={isActive ? 'text-amber-200' : 'text-stone-400'}>
                        {stop.days}
                      </span>
                      <ArrowRight className={`h-3 w-3 ${isActive ? 'text-[#E0C179]' : 'text-stone-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Выноска про Синкансэн */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-sm flex items-start gap-2.5 text-xs text-stone-700">
              <Train className="h-4 w-4 text-[#B82626] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900">Скоростной поезд Синкансэн:</span> Токио → Киото за 2 ч 20 мин на скорости до 285 км/ч с великолепным видом на гору Фудзи.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};