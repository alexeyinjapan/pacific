import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { MapPin, Sparkles, Compass } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  return (
    <section id="map" className="py-16 lg:py-24 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Заголовок */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-2">
            <span className="font-kanji text-sm">立体路線図</span>
            <span>· 3D-Диорама путешествия</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Интерактивная 3D-карта маршрута
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-stone-600 font-light leading-relaxed">
            Полноценная панорама острова Хонсю: от сверкающего залива Токио мимо заснеженной Фудзи до древних садов Киото и побережья Осаки.
          </p>
        </div>

        {/* Главная карточка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-md border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8">
          
          {/* Левая колонка: 3D-Диорама в океане (7 колонок) */}
          <div className="lg:col-span-7 relative bg-gradient-to-b from-[#DDF0F9] via-[#CEE7F6] to-[#BEDDF0] rounded-md p-2 sm:p-4 overflow-hidden min-h-[400px] sm:min-h-[480px] flex items-center justify-center border border-sky-200 shadow-inner">
            
            {/* Морская рябь и волны на фоне */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
            
            {/* Стильный компас в углу */}
            <div className="absolute top-4 left-4 text-sky-800/80 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
              <Compass className="h-3.5 w-3.5 text-[#B82626] animate-spin" style={{ animationDuration: '20s' }} />
              <span>Тихий океан • Линия Токайдо</span>
            </div>

            {/* ОБЪЕМНАЯ 3D SVG КАРТА-ДИОРАМА */}
            <svg
              viewBox="0 0 900 560"
              className="w-full h-full max-h-[500px] select-none"
              style={{ filter: 'drop-shadow(0 16px 32px rgba(18,52,86,0.18))' }}
            >
              <defs>
                {/* 3D Тени острова */}
                <filter id="islandShadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="18" stdDeviation="12" floodColor="#183B56" floodOpacity="0.25" />
                </filter>

                {/* Градиент рельефа (зеленые долины и осенние золотые клёны) */}
                <linearGradient id="landscapeGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#416D54" />   {/* Кансай: кедровые леса */}
                  <stop offset="45%" stopColor="#A87A42" />  {/* Центральный Хонсю: золотые клены */}
                  <stop offset="70%" stopColor="#8F3C34" />  {/* Район Хаконэ: багряные момидзи */}
                  <stop offset="100%" stopColor="#4A6E5A" /> {/* Долина Канто / Токио */}
                </linearGradient>

                {/* Градиент скального обрыва (3D-глубина острова) */}
                <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#283A30" />
                  <stop offset="100%" stopColor="#15211B" />
                </linearGradient>

                {/* Золотая неоновая нить синкансэна */}
                <linearGradient id="railGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B82626" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#B82626" />
                </linearGradient>

                <filter id="glowBadge" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* 1. ПОДВОДНЫЕ РИФЫ И МЕЛКОВОДЬЕ (ЭФФЕКТ ПРОЗРАЧНОЙ ВОДЫ) */}
              <path
                d="M 110,430 C 160,450 240,460 330,440 C 430,440 500,420 570,390 C 650,370 730,320 780,260 C 820,210 800,160 740,160 C 660,150 560,190 480,210 C 370,230 260,300 170,360 Z"
                fill="#A6D5EE"
                opacity="0.6"
              />

              {/* 2. 3D ОБЪЕМНЫЙ СРЕЗ ЗЕМЛИ (ОБРЫВЫ СКАЛ ПОД ВОДОЙ) */}
              <path
                d="M 130,430 
                   C 180,455 260,465 340,445 
                   C 420,445 490,425 560,395 
                   C 630,375 710,335 760,275 
                   L 760,305 
                   C 710,365 630,405 560,425 
                   C 490,455 420,475 340,475 
                   C 260,495 180,485 130,460 Z"
                fill="url(#cliffGrad)"
                filter="url(#islandShadow)"
              />

              {/* 3. ВЕРХНЯЯ 3D-ПОВЕРХНОСТЬ ОСТРОВА ХОНСЮ (С РЕЛЬЕФОМ И ЗАЛИВАМИ) */}
              <path
                d="M 130,430 
                   C 170,410 220,425 260,420 
                   C 280,390 310,380 340,395 
                   C 370,415 400,390 435,400 
                   C 475,410 510,375 550,360 
                   C 600,345 640,350 675,320 
                   C 725,290 770,265 760,230 
                   C 745,180 705,170 670,180 
                   C 630,190 595,165 560,175 
                   C 515,190 485,220 440,230 
                   C 385,245 340,265 295,295 
                   C 250,325 210,335 170,360 
                   C 130,385 110,410 130,430 Z"
                fill="url(#landscapeGrad)"
                stroke="#6B937A"
                strokeWidth="2"
              />

              {/* Озеро Бива в Киото (Голубая гладь воды) */}
              <ellipse cx="385" cy="325" rx="14" ry="22" fill="#6FB5DB" stroke="#3D7D9F" strokeWidth="1" />

              {/* Залив Осака (морская лагуна) */}
              <ellipse cx="260" cy="415" rx="20" ry="12" fill="#CEE7F6" opacity="0.8" />

              {/* Токийский залив */}
              <path d="M 685,275 C 670,290 690,310 705,295 Z" fill="#CEE7F6" opacity="0.9" />

              {/* 4. ГОРА ФУДЗИ — ОБЪЕМНАЯ 3D СВЯЩЕННАЯ ПИРАМИДА */}
              <g transform="translate(560, 260)" className="cursor-pointer group" onClick={() => setActiveStopId('shinkansen')}>
                {/* 3D тень от Фудзи */}
                <ellipse cx="6" cy="18" rx="28" ry="8" fill="#1C3024" opacity="0.3" />
                {/* Левый освещенный склон */}
                <polygon points="0,-44 28,16 0,16" fill="#4A5C6A" />
                {/* Правый затененный склон */}
                <polygon points="0,-44 0,16 -28,16" fill="#364551" />
                {/* 3D Снежная сверкающая шапка */}
                <polygon points="0,-44 14,-16 0,-12" fill="#FFFFFF" />
                <polygon points="0,-44 0,-12 -14,-16" fill="#E6EEF4" />
                {/* Флажок Фудзи */}
                <rect x="-38" y="24" width="76" height="18" rx="9" fill="#FFFFFF" filter="url(#glowBadge)" />
                <text x="0" y="37" fill="#B82626" fontSize="11" fontWeight="bold" textAnchor="middle">
                  🗻 гора Фудзи
                </text>
              </g>

              {/* 5. 3D-ЭСТАКАДА СИНКАНСЭНА И МЧАЩИЙСЯ ПОЕЗД */}
              {/* Бетонная опора эстакады */}
              <path
                d="M 690,265 C 590,305 480,335 380,350 L 285,410"
                fill="none"
                stroke="#A0AEC0"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.6"
              />
              {/* Скоростные рельсы */}
              <path
                id="shinkansen3DTrack"
                d="M 690,265 C 590,305 480,335 380,350 L 285,410"
                fill="none"
                stroke="url(#railGlow)"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                className="animate-[dash_10s_linear_infinite]"
              />

              {/* БЕЛЫЙ СИНКАНСЭН, МЧАЩИЙСЯ ПО 3D ТРАССЕ */}
              <g>
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M 690,265 C 590,305 480,335 380,350 L 285,410"
                />
                {/* 3D Корпус поезда */}
                <rect x="-16" y="-6" width="32" height="12" rx="5" fill="#FFFFFF" stroke="#004499" strokeWidth="1.5" />
                <rect x="-10" y="-3" width="22" height="3" fill="#0066CC" />
                {/* Фары */}
                <circle cx="15" cy="0" r="3" fill="#FFE57F" />
              </g>

              {/* 6. ПАРЯЩИЕ ОБЪЕМНЫЕ ОБЛАКА НАД ОКЕАНОМ */}
              {/* Облако 1 у Токио */}
              <g className="animate-pulse" style={{ animationDuration: '5s' }} transform="translate(740, 160)">
                <ellipse cx="0" cy="0" rx="35" ry="14" fill="#FFFFFF" opacity="0.85" filter="url(#glowBadge)" />
                <ellipse cx="-12" cy="-6" rx="20" ry="12" fill="#FFFFFF" opacity="0.9" />
              </g>

              {/* Облако 2 у Осаки */}
              <g className="animate-pulse" style={{ animationDuration: '7s' }} transform="translate(200, 440)">
                <ellipse cx="0" cy="0" rx="40" ry="15" fill="#FFFFFF" opacity="0.85" filter="url(#glowBadge)" />
                <ellipse cx="14" cy="-5" rx="24" ry="12" fill="#FFFFFF" opacity="0.9" />
              </g>

              {/* 7. ПАРЯЩИЕ 3D МЕТКИ ЛОКАЦИЙ (БОЛЬШИЕ, ЯРКИЕ, УДОБНЫЕ) */}

              {/* ТОКИО (Башня) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('tokyo')}
                transform="translate(690, 260)"
              >
                {activeStopId === 'tokyo' && <circle r="26" fill="#B82626" opacity="0.3" className="animate-ping" />}
                {/* Парящая белая плашка */}
                <rect x="-42" y="-52" width="84" height="42" rx="10" fill="#FFFFFF" stroke="#B82626" strokeWidth="2.5" filter="url(#glowBadge)" />
                <text x="0" y="-30" fontSize="18" textAnchor="middle">🗼</text>
                <text x="0" y="-16" fill="#1C1C1E" fontSize="11" fontWeight="bold" textAnchor="middle">Токио</text>
                {/* Луч в землю */}
                <line x1="0" y1="-10" x2="0" y2="4" stroke="#B82626" strokeWidth="2.5" />
                <circle cx="0" cy="4" r="4" fill="#B82626" />
              </g>

              {/* ДИСНЕЙЛЕНД (Замок) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('disney')}
                transform="translate(755, 230)"
              >
                {activeStopId === 'disney' && <circle r="22" fill="#D4AF37" opacity="0.3" className="animate-ping" />}
                <rect x="-44" y="-48" width="88" height="38" rx="8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" filter="url(#glowBadge)" />
                <text x="-26" y="-23" fontSize="16">🏰</text>
                <text x="10" y="-24" fill="#8C6B1F" fontSize="10" fontWeight="bold" textAnchor="middle">Диснейленд</text>
                <line x1="0" y1="-10" x2="0" y2="4" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="0" cy="4" r="3.5" fill="#D4AF37" />
              </g>

              {/* КИОТО (Храм и Пагода) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('kyoto')}
                transform="translate(375, 340)"
              >
                {activeStopId === 'kyoto' && <circle r="26" fill="#B82626" opacity="0.3" className="animate-ping" />}
                <rect x="-42" y="-52" width="84" height="42" rx="10" fill="#FFFFFF" stroke="#B82626" strokeWidth="2.5" filter="url(#glowBadge)" />
                <text x="0" y="-30" fontSize="18" textAnchor="middle">⛩️</text>
                <text x="0" y="-16" fill="#1C1C1E" fontSize="11" fontWeight="bold" textAnchor="middle">Киото</text>
                <line x1="0" y1="-10" x2="0" y2="4" stroke="#B82626" strokeWidth="2.5" />
                <circle cx="0" cy="4" r="4" fill="#B82626" />
              </g>

              {/* НАРА (Священный Олень) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('nara')}
                transform="translate(415, 395)"
              >
                {activeStopId === 'nara' && <circle r="22" fill="#D4AF37" opacity="0.3" className="animate-ping" />}
                <rect x="-40" y="-48" width="80" height="38" rx="8" fill="#FFFFFF" stroke="#C5A059" strokeWidth="2" filter="url(#glowBadge)" />
                <text x="-22" y="-24" fontSize="16">🦌</text>
                <text x="12" y="-24" fill="#684D1A" fontSize="10" fontWeight="bold" textAnchor="middle">Нара</text>
                <line x1="0" y1="-10" x2="0" y2="4" stroke="#C5A059" strokeWidth="2" />
                <circle cx="0" cy="4" r="3.5" fill="#C5A059" />
              </g>

              {/* ОСАКА (Аэропорт и вылет) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveStopId('osaka')}
                transform="translate(280, 400)"
              >
                {activeStopId === 'osaka' && <circle r="26" fill="#B82626" opacity="0.3" className="animate-ping" />}
                <rect x="-48" y="-52" width="96" height="42" rx="10" fill="#FFFFFF" stroke="#B82626" strokeWidth="2.5" filter="url(#glowBadge)" />
                <text x="0" y="-30" fontSize="18" textAnchor="middle">✈️</text>
                <text x="0" y="-16" fill="#1C1C1E" fontSize="11" fontWeight="bold" textAnchor="middle">Осака KIX</text>
                <line x1="0" y1="-10" x2="0" y2="4" stroke="#B82626" strokeWidth="2.5" />
                <circle cx="0" cy="4" r="4" fill="#B82626" />
              </g>
            </svg>
          </div>

          {/* Правая колонка: Детали выбранного пункта */}
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

              {/* Что включено */}
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
                    Скоростной поезд-пуля Синкансэн (Токио → Киото, 2 ч 20 мин), забронированные места и свежий ланч экибэн с панорамой горы Фудзи.
                  </p>
                )}
                {activeStop.id === 'kyoto' && (
                  <p className="text-stone-600">
                    Отель у вокзала JR Kyoto, экскурсия в Золотой павильон, замок Нидзё, ворота Фусими Инари и свободный день.
                  </p>
                )}
                {activeStop.id === 'nara' && (
                  <p className="text-stone-600">
                    Экскурсионный выезд в Нару, парк священных ручных оленей и великий храм Тодайдзи с Большим Буддой.
                  </p>
                )}
                {activeStop.id === 'osaka' && (
                  <p className="text-stone-600">
                    Прямой скоростной экспресс JR Haruka в терминал аэропорта Кансай (KIX) за 75 минут.
                  </p>
                )}
              </div>
            </div>

            {/* Кнопки переключения локаций */}
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