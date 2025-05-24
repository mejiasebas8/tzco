import { useEffect, useRef } from 'react';

const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timeRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctxRef.current = ctx;
    
    // Set canvas size to match container size
    const updateCanvasSize = () => {
      if (!canvas) return;
      const container = canvas.parentElement;
      if (!container) return;
      
      // Use clientWidth and clientHeight for responsive sizing
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Re-initialize particles when canvas size changes
      initializeParticles();
    };
    
    // Initialize particles on first render and window resize
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    function initializeParticles() {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Adjust particle count for performance
      const PARTICLE_COUNT = 8000;
      const particles: any[] = [];
      particlesRef.current = particles;
      
      const baseSize = Math.min(width, height);
      
      // Initialize particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * baseSize * 0.3;
        
        particles.push({
          x: centerX + r * Math.cos(theta),
          y: centerY + r * Math.sin(theta),
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          angle: Math.random() * Math.PI * 2,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
          originalX: centerX + r * Math.cos(theta),
          originalY: centerY + r * Math.sin(theta)
        });
      }
      
      // Reset animation time when particles are re-initialized
      timeRef.current = 0;
    }
    
    // Animation function
    function animate() {
      if (!canvas || !ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Updated time increment for animation
      timeRef.current += 0.01;
      
      // Clear with slight trails for ghosting effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      particlesRef.current.forEach(particle => {
        // Calculate movement with gentle waves
        const waveFactor = Math.sin(timeRef.current + particle.angle) * 1;
        
        particle.x += Math.cos(particle.angle) * particle.speed + waveFactor * 0.2;
        particle.y += Math.sin(particle.angle) * particle.speed + waveFactor * 0.1;
        
        // Add slight gravity toward original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 50) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Click to restart animation
    const handleClick = () => {
      initializeParticles();
    };
    
    canvas.addEventListener('click', handleClick);
    
    return () => {
      // Cleanup
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('click', handleClick);
      
      // Cancel animation frame to prevent memory leaks
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      
      if (particlesRef.current) {
        particlesRef.current.length = 0;
      }
      
      timeRef.current = 0;
      ctxRef.current = null;
    };
  }, []);
  
  return (
    <div className="w-full h-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};

export default ParticleAnimation;