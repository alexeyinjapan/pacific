import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { TourCalculator } from './TourCalculator';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl rounded-sm bg-[#121214] border border-white/20 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161C]">
          <div className="flex items-center gap-2">
            <span className="font-kanji text-[#E0C179] text-lg">日本</span>
            <span className="text-sm font-semibold text-white">
              Pacific Partners Tokyo • Расчет стоимости тура
            </span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-xs text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Embeds the calculator */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <TourCalculator onSuccessSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};
