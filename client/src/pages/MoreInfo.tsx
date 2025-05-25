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
          <a className="text-white font-mono hover:text-gray-400 transition-colors">
            ← Back to Home
          </a>
        </Link>
      </div>
      
      {/* Corner Text */}
      <div className="absolute bottom-8 left-8 z-10 max-w-sm">
        <h2 className="text-xl mb-4 font-mono">About Zeal 8 Co</h2>
        <p className="text-sm font-mono mb-3">
          Company formation can be systematized through the right conditions and environment. 
          Quality businesses can be improved through disciplined excellence and technology.
        </p>
        <p className="text-sm font-mono">
          Zeal works with exceptional talent providing them the optimal ecosystem, capital 
          and hands-on building experiencie to build quality quests and enduring companies.
        </p>
      </div>
    </div>
  );
};

export default MoreInfo;