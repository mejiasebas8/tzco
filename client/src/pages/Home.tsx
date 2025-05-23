import { useState } from 'react';
import ParticleAnimation from '@/components/ParticleAnimation';
import CompanyModal from '@/components/CompanyModal';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-[#F8F6F0] text-[#2D2D2D] overflow-hidden">
      {/* More Info Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-7 md:top-8 left-7 md:left-8 bg-transparent border border-[#2D2D2D] px-6 py-3 cursor-pointer text-sm md:text-base text-[#2D2D2D] transition-all duration-300 ease-in-out hover:bg-[#2D2D2D] hover:text-[#F8F6F0] z-50"
      >
        More Info
      </button>

      {/* Time Clock */}
      <div className="absolute top-7 md:top-8 right-7 md:right-8 text-base md:text-lg font-bold text-[#2D2D2D] font-mono z-50">
        {time}
      </div>

      {/* Particle Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-[85vh] md:w-screen md:h-[85vh] z-10">
        <ParticleAnimation />
      </div>

      {/* Company Info */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 text-center z-50">
        <div className="text-4xl md:text-5xl font-light text-[#2D2D2D] mb-2 md:mb-3 tracking-wider">
          Zeal 8 Co.
        </div>
        <div className="text-sm md:text-base text-[#666666] tracking-wide">
          Miami, São Paulo
        </div>
      </div>

      {/* Modal */}
      <CompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
