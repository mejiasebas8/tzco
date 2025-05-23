import { useState } from 'react';
import ParticleFlower from '@/components/ParticleFlower';
import CompanyModal from '@/components/CompanyModal';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-black text-[#F8F6F0] overflow-hidden">
      {/* More Info Button - moved closer to top edge */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-2 sm:top-3 md:top-6 left-2 sm:left-3 md:left-6 bg-transparent px-2 sm:px-3 md:px-4 py-1 md:py-2 cursor-pointer text-xs sm:text-sm md:text-base text-[#F8F6F0] transition-all duration-300 ease-in-out hover:text-white z-50 font-mono"
      >
        More Info
      </button>

      {/* Time Clock - moved closer to top edge */}
      <div className="absolute top-2 sm:top-3 md:top-6 right-2 sm:right-3 md:right-6 text-xs sm:text-sm md:text-base font-bold text-[#F8F6F0] font-mono z-50">
        {time}
      </div>

      {/* Particle Flower Container - reduced height to fit on phone screens */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] z-10">
        <ParticleFlower />
      </div>

      {/* Company Info - moved to bottom left and closer to edge */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-6 left-2 sm:left-3 md:left-6 z-50">
        <div className="text-sm sm:text-lg md:text-2xl font-light text-[#F8F6F0] mb-0.5 tracking-wider">
          Zeal 8 Co.
        </div>
        <div className="text-xs text-[#999999] tracking-wide">
          Miami, São Paulo
        </div>
      </div>

      {/* Email Address */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-6 right-2 sm:right-3 md:right-6 text-xs text-[#999999] font-mono z-50">
        info@zeal8co.com
      </div>

      {/* Modal */}
      <CompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
