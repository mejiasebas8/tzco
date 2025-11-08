import { useState, useEffect } from 'react';
import ParticleFlower from './ParticleFlower';
import WavyYinYang from './WavyYinYang';

const RandomParticle = () => {
  const [particleType, setParticleType] = useState<'flower' | 'yinyang'>('flower');

  useEffect(() => {
    const randomChoice = Math.random() < 0.5 ? 'flower' : 'yinyang';
    setParticleType(randomChoice);
  }, []);

  return particleType === 'flower' ? <ParticleFlower /> : <WavyYinYang />;
};

export default RandomParticle;
