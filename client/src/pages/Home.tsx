import { useState } from 'react';
import RandomParticle from '@/components/RandomParticle';
import CompanyModal from '@/components/CompanyModal';
import Logo3D from '@/components/Logo3D';
import { useClock } from '@/hooks/useClock';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useClock();

  return (
    <div className="relative w-screen h-screen bg-white text-black overflow-hidden">
      {/* More Info Link - top left */}
      <a 
        href="/more-info"
        className="absolute top-[4vh] sm:top-[5vh] md:top-8 left-4 sm:left-5 md:left-8 text-sm md:text-base text-black transition-all duration-300 ease-in-out hover:text-gray-800 z-50 font-mono"
      >
        More Info
      </a>

      {/* 3D Logo - centered at top between More Info and Time */}
      <div className="absolute top-[2vh] sm:top-[3vh] md:top-4 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] z-50">
        <Logo3D />
      </div>

      {/* Time Clock - aligned perfectly with More Info link */}
      <div className="absolute top-[4vh] sm:top-[5vh] md:top-8 right-4 sm:right-5 md:right-8 text-sm sm:text-sm md:text-base text-black font-mono z-50">
        {time}
      </div>

      {/* Particle Container - centered with responsive sizing */}
      <div className="absolute top-[calc(50%-8vh)] sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[99vw] h-[99vw] sm:w-[80vw] sm:h-[92vw] md:w-[550px] md:h-[550px] max-w-[99vh] max-h-[99vh] sm:max-w-[77vh] sm:max-h-[88vh] md:max-w-[550px] md:max-h-[550px] flex items-center justify-center z-10">
        <RandomParticle />
      </div>

      {/* Company Info - aligned with upper corner height */}
      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)_+_12vh)] sm:bottom-[5vh] md:bottom-8 left-4 sm:left-5 md:left-8 z-50 space-y-1 data-testid='company-info'">
        <div className="text-sm md:text-base font-mono font-bold text-black leading-tight" data-testid="text-company-name">
          The Zeal Company
        </div>
        <div className="text-sm md:text-base text-gray-600 font-mono leading-tight" data-testid="text-location">
          Miami, USA
        </div>
        <div className="text-sm md:text-base text-gray-600 font-mono leading-tight" data-testid="text-email">
          info@tz.co
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
