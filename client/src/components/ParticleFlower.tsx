import React, { useEffect, useRef } from 'react';

const ParticleFlower = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({ x: 0, y: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 20% larger dimensions (550 * 1.2 = 660)
    const width = canvas.width = 660;
    const height = canvas.height = 660;
    const centerX = width / 2;
    const centerY = height / 2;

    const PARTICLE_COUNT = 70000;
    const FORM_SCALE = 2.4;
    const particles = [];
    particlesRef.current = particles;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * FORM_SCALE * 0.5 * 180; // Scaled for larger canvas
      const height = (Math.random() * 2 - 1) * FORM_SCALE * 0.3;
      const angle = theta;
      const dist = r / 180; // Adjusted for larger canvas
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
    // Faster animation: increased from 10 to 16 FPS (60% faster)
    const targetFPS = 16;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime) {
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        // Faster time progression (increased from 0.0005 to 0.0008)
        timeRef.current += 0.00068;

        ctx.fillStyle = 'rgba(237, 231, 220, 0.08)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(particle => {
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) / 180; // Adjusted for larger canvas
          const angle = Math.atan2(dy, dx);
          const height = particle.z / (FORM_SCALE * 0.4);

          // Mouse interaction effect
          let mouseInfluence = 0;
          let colorShift = 0;
          if (mouseRef.current.isHovering) {
            const mouseDx = particle.x - mouseRef.current.x;
            const mouseDy = particle.y - mouseRef.current.y;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const maxInfluenceDistance = 120;
            
            if (mouseDist < maxInfluenceDistance) {
              const influence = (maxInfluenceDistance - mouseDist) / maxInfluenceDistance;
              mouseInfluence = influence * 0.02;
              colorShift = influence * 0.6;
              
              // Repel particles from cursor
              const repelForce = influence * 0.8;
              particle.x += (mouseDx / mouseDist) * repelForce;
              particle.y += (mouseDy / mouseDist) * repelForce;
            }
          }

          // Faster flow speeds (increased multipliers) with mouse influence
          const flow = Math.sin(angle * 2 - timeRef.current * 0.68 + height * 2) * (0.0153 + mouseInfluence);
          const counterFlow = Math.cos(angle * 2 + timeRef.current * 0.68 - height * 2) * (0.0153 + mouseInfluence);
          const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
          const combinedFlow = flow * blend + counterFlow * (1 - blend);

          const containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.8)), 4);
          const pull = containment * 0.1;

          particle.x = particle.x + (dx * combinedFlow) - (dx * pull);
          particle.y = particle.y + (dy * combinedFlow) - (dy * pull);
          
          // Faster z-axis movement with mouse influence
          particle.z = particle.z + Math.sin(timeRef.current * 0.204 + dist * 2) * 0.01275;

          const depthFactor = 1 + particle.z * 0.5;
          const opacity = (0.15 + colorShift * 0.4) * depthFactor;
          const size = Math.max(0.001, (0.4 + mouseInfluence * 5) * depthFactor);

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          
          // Color shifts from dark gray to bright black when near cursor
          const red = Math.floor(80 - colorShift * 40);
          const green = Math.floor(80 - colorShift * 40);
          const blue = Math.floor(80 - colorShift * 40);
          
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
          ctx.fill();
        });

        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      // Clean up event listeners
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      
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
        particlesRef.current = null;
      }
      timeRef.current = 0;
      ctxRef.current = null;
    };
  }, []);

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      maxWidth: '660px', 
      maxHeight: '660px', 
      margin: 'auto', 
      backgroundColor: '#EDE7DC', 
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