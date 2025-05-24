import { useEffect, useRef } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
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
          About Our Company
        </h2>
        
        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-[#F8F6F0] text-sm sm:text-base leading-relaxed font-mono">
          <p>Welcome to our company. We are focused on creating innovative solutions for modern challenges.</p>
          <p>Our mission is to develop technology that makes a meaningful impact on people's lives.</p>
          <p>We believe in sustainable growth and responsible innovation.</p>
          <p>Our team consists of passionate individuals dedicated to excellence in everything we do.</p>
          <p>We are committed to creating value for our clients, partners, and the broader community.</p>
          <p>With a focus on cutting-edge technology and human-centered design, we strive to push boundaries.</p>
          <p>We welcome collaboration and are always open to new ideas and perspectives.</p>
        </div>
      </div>
    </div>
  );
}