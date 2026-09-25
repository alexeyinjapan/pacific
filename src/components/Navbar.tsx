import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface NavbarProps {
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator }) => {
  const config = useConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Маршрут', href: '#itinerary' },
    { label: 'Преимущества', href: '#features' },
    { label: 'Отели', href: '#hotels' },
    { label: 'Что включено', href: '#inclusions' },
    { label: 'Карта тура', href: '#map' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F9F8F6]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3.5'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Логотип: подтягивается из Google Таблицы */}
        <a
          href="#"
          className={`font-display text-xl lg:text-2xl font-bold tracking-tight transition-colors ${
            scrolled ? 'text-[#1C1C1E] hover:text-[#B82626]' : 'text-white hover:text-amber-200'
          }`}
        >
          {config.header_logo_text}
        </a>

        {/* Навигационные ссылки */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors relative py-1 hover:text-[#B82626] whitespace-nowrap ${
                scrolled ? 'text-stone-700' : 'text-stone-200 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Кнопка расчета */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCalculator}
            className={`cursor-pointer group flex items-center gap-1.5 px-4 lg:px-5 py-2 text-xs lg:text-sm font-medium rounded-sm transition-all shadow-sm whitespace-nowrap ${
              scrolled
                ? 'bg-[#B82626] text-white hover:bg-[#8B1515] hover:shadow-md'
                : 'bg-white text-stone-900 hover:bg-stone-100 hover:shadow-md'
            }`}
          >
            <span>Рассчитать тур</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-sm transition-colors ${
              scrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Переключить меню"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#F9F8F6] px-6 py-6 shadow-xl text-stone-900 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-800 hover:text-[#B82626] transition-colors py-1 border-b border-stone-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full py-3 bg-[#B82626] text-white text-sm font-medium rounded-sm shadow-sm hover:bg-[#8B1515] transition-colors"
              >
                Рассчитать стоимость тура
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};