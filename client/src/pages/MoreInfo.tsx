import React from "react";
import { Link } from "wouter";
import ParticleFlower from "@/components/ParticleFlower";

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Central Image/Animation Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90vw] h-[90vw] max-w-[80vh] max-h-[80vh]">
          <ParticleFlower />
        </div>
      </div>

      {/* Navigation - moved down for better mobile visibility */}
      <div className="absolute top-[12vh] sm:top-[10vh] md:top-6 left-4 sm:left-5 md:left-6 z-10">
        <Link href="/">
          <span className="text-white font-mono hover:text-gray-400 transition-colors cursor-pointer text-sm sm:text-sm md:text-base">
            ← Back to Home
          </span>
        </Link>
      </div>

      {/* Corner Text - moved up for better mobile visibility */}
      <div className="absolute bottom-[15vh] sm:bottom-[12vh] md:bottom-8 left-4 sm:left-5 md:left-8 z-10 max-w-sm">
        <h2 className="text-xl mb-3 font-mono">Zeal8 Co.</h2>
        <p className="text-sm font-mono mb-3 leading-snug">
          What are the characteristics of enduring businesses? How can the
          genetics of a company be best designed from inception? How can we build
          for generational timescales? How can technology be applied to
          exceptional businesses? Who are the formidable builders worth backing? These are the questions that drive us.
        </p>
        <p className="text-sm font-mono leading-snug">
          Zeal8 Co. provides capital, technology, and a hands-on operational approach to build 
          and own businesses for the long term.
        </p>
      </div>
    </div>
  );
};

export default MoreInfo;
