import React from "react";
import { Link } from "wouter";
import ContinuousLineDrawing from "@/components/ContinuousLineDrawing";

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-[#EDE7DC] text-black overflow-hidden">
      {/* Central Image/Animation Container - positioned for desktop and mobile */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16">
        <div className="w-[45vw] h-[45vw] max-w-[30vh] max-h-[30vh] translate-y-[-32vh] md:w-[60vw] md:h-[60vw] md:max-w-[70vh] md:max-h-[70vh] md:translate-y-[-10vh]">
          <ContinuousLineDrawing />
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
      <div className="absolute bottom-[32vh] sm:bottom-[5vh] md:bottom-8 left-4 sm:left-5 md:left-8 right-4 sm:right-5 md:right-8 z-20 max-w-none sm:max-w-sm md:max-w-md">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-xs md:text-sm font-mono leading-relaxed text-black">
            The Zeal Company provides capital, technology and a hands on operational approach to build and own businesses for the long term.
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
