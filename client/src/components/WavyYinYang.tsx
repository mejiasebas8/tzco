import React, { useEffect, useRef } from 'react';

const WavyYinYang = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = width * 0.45;
    
    let time = 0;
    
    const draw = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      
      for (let r = 5; r < maxRadius; r += 3) {
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 0.6;
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
          const wave = Math.sin(angle * 8 + r * 0.1 + time) * 2;
          const x = centerX + (r + wave) * Math.cos(angle);
          const y = centerY + (r + wave) * Math.sin(angle);
          
          const isYin = (angle > Math.PI) ? 
            (Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - (centerY + maxRadius/4), 2)) < maxRadius/4) :
            (Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - (centerY - maxRadius/4), 2)) > maxRadius/4);
          
          if (isYin) {
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineTo(x, y);
          } else {
            ctx.strokeStyle = '#000';
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      time += 0.015;
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (canvas && ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };
  }, []);

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      maxWidth: '550px',
      maxHeight: '550px',
      margin: 'auto',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <canvas 
        ref={canvasRef} 
        width={550} 
        height={550}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default WavyYinYang;
