import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/tourData';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, MessageSquare, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="bg-[#0D0D11] text-stone-300 border-t border-stone-800 text-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* Brand & Corporate Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <div className="text-xs text-[#E0C179] font-medium font-kanji">
              {COMPANY_INFO.japaneseName}
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-md">
              Официальный лицензированный туроператор в Токио. Создаем авторские туры по Японии с акцентом на персональный комфорт, культурную глубину и безупречную организацию без посредников.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
              <span>Лицензия туристического агентства правительства Токио No. 3-8192</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Навигация
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#itinerary" className="hover:text-[#E0C179] transition-colors">
                  Программа тура на 7 дней
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#E0C179] transition-colors">
                  Формат и преимущества
                </a>
              </li>
              <li>
                <a href="#hotels" className="hover:text-[#E0C179] transition-colors">
                  Отели в Гинзе и Киото
                </a>
              </li>
              <li>
                <a href="#inclusions" className="hover:text-[#E0C179] transition-colors">
                  Включено в стоимость
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-[#E0C179] transition-colors">
                  Интерактивная карта Синкансэн
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#E0C179] transition-colors">
                  Индивидуальный расчет стоимости
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contacts (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Контакты офиса в Токио
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-white transition-colors font-mono"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="block text-[11px] text-stone-500">
                    Пн–Вс: 09:00 – 21:00 (время Токио / JST)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#E0C179] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#E0C179] shrink-0 mt-0.5" />
                <span className="text-stone-400 text-xs leading-relaxed font-light">
                  {COMPANY_INFO.officeAddress}
                </span>
              </div>
            </div>

            {/* Messengers quick buttons */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send/?phone=819099661555`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-emerald-500 text-xs text-stone-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://t.me/olga_japan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 hover:border-sky-500 text-xs text-stone-300 hover:text-sky-400 transition-colors"
              >
                <Send className="h-3.5 w-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Все права защищены.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <span>·</span>
            <span>Made with Japanese Hospitality (Omotenashi)</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#121214] border border-white/20 p-6 rounded-sm max-w-lg w-full text-stone-300 text-xs leading-relaxed space-y-4">
            <h4 className="font-display text-lg font-bold text-white">
              Политика конфиденциальности и защита данных
            </h4>
            <p>
              Компания Pacific Partners Tokyo Co., Ltd. соблюдает Закон Японии о защите персональной информации (APPI) и международные регламенты обработки данных.
            </p>
            <p>
              Все контактные данные, передаваемые через сайт, используются исключительно для расчёта программы тура, оформления официального договора и бронирования услуг (отелей, билетов на Синкансэн, визовой поддержки). Мы гарантируем неразглашение и конфиденциальность.
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-4 py-2 bg-[#B82626] text-white text-xs font-medium rounded-xs hover:bg-[#8B1515]"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
