import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Itinerary } from './components/Itinerary';
import { RouteMap } from './components/RouteMap';
import { Hotels } from './components/Hotels';
import { Inclusions } from './components/Inclusions';
import { TourCalculator } from './components/TourCalculator';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MomijiCanvas } from './components/MomijiCanvas';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1C1E] selection:bg-[#B82626] selection:text-white relative">
      {/* Subtle ambient particle canvas of falling Japanese scarlet momiji leaves */}
      <MomijiCanvas />

      {/* Strict Top Bar Contract Header */}
      <Navbar onOpenCalculator={() => setIsBookingModalOpen(true)} />

      {/* Main Page Flow */}
      <main>
        {/* Section 1: Hero Block */}
        <Hero onOpenCalculator={() => setIsBookingModalOpen(true)} />

        {/* Section 2: Формат и преимущества (Быстрый обзор 3 карточки) */}
        <Features />

        {/* Section 3: Интерактивный маршрут по дням (Day-by-Day Journey 7 дней) */}
        <Itinerary />

        {/* Section 3.5: Интерактивная карта маршрута и трасса Синкансэн */}
        <RouteMap />

        {/* Section 4: Где вы будете жить (Отели Токио и Киото) */}
        <Hotels />

        {/* Section 5: Прозрачные условия (Включено / Не включено) */}
        <Inclusions onOpenCalculator={() => setIsBookingModalOpen(true)} />

        {/* Section 6: Финальный CTA и Форма бронирования / Калькулятор */}
        <TourCalculator />
      </main>

      {/* Section 7: Футер и контакты туроператора Pacific Partners Tokyo */}
      <Footer />

      {/* Interactive Booking & Calculation Dialog */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
