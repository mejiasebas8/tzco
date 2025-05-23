import { useEffect, useRef } from 'react';

// Particle Flower Animation Component
// Themes: feminine creative force, eternal fertility, root energy
// Visualization: Particles bloom and flow from a central source, embodying the eternal creative feminine

const ParticleFlower = () => {
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
      
      const PARTICLE_COUNT = 30000;
      const formScale = 2.4; // Increased by 20% from 2.0
      const particles: any[] = [];
      particlesRef.current = particles;
      
      const baseSize = Math.min(width, height);
      
      // Initialize particles - seeds of the eternal feminine
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Start with a more converged form
        const theta = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.5) * formScale * 0.5 * (baseSize/4); // Tighter radius
        const height = (Math.random() * 2 - 1) * formScale * 0.3; // Less vertical spread
        
        // Calculate initial flow influence - root energy spiraling outward
        const angle = theta;
        const dist = r / (baseSize/4);
        const flow = Math.sin(angle * 2 + height * 2) * 0.03;
        const counterFlow = Math.cos(angle * 2 - height * 2) * 0.03;
        const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
        const combinedFlow = flow * blend + counterFlow * (1 - blend);
        
        // Apply initial flow to starting position
        const dx = r * Math.cos(theta);
        const dy = r * Math.sin(theta);
        const containment = Math.pow(Math.min(1, dist / (formScale * 0.8)), 4);
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
      
      // Reset animation time when particles are re-initialized
      timeRef.current = 0;
    }
    
    // Animation timing control variables
    let lastFrameTime = 0;
    const targetFPS = 10; // Equivalent to 100ms setInterval
    const frameInterval = 1000 / targetFPS;
    
    // Animation function with time delta control
    function animate(currentTime: number) {
      if (!canvas || !ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseSize = Math.min(width, height);
      const formScale = 2.4; // Same as in initializeParticles
      
      // Initialize lastFrameTime on first frame
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }
      
      const deltaTime = currentTime - lastFrameTime;
      
      // Only update animation when enough time has passed (mimics setInterval at 100ms)
      if (deltaTime >= frameInterval) {
        // Using a fixed time increment for consistent animation
        timeRef.current += 0.0005;
        
        // Clear with slight trails for ghosting effect
        // More transparent for smoother trails at lower frame rates
        ctx.fillStyle = 'rgba(248, 246, 240, 0.05)'; // Updated to match our background color #F8F6F0
        ctx.fillRect(0, 0, width, height);
        
        particlesRef.current.forEach(particle => {
          // Get relative position to center
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) / (baseSize/4); // Normalize distance
          const angle = Math.atan2(dy, dx);
          const height = particle.z / (formScale * 0.4); 
          
          const flow = Math.sin(angle * 2 - timeRef.current * 0.5 + height * 2) * 0.015;
          const counterFlow = Math.cos(angle * 2 + timeRef.current * 0.5 - height * 2) * 0.015;
          
          // Blend flows based on height
          const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
          const combinedFlow = flow * blend + counterFlow * (1 - blend);
          
          // Strong containment
          const containment = Math.pow(Math.min(1, dist / (formScale * 0.8)), 4);
          const pull = containment * 0.1;
          
          // Apply gentle balanced motion
          particle.x = particle.x + (dx * combinedFlow) - (dx * pull);
          particle.y = particle.y + (dy * combinedFlow) - (dy * pull);
          particle.z = particle.z + Math.sin(timeRef.current * 0.15 + dist * 2) * 0.01;
          
          // Draw particle with depth-based opacity
          const depthFactor = 1 + particle.z * 0.5;
          const opacity = 0.35 * depthFactor;
          const size = Math.max(0.001, 0.6 * depthFactor * (baseSize / 550)); // Scale size based on canvas size
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45, 45, 45, ${opacity})`; // Updated to match our text color #2D2D2D
          ctx.fill();
        });
        
        // Update lastFrameTime, accounting for any remainder to prevent drift
        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      // Cleanup
      window.removeEventListener('resize', updateCanvasSize);
      
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
    <div className="w-full h-full bg-[#F8F6F0] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};

export default ParticleFlower;