import React from 'react';
import { Compass, Building2, TrainFront, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  const cards = [
    {
      num: "01",
      kanji: "案内",
      kanjiTitle: "Гид и погружение",
      title: "Экскурсии с персональным гидом",
      subtitle: "3 насыщенных полных дня в сопровождении русскоязычного японоведа",
      icon: Compass,
      description: "Живой, глубокий диалог с культурой вместо сухих дат из путеводителя. Лицензированный гид покажет скрытые святилища, поможет понять японский этикет, проведет без очередей по закрытым тропам Киото и подскажет лучшие гастрономические жемчужины.",
      bullets: [
        "Токио: от самурайского Эдо до неоновой Сибуи и Гинзы",
        "Древняя столица Нара и священный парк ручных оленей",
        "Киото: Золотой павильон, замок Нидзё, ворота Фусими Инари и Гион",
        "Индивидуальный подход и адаптация темпа под группу"
      ]
    },
    {
      num: "02",
      kanji: "宿憩",
      kanjiTitle: "Комфорт и сон",
      title: "Премиальное проживание в центрах",
      subtitle: "6 ночей с обильными горячими завтраками в отелях 3*–4*",
      icon: Building2,
      description: "Локация решает всё. Вы живете там, где бьется сердце Японии: в пешей доступности от модных кварталов и главных транспортных артерий. Никаких утомительных поездок с окраин — вы в центре событий с первой до последней минуты.",
      bullets: [
        "3 ночи в Токио: Sotetsu Fresa Inn Ginza Nanachome у витрин Гинзы",
        "3 ночи в Киото: Sotetsu Fresa Inn у южного выхода вокзала JR Kyoto",
        "Ортопедические кровати премиум-класса Simmons и косметика DHC",
        "Шведский стол с японскими и европейскими блюдами каждое утро"
      ]
    },
    {
      num: "03",
      kanji: "直行",
      kanjiTitle: "Безупречный путь",
      title: "Логистика «под ключ» без забот",
      subtitle: "Синкансэн, экспресс Haruka, трансферы и входные билеты внутри",
      icon: TrainFront,
      description: "Транспортная система Японии совершенна, но может показаться сложной иностранцу. Мы полностью берем логистику на себя: скоростные билеты с забронированными местами, доставка багажа, трансферы и безлимитный билет в Диснейленд.",
      bullets: [
        "Синкансэн Токио → Киото (285 км/ч) с традиционным ланчем экибэн",
        "Билет на скоростной экспресс JR Haruka прямо в аэропорт KIX",
        "Входной билет 1-Day Passport в Tokyo Disneyland на все аттракционы",
        "Транспортные карты IC (Suica/Pasmo) и входные билеты во все храмы"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#F9F8F6] text-[#1C1C1E] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Heading with Editorial Concept */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B82626] mb-3">
            <span className="font-kanji text-sm">三大特長</span>
            <span>· Ключевые преимущества тура</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 text-balance leading-tight">
            Продуман до мельчайших деталей: комфорт, глубина и свобода
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Мы объединили динамику современного Токио, неспешное созерцание храмов Киото и безупречную организацию, которой славится Япония.
          </p>
        </div>

        {/* 3 Marquee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="group relative flex flex-col justify-between rounded-sm border border-stone-200/90 bg-white p-8 lg:p-10 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B82626]/30"
              >
                {/* Background Kanji Watermark */}
                <div className="absolute top-6 right-6 font-kanji text-4xl font-light text-stone-100 select-none group-hover:text-stone-200/80 transition-colors pointer-events-none">
                  {card.kanji}
                </div>

                <div>
                  {/* Human Editorial Numbering */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-bold text-[#B82626]">
                      {card.num}
                    </span>
                    <div className="p-2.5 rounded-sm bg-stone-50 border border-stone-100 text-stone-800 group-hover:bg-[#B82626]/10 group-hover:text-[#B82626] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-stone-900 mb-2 leading-snug group-hover:text-[#B82626] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-4">
                    {card.subtitle}
                  </p>

                  <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-6 border-t border-stone-100">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#B82626] shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
