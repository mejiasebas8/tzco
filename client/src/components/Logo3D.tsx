import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export default function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 0, 600);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(200, 300, 400);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.4);
    fillLight.position.set(-200, 100, -200);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffcc88, 0.3);
    rimLight.position.set(0, -200, -300);
    scene.add(rimLight);

    const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <g transform="translate(0,1024) scale(0.1,-0.1)" fill="#000000">
    <path d="M5613 6450 c-300 -38 -559 -173 -781 -405 -331 -346 -451 -843 -317
    -1310 34 -121 130 -311 209 -416 126 -166 307 -319 481 -403 340 -167 706
    -169 1040 -6 229 111 442 322 567 562 l35 66 47 -82 c140 -241 382 -457 635
    -567 223 -96 478 -122 729 -74 502 96 913 512 1027 1040 8 39 18 129 21 200
    33 667 -420 1245 -1081 1381 -126 26 -377 26 -495 0 -255 -55 -498 -186 -681
    -366 -169 -166 -214 -240 -619 -1010 -178 -339 -267 -470 -372 -548 -117 -87
    -214 -117 -363 -109 -123 6 -200 31 -301 99 -177 119 -289 308 -316 537 -30
    258 92 540 298 687 297 212 691 146 935 -157 l46 -57 44 61 c23 34 107 149
    186 256 l144 194 -48 49 c-163 167 -435 310 -689 363 -96 20 -283 27 -381 15z
    m2601 -635 c230 -80 423 -306 472 -555 64 -323 -93 -642 -390 -792 -181 -91
    -441 -91 -622 0 -198 100 -333 271 -385 487 -17 74 -20 109 -16 200 16 339
    237 607 561 681 99 22 282 12 380 -21z"/>
    <path d="M865 6427 c-3 -7 -4 -138 -3 -292 l3 -280 387 -3 388 -2 2 -993 3
    -992 1583 -3 c870 -1 1582 0 1582 3 0 2 -49 69 -108 148 -113 150 -192 265
    -258 379 l-39 67 -493 3 -494 3 114 175 c63 96 226 346 363 555 136 209 347
    538 468 730 121 193 242 382 268 422 27 40 49 77 49 83 0 16 -3809 14 -3815
    -3z m2575 -581 c0 -3 -53 -94 -118 -203 -66 -109 -183 -306 -262 -438 -79
    -132 -216 -355 -305 -495 -89 -140 -214 -343 -279 -450 -65 -107 -120 -197
    -122 -199 -2 -2 -4 399 -4 892 l0 897 545 0 c300 0 545 -2 545 -4z"/>
    </g>
    </svg>`;

    const loader = new SVGLoader();
    const svgData = loader.parse(svgString);
    const paths = svgData.paths;

    const logoGroup = new THREE.Group();
    const pivotGroup = new THREE.Group();

    const extrudeSettings = {
      depth: 25,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 3,
      bevelOffset: 0,
      bevelSegments: 8,
      curveSegments: 24
    };

    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.7,
      roughness: 0.3,
      side: THREE.DoubleSide
    });

    paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      
      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        logoGroup.add(mesh);
      });
    });

    const box = new THREE.Box3().setFromObject(logoGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    logoGroup.position.set(-center.x, -center.y, -center.z);
    
    pivotGroup.add(logoGroup);
    
    const maxDim = Math.max(size.x, size.y);
    const scale = 360 / maxDim;
    pivotGroup.scale.set(scale, -scale, scale);
    
    pivotGroup.position.set(0, 0, 0);

    scene.add(pivotGroup);

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      pivotGroup.rotation.y += 0.008;
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      data-testid="logo-3d"
    />
  );
}
