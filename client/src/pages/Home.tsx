import { useState } from 'react';
import RandomParticle from '@/components/RandomParticle';
import CompanyModal from '@/components/CompanyModal';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-white text-black overflow-hidden">
      {/* More Info Link - adjusted for perfect visibility */}
      <a 
        href="/more-info"
        className="absolute top-[4vh] sm:top-[5vh] md:top-8 left-4 sm:left-5 md:left-8 bg-transparent px-3 sm:px-4 md:px-6 py-2 md:py-3 cursor-pointer text-sm sm:text-sm md:text-base text-black transition-all duration-300 ease-in-out hover:text-gray-800 z-50 font-mono"
      >
        More Info
      </a>

      {/* Time Clock - aligned perfectly with More Info link */}
      <div className="absolute top-[4vh] sm:top-[5vh] md:top-8 right-4 sm:right-5 md:right-8 text-sm sm:text-sm md:text-base text-black font-mono z-50">
        {time}
      </div>

      {/* Particle Container - centered with responsive sizing */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[86vw] h-[86vw] sm:w-[80vw] sm:h-[92vw] md:w-[72vw] md:h-[72vw] max-w-[86vh] max-h-[86vh] sm:max-w-[77vh] sm:max-h-[88vh] md:max-w-[64vh] md:max-h-[64vh] flex items-center justify-center z-10">
        <RandomParticle />
      </div>

      {/* Company Info - aligned with upper corner height */}
      <div className="absolute bottom-[17vh] sm:bottom-[10vh] md:bottom-8 left-4 sm:left-5 md:left-8 z-50">
        <div className="text-sm sm:text-sm md:text-base font-mono font-bold text-black mb-0.5 sm:mb-1 md:mb-2">
          The Zeal Company
        </div>
        <div className="text-xs sm:text-sm text-gray-600 font-mono">
          Miami, USA
        </div>
      </div>

      {/* Email Address - aligned with upper corner height */}
      <div className="absolute bottom-[17vh] sm:bottom-[10vh] md:bottom-8 right-4 sm:right-5 md:right-8 text-xs sm:text-sm text-gray-600 font-mono z-50">
        info@tz.co
      </div>

      {/* Modal */}
      <CompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
