import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Calendar, Users, Hotel, Sparkles, ShieldCheck } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface TourCalculatorProps {
  onSuccessSubmit?: () => void;
}

export const TourCalculator: React.FC<TourCalculatorProps> = ({ onSuccessSubmit }) => {
  const config = useConfig();

  // Состояние калькулятора
  const [travelers, setTravelers] = useState<number>(2);
  const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('autumn');
  const [roomType, setRoomType] = useState<'standard' | 'superior' | 'single'>('standard');
  const [addons, setAddons] = useState<{ teaCeremony: boolean; universal: boolean; kimonoPhoto: boolean }>({
    teaCeremony: false,
    universal: false,
    kimonoPhoto: false,
  });

  // Состояние формы
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [datePreference, setDatePreference] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. ПРЯМАЯ МАТРИЦА ЦЕН ИЗ GOOGLE ТАБЛИЦЫ (БЕЗ КОЭФФИЦИЕНТОВ)
  const pricingMatrix = {
    spring: {
      standard: config.price_spring_standard,
      superior: config.price_spring_superior,
      single: config.price_spring_single,
    },
    summer: {
      standard: config.price_summer_standard,
      superior: config.price_summer_superior,
      single: config.price_summer_single,
    },
    autumn: {
      standard: config.price_autumn_standard,
      superior: config.price_autumn_superior,
      single: config.price_autumn_single,
    },
    winter: {
      standard: config.price_winter_standard,
      superior: config.price_winter_superior,
      single: config.price_winter_single,
    },
  };

  // Точная цена за 1 человека в USD под выбранный сезон и номер
  const exactTourPricePerPersonUSD = pricingMatrix[season][roomType];

  // Динамические названия сезонов
  const seasonsData = {
    spring: { title: config.season_spring_title, sub: config.season_spring_sub },
    summer: { title: config.season_summer_title, sub: config.season_summer_sub },
    autumn: { title: config.season_autumn_title, sub: config.season_autumn_sub },
    winter: { title: config.season_winter_title, sub: config.season_winter_sub },
  };

  // Динамические названия номеров
  const roomNames = {
    standard: config.room_standard_name,
    superior: config.room_superior_name,
    single: config.room_single_name,
  };

  // Расчет дополнительных услуг
  let addonsTotalUSD = 0;
  if (addons.teaCeremony) addonsTotalUSD += config.addon_tea_price;
  if (addons.universal) addonsTotalUSD += config.addon_universal_price;
  if (addons.kimonoPhoto) addonsTotalUSD += config.addon_kimono_price;

  // Итоговая точная цена (Тур + Допы)
  const estimatedPerPersonUSD = exactTourPricePerPersonUSD + addonsTotalUSD;
  const estimatedTotalUSD = estimatedPerPersonUSD * travelers;

  // Расчет в валютах агента
  const pricePerPersonPrimary = Math.round(estimatedPerPersonUSD * config.rate_to_primary).toLocaleString();
  const priceTotalPrimary = Math.round(estimatedTotalUSD * config.rate_to_primary).toLocaleString();
  const priceTotalSecondary = Math.round(estimatedTotalUSD * config.rate_to_secondary).toLocaleString();

  // Отправка заявки
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя и контактный телефон/мессенджер');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const telegramMessage = `
🔥 <b>НОВАЯ ЗАЯВКА НА ТУР В ЯПОНИЮ!</b>
━━━━━━━━━━━━━━━━━━
👤 <b>Имя клиента:</b> ${name}
📞 <b>Контакты:</b> ${contact}
📅 <b>Даты поездки:</b> ${datePreference || 'Не указаны'}
💬 <b>Пожелания:</b> ${notes || 'Нет'}

🇯🇵 <b>ПАРАМЕТРЫ ИЗ КАЛЬКУЛЯТОРА:</b>
• <b>Человек:</b> ${travelers} чел.
• <b>Сезон:</b> ${seasonsData[season].title} (${seasonsData[season].sub})
• <b>Номер:</b> ${roomNames[roomType]}
• <b>Чайная церемония:</b> ${addons.teaCeremony ? `✅ Да (+${config.currency_primary_symbol}${Math.round(config.addon_tea_price * config.rate_to_primary)})` : '❌ Нет'}
• <b>Universal Studios:</b> ${addons.universal ? `✅ Да (+${config.currency_primary_symbol}${Math.round(config.addon_universal_price * config.rate_to_primary)})` : '❌ Нет'}
• <b>Фотосессия в кимоно:</b> ${addons.kimonoPhoto ? `✅ Да (+${config.currency_primary_symbol}${Math.round(config.addon_kimono_price * config.rate_to_primary)})` : '❌ Нет'}

💰 <b>ФИНАНСОВЫЙ РАСЧЕТ:</b>
• <b>На 1 человека:</b> ${config.currency_primary_symbol}${pricePerPersonPrimary}
• <b>ИТОГО ЗА ВСЕХ:</b> <b>${config.currency_primary_symbol}${priceTotalPrimary}</b> (≈ ${config.currency_secondary_symbol}${priceTotalSecondary})
━━━━━━━━━━━━━━━━━━
⏰ <i>${new Date().toLocaleString('ru-RU')}</i>
    `.trim();

    try {
      // 1. Отправка в Telegram
      const tgPromise = fetch(`https://api.telegram.org/bot${config.telegram_bot_token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.telegram_chat_id,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      });

      // 2. Отправка на почту
      const formData = new FormData();
      formData.append("access_key", config.web3forms_key);
      formData.append("subject", `🔥 Заявка: ${name} (${travelers} чел. / ${config.currency_primary_symbol}${priceTotalPrimary})`);
      formData.append("from_name", config.company_name);
      formData.append("Client_Name", name);
      formData.append("Contact_Info", contact);
      formData.append("Total_Price", `${config.currency_primary_symbol}${priceTotalPrimary}`);
      formData.append("message", telegramMessage.replace(/<[^>]*>?/gm, ''));

      const web3Promise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      await Promise.all([tgPromise, web3Promise]);

      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setIsSubmitting(false);
      setErrorMessage('Ошибка соединения при отправке. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#121214] text-white relative">
      <div className="absolute top-10 right-10 font-kanji text-[140px] text-white/5 pointer-events-none select-none">
        見積
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E0C179] mb-3">
            <span className="font-kanji text-sm">個別見積</span>
            <span>· Калькулятор и заявка на тур</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
            Рассчитайте стоимость тура и забронируйте даты
          </h2>
          <p className="mt-3 text-base text-stone-300 font-light">
            Укажите параметры поездки, чтобы получить предварительный расчет и консультацию компании {config.company_name}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/5 border border-white/10 rounded-sm p-6 sm:p-10 backdrop-blur-md">
          {/* Левая колонка: Калькулятор */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E0C179] mb-6 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Параметры поездки:</span>
              </div>

              {/* 1. Количество человек */}
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

              {/* 2. Сезоны */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#E0C179]" />
                  <span>Сезон поездки:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['spring', 'summer', 'autumn', 'winter'] as const).map((sKey) => (
                    <button
                      key={sKey}
                      type="button"
                      onClick={() => setSeason(sKey)}
                      className={`cursor-pointer p-2.5 rounded-sm text-left border transition-all ${
                        season === sKey
                          ? 'bg-[#B82626] border-[#B82626] text-white shadow-xs'
                          : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-semibold">{seasonsData[sKey].title}</div>
                      <div className="text-[10px] opacity-75">{seasonsData[sKey].sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Номера */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-medium flex items-center gap-1.5">
                  <Hotel className="h-3.5 w-3.5 text-[#E0C179]" />
                  <span>Тип номера:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: config.room_standard_name },
                    { id: 'superior', label: config.room_superior_name },
                    { id: 'single', label: config.room_single_name },
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
                      <div className="text-xs font-semibold leading-tight">{r.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Дополнительные услуги */}
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
                      <span className="text-stone-200">{config.addon_tea_name}</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">
                      +{config.currency_primary_symbol}{Math.round(config.addon_tea_price * config.rate_to_primary)} / чел
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.universal}
                        onChange={(e) => setAddons({ ...addons, universal: e.target.checked })}
                        className="rounded-xs accent-[#B82626]"
                      />
                      <span className="text-stone-200">{config.addon_universal_name}</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">
                      +{config.currency_primary_symbol}{Math.round(config.addon_universal_price * config.rate_to_primary)} / чел
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.kimonoPhoto}
                        onChange={(e) => setAddons({ ...addons, kimonoPhoto: e.target.checked })}
                        className="rounded-xs accent-[#B82626]"
                      />
                      <span className="text-stone-200">{config.addon_kimono_name}</span>
                    </div>
                    <span className="text-[#E0C179] font-mono">
                      +{config.currency_primary_symbol}{Math.round(config.addon_kimono_price * config.rate_to_primary)}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Итоговая стоимость */}
            <div className="pt-6 border-t border-white/10 bg-black/40 p-5 rounded-sm border border-white/10">
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                Ориентировочная стоимость:
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#E0C179] font-mono tabular-nums">
                  {config.currency_primary_symbol}{pricePerPersonPrimary}
                </span>
                <span className="text-xs text-stone-400">/ человек</span>
                <span className="text-xs text-stone-500 font-mono">
                  (Итого за {travelers} чел: {config.currency_primary_symbol}{priceTotalPrimary} · ≈ {config.currency_secondary_symbol}{priceTotalSecondary})
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 font-light">
                *Включает 6 ночей с завтраками, Синкансэн, билеты в Диснейленд, 3 дня с гидом и все трансферы. Финальный расчет фиксируется в договоре.
              </p>
            </div>
          </div>

          {/* Правая колонка: Форма заявки */}
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
                  Ваша заявка передана ведущему специалисту компании {config.company_name}. Мы свяжемся с вами в течение 30 минут с подробной сметой.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={config.whatsapp_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Написать в WhatsApp</span>
                  </a>

                  <a
                    href={config.telegram_link}
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

                <div className="pt-3 flex items-start gap-2.5 text-[11px] text-stone-400 font-light">
                  <ShieldCheck className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                  <span>
                    Лицензированный туроператор {config.company_name}. Конфиденциальность гарантируется.
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