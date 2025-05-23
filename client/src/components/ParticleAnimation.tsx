import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set background color
    scene.background = new THREE.Color('#F8F6F0');

    // Create Particles
    createParticles();

    // Start animation
    startAnimation();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const createParticles = () => {
    if (!sceneRef.current) return;

    const particleCount = 45000;
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.4 }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;

        void main() {
          vColor = customColor;
          vec3 pos = position;
          
          float radius = length(pos.xz);
          float angle = atan(pos.z, pos.x);
          float height = pos.y;
          
          float vessel = smoothstep(0.3, 0.7, radius) * smoothstep(1.0, 0.7, radius);
          
          angle += time * 0.25;
          float space = sin(time * 0.8 + radius * 3.0) * 0.1;
          float newRadius = (radius + space) * vessel;
          
          vec3 newPos;
          newPos.x = cos(angle) * newRadius;
          newPos.z = sin(angle) * newRadius;
          newPos.y = height * vessel - 1.2;
          newPos *= 3.5; // Increased scale from 2.75 to 3.5 to make the entire animation larger
          
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          // Making particles much larger than the original reference
          gl_PointSize = size * (180.0 / -mvPosition.z); // Increased from 150 to 180
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = dot(center, center);
          if (dist > 0.25) discard;
          
          float alpha = (1.0 - smoothstep(0.2025, 0.25, dist)) * opacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      vertexColors: true
    });

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    let i3 = 0;
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const radius = Math.pow(t, 0.5);
      const angle = t * Math.PI * 40;
      const vesselHeight = Math.sin(t * Math.PI) * 1.8;

      const randRadius = radius + (Math.random() - 0.5) * 0.05;
      const randAngle = angle + (Math.random() - 0.5) * 0.1;

      positions[i3] = Math.cos(randAngle) * randRadius;
      positions[i3 + 1] = vesselHeight;
      positions[i3 + 2] = Math.sin(randAngle) * randRadius;

      const shade = 0.1 + Math.sqrt(radius) * 0.1 + Math.random() * 0.02;
      colors[i3] = shade;
      colors[i3 + 1] = shade;
      colors[i3 + 2] = shade;

      // Make particles 30% larger than the reference
      sizes[i] = ((1.0 - Math.abs(vesselHeight * 0.5)) * 0.2 + 0.1) * 1.3;

      i3 += 3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particles = new THREE.Points(geometry, particleMaterial);
    sceneRef.current.add(particles);
    particlesRef.current = particles;
  };

  const startAnimation = () => {
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update particle animation
      if (particlesRef.current.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value = elapsedTime;
      }
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  return <div ref={containerRef} className="w-full h-full"></div>;
};

export default ParticleAnimation;
