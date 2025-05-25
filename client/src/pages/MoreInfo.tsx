import React from 'react';
import { Link } from 'wouter';

const MoreInfo = () => {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Central Image/Animation Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[660px] h-[660px] bg-[#0A0A0A]">
          {/* This is where we'll add the animation or image */}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <a className="text-white font-mono hover:text-gray-400 transition-colors">
            ← Back to Home
          </a>
        </Link>
      </div>
      
      {/* Corner Text */}
      <div className="absolute bottom-8 left-8 z-10 max-w-sm">
        <h2 className="text-xl mb-4 font-mono">About Zeal 8 Co</h2>
        <p className="text-sm font-mono mb-3">
          Zeal 8 Co is a creative technology studio focusing on innovative digital 
          experiences and interactive art installations.
        </p>
        <p className="text-sm font-mono mb-3">
          Founded in 2022, we operate at the intersection of art, design, and 
          emerging technologies, creating experiences that challenge perception 
          and inspire wonder.
        </p>
        <p className="text-sm font-mono">
          Our team of artists, developers, and designers collaborate on projects 
          ranging from interactive web experiences to physical installations.
        </p>
      </div>
    </div>
  );
};

export default MoreInfo;