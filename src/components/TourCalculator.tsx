import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, Calendar, Users, Hotel, Sparkles, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/tourData';

interface TourCalculatorProps {
  onSuccessSubmit?: () => void;
}

export const TourCalculator: React.FC<TourCalculatorProps> = ({ onSuccessSubmit }) => {
  // Calculator state
  const [travelers, setTravelers] = useState<number>(2);
  const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('autumn');
  const [roomType, setRoomType] = useState<'standard' | 'superior' | 'single'>('standard');
  const [addons, setAddons] = useState<{ teaCeremony: boolean; universal: boolean; kimonoPhoto: boolean }>({
    teaCeremony: false,
    universal: false,
    kimonoPhoto: false,
  });

  // Contact form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [datePreference, setDatePreference] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Dynamic pricing algorithm (realistic baseline for 7d/6n premium Japan tour)
  const basePricePerPerson = 1890; // USD baseline
  const seasonMultiplier = {
    spring: 1.25, // Cherry blossom peak
    summer: 1.05,
    autumn: 1.2,  // Momiji peak
    winter: 1.0,  // Winter baseline
  }[season];

  const roomMultiplier = {
    standard: 1.0,
    superior: 1.15,
    single: 1.28, // single supplement
  }[roomType];

  let addonsTotal = 0;
  if (addons.teaCeremony) addonsTotal += 65;
  if (addons.universal) addonsTotal += 85;
  if (addons.kimonoPhoto) addonsTotal += 140;

  const estimatedPerPersonUSD = Math.round(basePricePerPerson * seasonMultiplier * roomMultiplier + addonsTotal);
  const estimatedTotalUSD = estimatedPerPersonUSD * travelers;
  const estimatedTotalJPY = Math.round(estimatedTotalUSD * 155).toLocaleString('ja-JP'); // 1 USD ~ 155 JPY

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя и контактный телефон/мессенджер');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate fast reliable inquiry dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
    }, 600);
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#121214] text-white relative">
      {/* Decorative kanji watermark */}
      <div className="absolute top-10 right-10 font-kanji text-[140px] text-white/5 pointer-events-none select-none">
        見積
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E0C179] mb-3">
            <span className="font-kanji text-sm">個別見積</span>
            <span>· Калькулятор и заявка на тур</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
            Рассчитайте стоимость тура и забронируйте даты
          </h2>
          <p className="mt-3 text-base text-stone-300 font-light">
            Укажите параметры поездки, чтобы получить предварительный расчет и персональную консультацию туроператора Pacific Partners Tokyo.
          </p>
        </div>

        {/* 2-Column Calculator + Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/5 border border-white/10 rounded-sm p-6 sm:p-10 backdrop-blur-md">
          {/* Left Column: Interactive Parametric Calculator (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E0C179] mb-6 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Параметры поездки:</span>
              </div>

              {/* 1. Travelers count */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#E0C179]" />
                  <span>Количество путешественников:</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelers(num)}
                      className={`cursor-pointer py-2.5 rounded-sm text-xs font-medium border transition-all ${
                        travelers === num
                          ? 'bg-[#B82626] border-[#B82626] text-white shadow-xs'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      {num === 4 ? '4+ чел' : `${num} чел`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Season */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#E0C179]" />
                  <span>Сезон поездки:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'spring', label: 'Весна', sub: 'Сакура' },
                    { id: 'summer', label: 'Лето', sub: 'Фестивали' },
                    { id: 'autumn', label: 'Осень', sub: 'Клёны' },
                    { id: 'winter', label: 'Зима', sub: 'Фуджи & онсэн' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeason(s.id as any)}
                      className={`cursor-pointer p-2.5 rounded-sm text-left border transition-all ${
                        season === s.id
                          ? 'bg-[#B82626] border-[#B82626] text-white shadow-xs'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div className="text-[10px] opacity-75">{s.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Room Type */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Hotel className="h-3.5 w-3.5 text-[#E0C179]" />
                  <span>Тип номера:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'Standard Twin/Double', note: 'Базовый' },
                    { id: 'superior', label: 'Superior Room', note: '+ Простор' },
                    { id: 'single', label: 'Single', note: '1 человек' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoomType(r.id as any)}
                      className={`cursor-pointer p-2.5 rounded-sm text-left border transition-all ${
                        roomType === r.id
                          ? 'bg-[#B82626] border-[#B82626] text-white shadow-xs'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[10px] opacity-75">{r.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Optional Add-ons */}
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                  Дополнительные впечатления (по желанию):
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.teaCeremony}
                        onChange={(e) => setAddons({ ...addons, teaCeremony: e.target.checked })}
                        className="rounded-xs accent-[#B82626]"
                      />
                      <span className="text-stone-200">Традиционная чайная церемония в Киото</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">+$65 / чел</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.universal}
                        onChange={(e) => setAddons({ ...addons, universal: e.target.checked })}
                        className="rounded-xs accent-[#B82626]"
                      />
                      <span className="text-stone-200">Билет в Universal Studios Japan (Осака)</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">+$85 / чел</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.kimonoPhoto}
                        onChange={(e) => setAddons({ ...addons, kimonoPhoto: e.target.checked })}
                        className="rounded-xs accent-[#B82626]"
                      />
                      <span className="text-stone-200">Фотосессия в шёлковом кимоно в Киото</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">+$140</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Real-time price summary card */}
            <div className="pt-6 border-t border-white/10 bg-black/40 p-5 rounded-sm border border-white/10">
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                Ориентировочная стоимость:
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#E0C179] font-mono tabular-nums">
                  ${estimatedPerPersonUSD.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400">/ человек</span>
                <span className="text-xs text-stone-500 font-mono">
                  (Итого за {travelers} чел: ${estimatedTotalUSD.toLocaleString()} · ≈ ¥{estimatedTotalJPY})
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 font-light">
                *Включает 6 ночей с завтраками, Синкансэн, билеты в Диснейленд, 3 дня с гидом и все трансферы. Финальный расчет фиксируется в договоре.
              </p>
            </div>
          </div>

          {/* Right Column: Minimalist Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-sm flex flex-col justify-between">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Благодарим за обращение!
                </h3>
                <p className="text-sm text-stone-300 max-w-md font-light leading-relaxed">
                  Ваша заявка на расчет тура передана ведущему специалисту Pacific Partners Tokyo. Мы свяжемся с вами в течение 30 минут в рабочее время с подробной сметой и ответами на вопросы.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={`https://api.whatsapp.com/send/?phone=819099661555`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Написать в WhatsApp</span>
                  </a>

                  <a
                    href="https://t.me/olga_japan"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Написать в Telegram</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="cursor-pointer text-xs text-stone-400 hover:text-white underline pt-4"
                >
                  Отправить ещё один запрос
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Получить индивидуальный расчет тура
                  </h3>
                  <p className="text-xs text-stone-400 font-light mb-6">
                    Оставьте контакт — мы пришлем персональную программу с точными датами и вариантами перелета.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-sm text-xs text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Field: Name */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-300 block mb-1 font-medium">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например: Александр"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-[#E0C179] transition-colors"
                  />
                </div>

                {/* Field: Contact */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-300 block mb-1 font-medium">
                    Телефон / WhatsApp / Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+7 (999) 000-00-00 или @username"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-[#E0C179] transition-colors"
                  />
                </div>

                {/* Field: Dates preference */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-300 block mb-1 font-medium">
                    Желаемый месяц или точные даты
                  </label>
                  <input
                    type="text"
                    value={datePreference}
                    onChange={(e) => setDatePreference(e.target.value)}
                    placeholder="Например: Октябрь 2026 или с 18 октября"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-[#E0C179] transition-colors"
                  />
                </div>

                {/* Field: Notes */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-300 block mb-1 font-medium">
                    Пожелания к туру (по желанию)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Поездка с детьми, юбилей, особые предпочтения в еде..."
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-[#E0C179] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full py-4 bg-[#B82626] hover:bg-[#8B1515] disabled:bg-stone-700 text-white text-sm font-semibold rounded-sm shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <span>Отправка данных...</span>
                    ) : (
                      <>
                        <span>Получить индивидуальный расчет тура</span>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Reliability guarantee note */}
                <div className="pt-3 flex items-start gap-2.5 text-[11px] text-stone-400 font-light">
                  <ShieldCheck className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                  <span>
                    Лицензированный японский туроператор Pacific Partners Tokyo Co., Ltd. Конфиденциальность гарантируется. Никакого спама.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
