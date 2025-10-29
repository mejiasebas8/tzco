import { useRef, useEffect } from 'react';

const ContinuousLineDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getCenterAndRadius = () => {
      const size = canvas.width;
      return {
        centerX: size / 2,
        centerY: size / 2,
        maxRadius: (size / 2) * 0.9 // 90% of half the canvas
      };
    };

    let { centerX, centerY, maxRadius } = getCenterAndRadius();
    let currentTime = 0;
    let currentPosition = { x: centerX, y: centerY };
    let currentAngle = 0;
    let radius = 0;
    const points: Array<{ x: number; y: number; timestamp: number }> = [];

    const clearCanvas = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const resetSpiral = () => {
      const coords = getCenterAndRadius();
      centerX = coords.centerX;
      centerY = coords.centerY;
      maxRadius = coords.maxRadius;
      radius = 0;
      points.length = 0;
      currentPosition = { x: centerX, y: centerY };
      currentAngle = 0;
    };

    // Set canvas size based on container
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.max(Math.min(rect.width, rect.height), 200); // Minimum 200px
      canvas.width = size;
      canvas.height = size;
      resetSpiral();
    };

    updateCanvasSize();
    
    const resizeHandler = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', resizeHandler);

    const drawDot = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 80, 80, 1)';
      ctx.fill();
    };

    const animate = () => {
      currentTime += 0.00375;
      clearCanvas();
      const step = maxRadius / 260; // Scale step based on canvas size
      radius += step;
      currentAngle += 0.025;

      const newX = centerX + Math.cos(currentAngle) * radius;
      const newY = centerY + Math.sin(currentAngle) * radius;

      currentPosition.x = newX;
      currentPosition.y = newY;

      points.push({
        x: currentPosition.x,
        y: currentPosition.y,
        timestamp: currentTime
      });

      if (radius > maxRadius) {
        resetSpiral();
      }

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const age = Math.min((currentTime - p1.timestamp) / 10, 1);
        const startGray = 170;
        const endGray = 85;
        const intensity = Math.floor(startGray + (endGray - startGray) * age);
        const startAlpha = 0.3;
        const endAlpha = 1.0;
        const alpha = startAlpha + (endAlpha - startAlpha) * age;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${intensity}, ${intensity}, ${intensity}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      drawDot(currentPosition.x, currentPosition.y);
      animationRef.current = requestAnimationFrame(animate);
    };

    resetSpiral();
    clearCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      points.length = 0;
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default ContinuousLineDrawing;
