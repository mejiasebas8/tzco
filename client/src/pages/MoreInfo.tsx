import React from "react";
import { Link } from "wouter";

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-white text-black overflow-hidden">
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
