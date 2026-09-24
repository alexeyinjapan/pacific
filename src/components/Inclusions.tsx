import React from 'react';
import { INCLUSIONS } from '../data/tourData';
import { Check, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface InclusionsProps {
  onOpenCalculator: () => void;
}

export const Inclusions: React.FC<InclusionsProps> = ({ onOpenCalculator }) => {
  return (
    <section id="inclusions" className="py-20 lg:py-28 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-3">
            <span className="font-kanji text-sm">明朗会計</span>
            <span>· Прозрачные условия</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
            Честная комплектация тура без скрытых доплат
          </h2>
          <p className="mt-3 text-base text-stone-600 font-light">
            Мы позаботились обо всех ключевых расходах: от встречи в аэропорту и билетов в Диснейленд до скоростного Синкансэна и входных билетов в замки.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Column 1: Включено в стоимость (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-stone-200/90 p-8 lg:p-10 shadow-sm relative">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-stone-900">
                    Включено в стоимость
                  </h3>
                  <span className="text-xs text-stone-500 font-light">
                    Полный базовый пакет тура «под ключ»
                  </span>
                </div>
              </div>
              <span className="font-kanji text-2xl text-emerald-700/60 font-light">包含</span>
            </div>

            <div className="space-y-4">
              {INCLUSIONS.included.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="mt-1 h-4 w-4 rounded-full bg-emerald-100/70 border border-emerald-400 flex items-center justify-center shrink-0 text-emerald-800">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-900 leading-snug">
                      {item.title}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 leading-relaxed font-light">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Не включено в стоимость (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-sm border border-stone-200/80 p-8 lg:p-10">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                  <X className="h-4 w-4 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-stone-800">
                    Не включено
                  </h3>
                  <span className="text-xs text-stone-500 font-light">
                    Оплачивается отдельно при необходимости
                  </span>
                </div>
              </div>
              <span className="font-kanji text-2xl text-stone-400 font-light">除外</span>
            </div>

            <div className="space-y-4 mb-8">
              {INCLUSIONS.notIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-1 h-4 w-4 rounded-full bg-stone-200 flex items-center justify-center shrink-0 text-stone-500">
                    <span className="text-[10px] font-bold">—</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-800 leading-snug">
                      {item.title}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 leading-relaxed font-light">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Assistance callout */}
            <div className="p-4 rounded-sm bg-amber-50/70 border border-amber-200/80 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-[#8B1515] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Помощь с авиабилетами:</span>
              </div>
              <p className="font-light leading-relaxed">
                Наш авиаотдел поможет бесплатно подобрать оптимальные прямые или стыковочные рейсы (через Шанхай, Пекин, Доху или Дубай) под ваши даты.
              </p>
            </div>
          </div>
        </div>

        {/* Footnote and Calculation Prompt */}
        <div className="rounded-sm border border-stone-200 bg-stone-100/60 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="h-6 w-6 text-[#B82626] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-stone-900">
                Стоимость рассчитывается индивидуально под выбранные даты и состав группы
              </div>
              <p className="text-xs text-stone-600 mt-0.5 max-w-2xl font-light">
                Цена зависит от сезона (цветение сакуры весной, яркие клены момидзи осенью, летние фестивали или зимняя сказка) и категории номера (Standard / Superior).
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCalculator}
            className="cursor-pointer shrink-0 px-6 py-3.5 bg-[#B82626] hover:bg-[#8B1515] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Рассчитать стоимость тура</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
