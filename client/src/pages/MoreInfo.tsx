import React from "react";
import { Link } from "wouter";
import ParticleFlower from "@/components/ParticleFlower";

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-[#EDE7DC] text-black overflow-hidden">
      {/* Central Image/Animation Container - positioned for desktop and mobile */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16">
        <div className="w-[70vw] h-[70vw] max-w-[50vh] max-h-[50vh] md:w-[60vw] md:h-[60vw] md:max-w-[70vh] md:max-h-[70vh] md:translate-y-[-10vh]">
          <ParticleFlower />
        </div>
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
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            The Zeal Company founds companies, builds technology and invests with a concentrated approach.
          </p>
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            This is our moment and we must move with purpose. We're here to amplify human potential, guided by philosophical principles to create businesses that are both profitable and net positive for the world.
          </p>
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            The questions that drive us: What are the characteristics of enduring technology businesses? How can a company's genetics be best designed from inception? How do we build for generational timescales? Who are the formidable founders worth building alongside?
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
