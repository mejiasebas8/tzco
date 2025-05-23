import { useState } from 'react';
import ParticleAnimation from '@/components/ParticleAnimation';
import CompanyModal from '@/components/CompanyModal';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-[#F8F6F0] text-[#2D2D2D] overflow-hidden">
      {/* More Info Button - removed border, using same font as clock */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-7 md:top-8 left-7 md:left-8 bg-transparent px-6 py-3 cursor-pointer text-sm md:text-base text-[#2D2D2D] transition-all duration-300 ease-in-out hover:text-black z-50 font-mono"
      >
        More Info
      </button>

      {/* Time Clock */}
      <div className="absolute top-7 md:top-8 right-7 md:right-8 text-base md:text-lg font-bold text-[#2D2D2D] font-mono z-50">
        {time}
      </div>

      {/* Particle Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-[80vh] md:w-screen md:h-[80vh] z-10">
        <ParticleAnimation />
      </div>

      {/* Company Info - moved to bottom left */}
      <div className="absolute bottom-7 md:bottom-8 left-7 md:left-8 z-50">
        <div className="text-2xl md:text-3xl font-light text-[#2D2D2D] mb-1 md:mb-2 tracking-wider">
          Zeal 8 Co.
        </div>
        <div className="text-sm text-[#666666] tracking-wide">
          Miami, São Paulo
        </div>
      </div>

      {/* Email Address */}
      <div className="absolute bottom-7 md:bottom-8 right-7 md:right-8 text-sm text-[#666666] font-mono z-50">
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
