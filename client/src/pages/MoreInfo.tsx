import React from 'react';
import { Link } from 'wouter';
import ParticleFlower from '@/components/ParticleFlower';

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Central Image/Animation Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ParticleFlower />
      </div>
      
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <span className="text-white font-mono hover:text-gray-400 transition-colors cursor-pointer">
            ← Back to Home
          </span>
        </Link>
      </div>
      
      {/* Corner Text */}
      <div className="absolute bottom-8 left-8 z-10 max-w-sm">
        <h2 className="text-xl mb-4 font-mono">Zeal8 Co.</h2>
        <p className="text-sm font-mono mb-3">
          What are the characteristics of enduring businesses? How can the genetics of a company be edited from the beggining? 
          How can we build for very long periods of time? How can technology be applied to quality businesses? Who are formidable builders?
        </p>
        <p className="text-sm font-mono">
          These are the questions that matter to us. Zeal8 Co. provides capital and an operational hands-on approach to build and own businesses that answer these questions.
        </p>
      </div>
    </div>
  );
};

export default MoreInfo;