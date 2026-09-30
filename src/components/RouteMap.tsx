import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { MapPin, Sparkles, Navigation } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  return (
    <section id="map" className="py-16 lg:py-24 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-2">
            <span className="font-kanji text-sm">路線図</span>
            <span>· Интерактивный маршрут тура</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Карта путешествия: Токио • Киото • Нара • Осака
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-stone-600 font-light leading-relaxed">
            Нажмите на любую локацию на карте, чтобы посмотреть достопримечательности и включенные услуги на этом участке.
          </p>
        </div>

        {/* Интерактивная карточка: Слева карта, справа детали */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-md border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8">
          
          {/* Левая колонка: Живая анимированная карта (7 колонок) */}
          <div className="lg:col-span-7 relative bg-[#0D1117] rounded-md p-2 sm:p-4 overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center border border-stone-800">
            {/* Сетка координат и декоративный шум */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute top-3 left-4 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5">
              <Navigation className="h-3 w-3 animate-spin text-[#B82626]" style={{ animationDuration: '8s' }} />
              <span>Хонсю • Главная линия Токайдо</span>
            </div>

            {/* SVG КАРТА ЯПОНИИ С ЖИВОЙ АНИМАЦИЕЙ */}
            <svg
              viewBox="0 0 850 520"
              className="w-full h-full max-h-[460px] select-none"
              style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
            >
              <defs>
                {/* Золотисто-красный градиент трассы */}
                <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B82626" />
                  <stop offset="50%" stopColor="#E0C179" />
                  <stop offset="100%" stopColor="#B82626" />
                </linearGradient>

                {/* Свечение */}
                <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. РЕАЛИСТИЧНЫЙ КОНТУР ГЛАВНОГО ОСТРОВА ХОНСЮ (Токио, Идзу, Осака, Бива) */}
              <path
                d="M 100,430 
                   C 140,430 190,440 230,445 
                   C 260,450 280,410 320,400 
                   C 360,390 380,420 420,425 
                   C 460,430 490,390 530,370 
                   C 570,350 610,360 650,330 
                   C 700,300 760,280 790,220 
                   C 810,180 780,160 740,170 
                   C 700,180 660,150 620,160 
                   C 570,170 540,210 490,220 
                   C 430,230 380,250 330,280 
                   C 280,310 230,315 180,340 
                   C 130,365 90,390 100,430 Z"
                fill="#161B22"
                stroke="#2B3240"
                strokeWidth="2"
              />

              {/* Озеро Бива (возле Киото) */}
              <ellipse cx="380" cy="305" rx="16" ry="24" fill="#0D1117" stroke="#2B3240" strokeWidth="1" />

              {/* 2. ТРАССА СИНКАНСЭНА (ФИЗИЧЕСКАЯ ДОРОГА) */}
              <path
                id="shinkansenLine"
                d="M 680,265 C 570,315 470,335 370,350 L 280,410"
                fill="none"
                stroke="#2A2F3D"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Анимированные светящиеся шпалы */}
              <path
                d="M 680,265 C 570,315 470,335 370,350 L 280,410"
                fill="none"
                stroke="url(#trackGrad)"
                strokeWidth="3.5"
                strokeDasharray="10 8"
                className="animate-[dash_12s_linear_infinite]"
              />

              {/* Ветки в Диснейленд и Нару */}
              <line x1="680" y1="265" x2="735" y2="245" stroke="#E0C179" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="370" y1="350" x2="395" y2="400" stroke="#E0C179" strokeWidth="2.5" strokeDasharray="4 4" />

              {/* 3. ЖИВОЙ ПОЕЗД СИНКАНСЭН, КОТОРЫЙ ФИЗИЧЕСКИ ЕДЕТ ПО КАРТЕ! */}
              <g>
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M 680,265 C 570,315 470,335 370,350 L 280,410"
                />
                {/* Корпус поезда */}
                <rect x="-14" y="-4" width="28" height="8" rx="4" fill="#FFFFFF" filter="url(#neonGlow)" />
                <rect x="-10" y="-3" width="20" height="2" fill="#0066CC" />
                <circle cx="12" cy="0" r="3" fill="#FFE57F" filter="url(#neonGlow)" />
              </g>

              {/* 4. ГОРА ФУДЗИ (КРУПНАЯ СНЕЖНАЯ ШАПКА И ОБЛАКА) */}
              <g transform="translate(540, 260)" className="cursor-pointer" onClick={() => setActiveStopId('shinkansen')}>
                {/* Тень горы */}
                <polygon points="0,-36 32,18 -32,18" fill="#1C212E" stroke="#374151" strokeWidth="1.5" />
                {/* Снежная шапка */}
                <polygon points="0,-36 12,-12 -12,-12" fill="#FFFFFF" filter="url(#neonGlow)" />
                <polygon points="0,-36 12,-12 6,-6 -6,-6 -12,-12" fill="#E2E8F0" />
                <text x="0" y="32" fill="#E0C179" fontSize="12" fontWeight="bold" textAnchor="middle">
                  🗻 гора Фудзи
                </text>
              </g>

              {/* 5. ИНТЕРАКТИВНЫЕ ЛОКАЦИИ С КРУПНЫМИ АРТ-ИКОНКАМИ */}

              {/* ТОКИО: Башня Токио */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('tokyo')}
                transform="translate(680, 265)"
              >
                {activeStopId === 'tokyo' && (
                  <circle r="22" fill="#B82626" opacity="0.35" className="animate-ping" />
                )}
                <circle r={activeStopId === 'tokyo' ? "14" : "10"} fill="#B82626" stroke="#FFFFFF" strokeWidth="2.5" />
                {/* Иконка башни */}
                <text x="0" y="-18" fontSize="22" textAnchor="middle">🗼</text>
                <text x="0" y="24" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Токио
                </text>
                <text x="0" y="36" fill="#A0AEC0" fontSize="10" textAnchor="middle">
                  Дни 1–3
                </text>
              </g>

              {/* ДИСНЕЙЛЕНД: Сказочный Замок */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('disney')}
                transform="translate(735, 245)"
              >
                {activeStopId === 'disney' && (
                  <circle r="18" fill="#E0C179" opacity="0.4" className="animate-ping" />
                )}
                <circle r={activeStopId === 'disney' ? "12" : "8"} fill="#D4AF37" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="-16" fontSize="20" textAnchor="middle">🏰</text>
                <text x="14" y="4" fill="#E0C179" fontSize="11" fontWeight="semibold">
                  Диснейленд
                </text>
              </g>

              {/* КИОТО: Золотая Пагода */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('kyoto')}
                transform="translate(370, 350)"
              >
                {activeStopId === 'kyoto' && (
                  <circle r="22" fill="#B82626" opacity="0.35" className="animate-ping" />
                )}
                <circle r={activeStopId === 'kyoto' ? "14" : "10"} fill="#B82626" stroke="#FFFFFF" strokeWidth="2.5" />
                <text x="0" y="-18" fontSize="22" textAnchor="middle">⛩️</text>
                <text x="-16" y="22" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="end">
                  Киото
                </text>
                <text x="-16" y="34" fill="#A0AEC0" fontSize="10" textAnchor="end">
                  Дни 4–6
                </text>
              </g>

              {/* НАРА: Священный Олень */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('nara')}
                transform="translate(395, 400)"
              >
                {activeStopId === 'nara' && (
                  <circle r="18" fill="#E0C179" opacity="0.4" className="animate-ping" />
                )}
                <circle r={activeStopId === 'nara' ? "11" : "8"} fill="#C5A059" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="-16" fontSize="20" textAnchor="middle">🦌</text>
                <text x="16" y="4" fill="#FFFFFF" fontSize="12" fontWeight="medium">
                  Нара (Олени)
                </text>
              </g>

              {/* ОСАКА: Аэропорт KIX и Вылет */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('osaka')}
                transform="translate(280, 410)"
              >
                {activeStopId === 'osaka' && (
                  <circle r="22" fill="#B82626" opacity="0.35" className="animate-ping" />
                )}
                <circle r={activeStopId === 'osaka' ? "14" : "10"} fill="#B82626" stroke="#FFFFFF" strokeWidth="2.5" />
                <text x="0" y="-18" fontSize="22" textAnchor="middle">✈️</text>
                <text x="-14" y="20" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="end">
                  Осака KIX
                </text>
                <text x="-14" y="32" fill="#A0AEC0" fontSize="10" textAnchor="end">
                  Вылет (День 7)
                </text>
              </g>
            </svg>
          </div>

          {/* Правая колонка: Описание выбранной точки (5 колонок) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
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

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-3 mb-2">
                {activeStop.name}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4">
                {activeStop.description}
              </p>

              {/* Плашка с включенными услугами */}
              <div className="rounded-md bg-stone-50 border border-stone-200/90 p-4 space-y-2 text-xs sm:text-sm text-stone-700">
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
                    Скоростной поезд-пуля Синкансэн (Токио → Киото, 2 ч 20 мин), забронированные места и свежий ланч экибэн с видом на Фудзи.
                  </p>
                )}
                {activeStop.id === 'kyoto' && (
                  <p className="text-stone-600">
                    Отель у вокзала JR Kyoto, экскурсия в Золотой павильон, замок Нидзё, ворота Фусими Инари и свободный день.
                  </p>
                )}
                {activeStop.id === 'nara' && (
                  <p className="text-stone-600">
                    Экскурсионный выезд в Нару, парк священных ручных оленей и храм Тодайдзи с Большим Буддой.
                  </p>
                )}
                {activeStop.id === 'osaka' && (
                  <p className="text-stone-600">
                    Прямой скоростной экспресс JR Haruka в терминал аэропорта Кансай (KIX) за 75 минут.
                  </p>
                )}
              </div>
            </div>

            {/* Быстрые кнопки переключения внизу */}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-2 font-medium">
                Выберите пункт на карте:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ROUTE_STOPS.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => setActiveStopId(stop.id)}
                    className={`cursor-pointer px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
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