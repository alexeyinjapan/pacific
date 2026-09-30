import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/tourData';
import { MapPin, Sparkles } from 'lucide-react';

export const RouteMap: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState<string>('shinkansen');
  const activeStop = ROUTE_STOPS.find((s) => s.id === activeStopId) || ROUTE_STOPS[0];

  return (
    <section id="map" className="py-16 lg:py-24 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Заголовок */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-2">
            <span className="font-kanji text-sm">路線図</span>
            <span>· 3D-Панорама маршрута</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Интерактивная 3D-карта путешествия
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-stone-600 font-light leading-relaxed">
            Нажмите на любую метку на карте, чтобы посмотреть достопримечательности и включенные услуги на этом участке.
          </p>
        </div>

        {/* Главная карточка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white rounded-md border border-stone-200 shadow-sm p-4 sm:p-6 lg:p-8">
          
          {/* Левая колонка: Фотореалистичная 3D-карта с интерактивными точками */}
          <div className="lg:col-span-7 relative rounded-md overflow-hidden aspect-[16/10] sm:min-h-[460px] flex items-center justify-center border border-stone-200 shadow-md group">
            
            {/* 3D Изображение высокого разрешения */}
            <img
              src="./images/japan-map-3d.jpg"
              alt="3D Карта маршрута по Японии"
              className="w-full h-full object-cover select-none"
            />

            {/* Мягкое виньетирование для глубины */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* ИНТЕРАКТИВНЫЕ ПАРЯЩИЕ МЕТКИ (Точные координаты под картинку) */}

            {/* 1. ТОКИО (Токийская башня справа) */}
            <div
              onClick={() => setActiveStopId('tokyo')}
              style={{ top: '48%', left: '73%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md transition-all ${
                activeStopId === 'tokyo'
                  ? 'bg-[#B82626] text-white ring-4 ring-red-400/40 scale-105'
                  : 'bg-white/90 text-stone-900 hover:bg-white'
              }`}>
                <span>🗼</span>
                <span>Токио</span>
              </div>
            </div>

            {/* 2. ДИСНЕЙЛЕНД (Рядом с Токийским заливом) */}
            <div
              onClick={() => setActiveStopId('disney')}
              style={{ top: '40%', left: '81%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md transition-all ${
                activeStopId === 'disney'
                  ? 'bg-[#D4AF37] text-stone-900 ring-4 ring-amber-300/50 scale-105'
                  : 'bg-white/90 text-stone-800 hover:bg-white'
              }`}>
                <span>🏰</span>
                <span className="hidden sm:inline">Диснейленд</span>
              </div>
            </div>

            {/* 3. ГОРА ФУДЗИ (Снежная вершина по центру) */}
            <div
              onClick={() => setActiveStopId('shinkansen')}
              style={{ top: '24%', left: '51%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/85 text-stone-900 shadow-md backdrop-blur-md hover:bg-white">
                <span>🗻</span>
                <span>гора Фудзи</span>
              </div>
            </div>

            {/* 4. СИНКАНСЭН (Поезд на эстакаде) */}
            <div
              onClick={() => setActiveStopId('shinkansen')}
              style={{ top: '65%', left: '54%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-md transition-all ${
                activeStopId === 'shinkansen'
                  ? 'bg-[#B82626] text-white ring-4 ring-red-400/40 scale-105'
                  : 'bg-stone-900/90 text-white hover:bg-black'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>🚄 Синкансэн</span>
              </div>
            </div>

            {/* 5. КИОТО (Пагода слева) */}
            <div
              onClick={() => setActiveStopId('kyoto')}
              style={{ top: '56%', left: '20%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md transition-all ${
                activeStopId === 'kyoto'
                  ? 'bg-[#B82626] text-white ring-4 ring-red-400/40 scale-105'
                  : 'bg-white/90 text-stone-900 hover:bg-white'
              }`}>
                <span>⛩️</span>
                <span>Киото</span>
              </div>
            </div>

            {/* 6. НАРА (Леса южнее Киото) */}
            <div
              onClick={() => setActiveStopId('nara')}
              style={{ top: '68%', left: '27%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md transition-all ${
                activeStopId === 'nara'
                  ? 'bg-[#C5A059] text-white ring-4 ring-amber-300/40 scale-105'
                  : 'bg-white/90 text-stone-900 hover:bg-white'
              }`}>
                <span>🦌</span>
                <span>Нара</span>
              </div>
            </div>

            {/* 7. ОСАКА И АЭРОПОРТ KIX (Побережье слева) */}
            <div
              onClick={() => setActiveStopId('osaka')}
              style={{ top: '54%', left: '8%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-110 active:scale-95"
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md transition-all ${
                activeStopId === 'osaka'
                  ? 'bg-[#B82626] text-white ring-4 ring-red-400/40 scale-105'
                  : 'bg-white/90 text-stone-900 hover:bg-white'
              }`}>
                <span>✈️</span>
                <span>Осака KIX</span>
              </div>
            </div>
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