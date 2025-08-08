import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import ParticleFlower from "@/components/ParticleFlower";

const MoreInfo = () => {
  const [position, setPosition] = useState({ 
    x: 30 + Math.random() * 40, 
    y: 30 + Math.random() * 40 
  });
  const velocityRef = useRef({ 
    x: (Math.random() - 0.5) * 0.8 + 0.3, 
    y: (Math.random() - 0.5) * 0.8 + 0.3 
  });
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setPosition(prevPosition => {
        const newX = prevPosition.x + velocityRef.current.x;
        const newY = prevPosition.y + velocityRef.current.y;

        // Bounce off horizontal walls with slight randomness
        if (newX <= 15 || newX >= 85) {
          velocityRef.current.x = -velocityRef.current.x + (Math.random() - 0.5) * 0.2;
        }

        // Bounce off vertical walls with slight randomness
        if (newY <= 15 || newY >= 85) {
          velocityRef.current.y = -velocityRef.current.y + (Math.random() - 0.5) * 0.2;
        }

        // Add slight random drift
        velocityRef.current.x += (Math.random() - 0.5) * 0.02;
        velocityRef.current.y += (Math.random() - 0.5) * 0.02;

        // Limit velocity to prevent it from getting too fast
        velocityRef.current.x = Math.max(-1, Math.min(1, velocityRef.current.x));
        velocityRef.current.y = Math.max(-1, Math.min(1, velocityRef.current.y));

        return {
          x: Math.max(15, Math.min(85, newX)),
          y: Math.max(15, Math.min(85, newY))
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#EDE7DC] text-black overflow-hidden">
      {/* Floating Particle Container - bounces around screen */}
      <div 
        className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] transition-all duration-75 ease-linear z-10"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <ParticleFlower />
      </div>

      {/* Navigation - adjusted for perfect visibility */}
      <div className="absolute top-[4vh] sm:top-[5vh] md:top-8 left-4 sm:left-5 md:left-8 z-10">
        <Link href="/">
          <span className="text-black font-mono hover:text-gray-600 transition-colors cursor-pointer text-sm sm:text-sm md:text-base">
            ← Back to Home
          </span>
        </Link>
      </div>

      {/* Corner Text - aligned with upper corner height and mobile optimized */}
      <div className="absolute bottom-[4vh] sm:bottom-[5vh] md:bottom-8 left-4 sm:left-5 md:left-8 right-4 sm:right-5 md:right-8 z-20 max-w-none sm:max-w-sm md:max-w-md">
        <h2 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 font-mono text-black">Zeal8</h2>
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            Zeal8 provides capital, technology and a hands on operational approach to build and own businesses for the long term.
          </p>
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            This is our moment and we have to move with purpose. We're here to amplify human potential, not take advantage of human weaknesses. What we build should follow principles that we stress test and constantly evolve. It means building companies that are both profitable and net positive for the world.
          </p>
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            What are the characteristics of enduring technology businesses? How can the genetics of a company be best designed from inception? How can we build for generational timescales? Who are the formidable founders worth building with? These are the questions that drive us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
