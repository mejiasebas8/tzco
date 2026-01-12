import { useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

interface ParticleAnimationConfig {
  particleCount: number;
  scale: number;
  rotationSpeed: number;
  opacity: number;
  backgroundColor: string;
  particleSize: number;
}

interface ImprovedParticleAnimationProps {
  config?: Partial<ParticleAnimationConfig>;
  className?: string;
}

const DEFAULT_CONFIG: ParticleAnimationConfig = {
  particleCount: 45000,
  scale: 2.8,
  rotationSpeed: 0.25,
  opacity: 0.4,
  backgroundColor: '#F8F6F0',
  particleSize: 1.3,
};

const ImprovedParticleAnimation: React.FC<ImprovedParticleAnimationProps> = ({
  config: userConfig,
  className = 'w-full h-full',
}) => {
  // Refs for Three.js objects
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Merge configuration
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig]
  );

  // Create particles geometry and material
  const createParticles = useCallback(() => {
    if (!sceneRef.current) return;

    const { particleCount, scale, opacity, particleSize } = config;

    // Shader material for better performance and visual quality
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: opacity },
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main() {
          vColor = customColor;
          vec3 pos = position;

          // Calculate cylindrical coordinates
          float radius = length(pos.xz);
          float angle = atan(pos.z, pos.x);
          float height = pos.y;

          // Create vessel shape with smooth transitions
          float vessel = smoothstep(0.3, 0.7, radius) * smoothstep(1.0, 0.7, radius);

          // Animate rotation and add wave effect
          angle += time * ${config.rotationSpeed.toFixed(2)};
          float space = sin(time * 0.8 + radius * 3.0) * 0.1;
          float newRadius = (radius + space) * vessel;

          // Reconstruct position with animation
          vec3 newPos;
          newPos.x = cos(angle) * newRadius;
          newPos.z = sin(angle) * newRadius;
          newPos.y = height * vessel - 1.2;
          newPos *= ${scale.toFixed(1)};

          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);

          // Size based on distance for depth effect
          gl_PointSize = size * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;

        void main() {
          // Create circular particles with smooth edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = dot(center, center);

          // Discard pixels outside circle
          if (dist > 0.25) discard;

          // Smooth alpha falloff for softer particles
          float alpha = (1.0 - smoothstep(0.2025, 0.25, dist)) * opacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexColors: true,
    });

    materialRef.current = particleMaterial;

    // Generate particle positions, colors, and sizes
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    let i3 = 0;
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;

      // Spiral pattern with power curve for density distribution
      const radius = Math.pow(t, 0.5);
      const angle = t * Math.PI * 40; // 20 rotations
      const vesselHeight = Math.sin(t * Math.PI) * 1.8;

      // Add slight randomness for organic feel
      const randRadius = radius + (Math.random() - 0.5) * 0.05;
      const randAngle = angle + (Math.random() - 0.5) * 0.1;

      // Set positions
      positions[i3] = Math.cos(randAngle) * randRadius;
      positions[i3 + 1] = vesselHeight;
      positions[i3 + 2] = Math.sin(randAngle) * randRadius;

      // Gradient color based on position (darker at bottom, lighter at top)
      const shade = 0.1 + Math.sqrt(radius) * 0.1 + Math.random() * 0.02;
      colors[i3] = shade;
      colors[i3 + 1] = shade;
      colors[i3 + 2] = shade;

      // Variable particle sizes for depth
      sizes[i] = ((1.0 - Math.abs(vesselHeight * 0.5)) * 0.2 + 0.1) * particleSize;

      i3 += 3;
    }

    // Create buffer geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    geometryRef.current = geometry;

    // Create particle system
    const particles = new THREE.Points(geometry, particleMaterial);
    sceneRef.current.add(particles);
    particlesRef.current = particles;
  }, [config]);

  // Animation loop
  const startAnimation = useCallback(() => {
    if (!clockRef.current) {
      clockRef.current = new THREE.Clock();
    }

    const clock = clockRef.current;

    const animate = () => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !particlesRef.current
      )
        return;

      const elapsedTime = clock.getElapsedTime();

      // Update particle animation time uniform
      if (
        particlesRef.current.material instanceof THREE.ShaderMaterial &&
        particlesRef.current.material.uniforms.time
      ) {
        particlesRef.current.material.uniforms.time.value = elapsedTime;
      }

      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Update camera
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();

    // Update renderer
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(config.backgroundColor);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer with optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear container and add canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    createParticles();

    // Start animation
    startAnimation();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);

      // Cancel animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Dispose Three.js objects to prevent memory leaks
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }

      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }

      if (particlesRef.current && sceneRef.current) {
        sceneRef.current.remove(particlesRef.current);
        particlesRef.current = null;
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (clockRef.current) {
        clockRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [config.backgroundColor, createParticles, startAnimation, handleResize]);

  return <div ref={containerRef} className={className} />;
};

export default ImprovedParticleAnimation;
