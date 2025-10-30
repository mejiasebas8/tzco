import React, { useEffect, useRef } from 'react';

const ParticleFlower = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const width = canvas.width = 605;
    const height = canvas.height = 605;
    const centerX = width / 2;
    const centerY = height / 2;

    const PARTICLE_COUNT = 30000;
    const FORM_SCALE = 2.4;
    const particles: any[] = [];
    particlesRef.current = particles;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * FORM_SCALE * 0.5 * 150;
      const height = (Math.random() * 2 - 1) * FORM_SCALE * 0.3;
      const angle = theta;
      const dist = r / 150;
      const flow = Math.sin(angle * 2 + height * 2) * 0.03;
      const counterFlow = Math.cos(angle * 2 - height * 2) * 0.03;
      const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
      const combinedFlow = flow * blend + counterFlow * (1 - blend);
      const dx = r * Math.cos(theta);
      const dy = r * Math.sin(theta);
      const containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.8)), 4);
      const pull = containment * 0.1;

      particles.push({
        x: centerX + dx + (dx * combinedFlow) - (dx * pull),
        y: centerY + dy + (dy * combinedFlow) - (dy * pull),
        z: height,
        initialR: r,
        initialTheta: theta,
        initialHeight: height
      });
    }

    let lastFrameTime = 0;
    const targetFPS = 10;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime: number) {
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        timeRef.current += 0.000475;

        if (ctx) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.fillRect(0, 0, width, height);
        }
      

        if (ctx) {
          particles.forEach(particle => {
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) / 150;
            const angle = Math.atan2(dy, dx);
            const height = particle.z / (FORM_SCALE * 0.4);

            const flow = Math.sin(angle * 2 - timeRef.current * 0.5 + height * 2) * 0.015;
            const counterFlow = Math.cos(angle * 2 + timeRef.current * 0.5 - height * 2) * 0.015;

            const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
            const combinedFlow = flow * blend + counterFlow * (1 - blend);

            const containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.8)), 4);
            const pull = containment * 0.1;

            particle.x = particle.x + (dx * combinedFlow) - (dx * pull);
            particle.y = particle.y + (dy * combinedFlow) - (dy * pull);
            particle.z = particle.z + Math.sin(timeRef.current * 0.15 + dist * 2) * 0.01;

            const depthFactor = 1 + particle.z * 0.5;
            const opacity = 0.35 * depthFactor;
            const size = Math.max(0.001, 0.6 * depthFactor);

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(51, 51, 51, ${opacity})`;
            ctx.fill();
          });
        }

        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
      if (particlesRef.current) {
        particlesRef.current.length = 0;
      }
      timeRef.current = 0;
      ctxRef.current = null;
    };
  }, []);

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      maxWidth: '605px', 
      maxHeight: '605px', 
      margin: 'auto', 
      backgroundColor: '#FFFFFF', 
      overflow: 'hidden',
      aspectRatio: '1 / 1'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%' 
        }} 
      />
    </div>
  );
};

export default ParticleFlower;