import { useState } from 'react';
import ParticleFlower from '@/components/ParticleFlower';
import CompanyModal from '@/components/CompanyModal';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-black text-[#F8F6F0] overflow-hidden">
      {/* More Info Link - moved down for better mobile visibility */}
      <a 
        href="/more-info"
        className="absolute top-[12vh] sm:top-[10vh] md:top-8 left-4 sm:left-5 md:left-8 bg-transparent px-3 sm:px-4 md:px-6 py-2 md:py-3 cursor-pointer text-sm sm:text-sm md:text-base text-[#F8F6F0] transition-all duration-300 ease-in-out hover:text-white z-50 font-mono"
      >
        More Info
      </a>

      {/* Time Clock - moved down for better mobile visibility */}
      <div className="absolute top-[12vh] sm:top-[10vh] md:top-8 right-4 sm:right-5 md:right-8 text-sm sm:text-sm md:text-base text-[#F8F6F0] font-mono z-50">
        {time}
      </div>

      {/* Particle Flower Container - centered with responsive sizing */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[80vh] max-h-[80vh] flex items-center justify-center z-10">
        <ParticleFlower />
      </div>

      {/* Company Info - moved up for better mobile visibility */}
      <div className="absolute bottom-[15vh] sm:bottom-[12vh] md:bottom-8 left-4 sm:left-5 md:left-8 z-50">
        <div className="text-lg sm:text-xl md:text-3xl font-light text-[#F8F6F0] mb-0.5 sm:mb-1 md:mb-2 tracking-wider">
          Zeal8 Co.
        </div>
        <div className="text-sm sm:text-sm text-[#999999] tracking-wide">
          Miami, São Paulo
        </div>
      </div>

      {/* Email Address - moved up for better mobile visibility */}
      <div className="absolute bottom-[15vh] sm:bottom-[12vh] md:bottom-8 right-4 sm:right-5 md:right-8 text-sm sm:text-sm text-[#999999] font-mono z-50">
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
