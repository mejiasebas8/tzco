import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// Type definitions
interface Particle {
  x: number;
  y: number;
  z: number;
  initialR: number;
  initialTheta: number;
  initialHeight: number;
}

interface ParticleConfig {
  count: number;
  formScale: number;
  targetFPS: number;
  flowSpeed: number;
  opacity: number;
  particleSize: number;
  color: string;
}

interface ParticleFlowerProps {
  config?: Partial<ParticleConfig>;
  theme?: 'light' | 'dark' | 'colorful';
  interactive?: boolean;
}

// Default configuration
const DEFAULT_CONFIG: ParticleConfig = {
  count: 30000,
  formScale: 2.4,
  targetFPS: 60,
  flowSpeed: 0.676775,
  opacity: 0.35,
  particleSize: 0.6,
  color: 'rgba(51, 51, 51, 1)',
};

// Theme configurations
const THEMES = {
  light: {
    backgroundColor: '#FFFFFF',
    particleColor: 'rgba(51, 51, 51, 1)',
    trailOpacity: 0.05,
  },
  dark: {
    backgroundColor: '#1a1a1a',
    particleColor: 'rgba(200, 200, 200, 1)',
    trailOpacity: 0.08,
  },
  colorful: {
    backgroundColor: '#0a0a0a',
    particleColor: 'gradient', // Will use dynamic colors
    trailOpacity: 0.06,
  },
};

const ImprovedParticleFlower: React.FC<ParticleFlowerProps> = ({
  config: userConfig,
  theme = 'light',
  interactive = false,
}) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Merge user config with defaults
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig]
  );

  // Get theme settings
  const themeSettings = useMemo(() => THEMES[theme], [theme]);

  // Initialize particles
  const initializeParticles = useCallback(
    (centerX: number, centerY: number): Particle[] => {
      const particles: Particle[] = [];
      const { count, formScale } = config;

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.5) * formScale * 0.5 * 150;
        const height = (Math.random() * 2 - 1) * formScale * 0.3;
        const angle = theta;
        const dist = r / 150;
        const flow = Math.sin(angle * 2 + height * 2) * 0.03;
        const counterFlow = Math.cos(angle * 2 - height * 2) * 0.03;
        const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
        const combinedFlow = flow * blend + counterFlow * (1 - blend);
        const dx = r * Math.cos(theta);
        const dy = r * Math.sin(theta);
        const containment = Math.pow(Math.min(1, dist / (formScale * 0.8)), 4);
        const pull = containment * 0.1;

        particles.push({
          x: centerX + dx + dx * combinedFlow - dx * pull,
          y: centerY + dy + dy * combinedFlow - dy * pull,
          z: height,
          initialR: r,
          initialTheta: theta,
          initialHeight: height,
        });
      }

      return particles;
    },
    [config]
  );

  // Get particle color based on theme
  const getParticleColor = useCallback(
    (particle: Particle, opacity: number): string => {
      if (themeSettings.particleColor === 'gradient') {
        // Create colorful gradient based on position
        const hue = (Math.atan2(particle.y - 275, particle.x - 275) * 180) / Math.PI + 180;
        return `hsla(${hue}, 70%, 60%, ${opacity})`;
      }

      const colorMatch = themeSettings.particleColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (colorMatch) {
        return `rgba(${colorMatch[1]}, ${colorMatch[2]}, ${colorMatch[3]}, ${opacity})`;
      }

      return `rgba(51, 51, 51, ${opacity})`;
    },
    [themeSettings]
  );

  // Handle mouse interaction
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!interactive || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;

      mouseRef.current = {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      };
    },
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
  }, []);

  // Resize handler with debouncing
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      if (!parent) return;

      const width = Math.min(parent.clientWidth, 550);
      const height = Math.min(parent.clientHeight, 550);

      canvas.width = width;
      canvas.height = height;

      // Reinitialize particles with new center
      particlesRef.current = initializeParticles(width / 2, height / 2);
    }, 250);
  }, [initializeParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true, // Better performance on some browsers
    });

    if (!ctx) return;
    ctxRef.current = ctx;

    // Set canvas size
    const width = (canvas.width = 550);
    const height = (canvas.height = 550);
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize particles
    particlesRef.current = initializeParticles(centerX, centerY);

    // Animation variables
    let lastFrameTime = 0;
    const frameInterval = 1000 / config.targetFPS;

    // Animation function
    function animate(currentTime: number) {
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        timeRef.current += 0.000676775 * config.flowSpeed;

        if (!ctx) return;

        // Clear with trail effect
        ctx.fillStyle = `rgba(255, 255, 255, ${themeSettings.trailOpacity})`;
        if (theme === 'dark') {
          ctx.fillStyle = `rgba(26, 26, 26, ${themeSettings.trailOpacity})`;
        } else if (theme === 'colorful') {
          ctx.fillStyle = `rgba(10, 10, 10, ${themeSettings.trailOpacity})`;
        }
        ctx.fillRect(0, 0, width, height);

        // Update and render particles
        particlesRef.current.forEach((particle) => {
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) / 150;
          const angle = Math.atan2(dy, dx);
          const height = particle.z / (config.formScale * 0.4);

          const flow =
            Math.sin(angle * 2 - timeRef.current * config.flowSpeed + height * 2) * 0.015;
          const counterFlow =
            Math.cos(angle * 2 + timeRef.current * config.flowSpeed - height * 2) * 0.015;

          const blend = (Math.sin(height * Math.PI) + 1) * 0.5;
          const combinedFlow = flow * blend + counterFlow * (1 - blend);

          const containment = Math.pow(Math.min(1, dist / (config.formScale * 0.8)), 4);
          const pull = containment * 0.1;

          // Apply mouse interaction force
          if (interactive && mouseRef.current) {
            const mouseDistX = particle.x - mouseRef.current.x;
            const mouseDistY = particle.y - mouseRef.current.y;
            const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);

            if (mouseDist < 100) {
              const force = (1 - mouseDist / 100) * 0.5;
              particle.x += (mouseDistX / mouseDist) * force;
              particle.y += (mouseDistY / mouseDist) * force;
            }
          }

          // Update particle position
          particle.x = particle.x + dx * combinedFlow - dx * pull;
          particle.y = particle.y + dy * combinedFlow - dy * pull;
          particle.z = particle.z + Math.sin(timeRef.current * 0.2030325 + dist * 2) * 0.01;

          // Calculate visual properties
          const depthFactor = 1 + particle.z * 0.5;
          const opacity = config.opacity * depthFactor;
          const size = Math.max(0.001, config.particleSize * depthFactor);

          // Render particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fillStyle = getParticleColor(particle, opacity);
          ctx.fill();
        });

        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove as any);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      window.removeEventListener('resize', handleResize);

      if (canvas && interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove as any);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }

      particlesRef.current.length = 0;
      timeRef.current = 0;
      ctxRef.current = null;
    };
  }, [config, theme, themeSettings, interactive, initializeParticles, getParticleColor, handleResize, handleMouseMove, handleMouseLeave]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '550px',
        maxHeight: '550px',
        margin: 'auto',
        backgroundColor: themeSettings.backgroundColor,
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        borderRadius: '8px',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: interactive ? 'pointer' : 'default',
        }}
      />
    </div>
  );
};

export default ImprovedParticleFlower;
