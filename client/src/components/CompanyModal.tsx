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
    }
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div 
      ref={modalOverlayRef}
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100]"
    >
      <div className="bg-[#F8F6F0] p-8 md:p-14 max-w-3xl max-h-[80vh] overflow-y-auto relative m-4 md:m-0" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-5 right-7 bg-none border-none text-2xl cursor-pointer text-[#2D2D2D]"
        >
          &times;
        </button>
        
        <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-[#2D2D2D] tracking-wide">
          Zeal: Building Enduring Companies, Systematically
        </h2>
        
        <div className="space-y-5 text-[#2D2D2D] text-base leading-relaxed">
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
