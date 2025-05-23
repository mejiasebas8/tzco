import { useEffect, useRef } from 'react';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyModal({ isOpen, onClose }: CompanyModalProps) {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Close modal when clicking outside content area
    const handleOverlayClick = (e: MouseEvent) => {
      if (modalOverlayRef.current && e.target === modalOverlayRef.current) {
        onClose();
      }
    };
    
    // Add event listener
    if (isOpen) {
      document.addEventListener('click', handleOverlayClick);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleOverlayClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Using CSS transition classes based on modal state
  return (
    <div 
      ref={modalOverlayRef}
      className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out z-[100] flex justify-center items-center ${
        isOpen ? 'opacity-80 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`bg-[#161616] p-5 sm:p-6 md:p-14 max-w-3xl max-h-[80vh] overflow-y-auto relative m-3 sm:m-4 md:m-0 transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-5 md:right-7 bg-none border-none text-xl sm:text-2xl cursor-pointer text-[#F8F6F0] font-mono"
        >
          &times;
        </button>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-5 md:mb-8 text-[#F8F6F0] tracking-wide font-mono">
          Zeal: Building Enduring Companies, Systematically
        </h2>
        
        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-[#F8F6F0] text-sm sm:text-base leading-relaxed font-mono">
          <p>We attract the top 1% and give them the environment to build around quality quests. Then we build alongside them. This is what I do best.</p>
          <p>Company formation can be systematized—Zeal provides the conditions for that to happen.</p>
          <p>We design for incentive alignment and long-term orientation.</p>
          <p>We form and invest in companies—for control or meaningful ownership.</p>
          <p>Our approach is hands-on: we fight entropy and apply technology to improve the core inputs of a business.</p>
          <p>We search for the characteristics of enduring businesses—the laws of gravity, even in the age of AI.</p>
          <p>We commit. We concentrate. We don't chase beta or venture math.</p>
          <p>Every investment is made to compound over decades.</p>
        </div>
      </div>
    </div>
  );
}