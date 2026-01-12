import { useRef, useEffect, useCallback } from 'react';

interface UseParticleAnimationOptions {
  fps?: number;
  autoStart?: boolean;
  onFrame?: (time: number, deltaTime: number) => void;
}

interface UseParticleAnimationReturn {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  currentTime: number;
}

/**
 * Custom hook for managing particle animation loops with FPS control
 * Provides start, stop, and reset controls with proper cleanup
 */
export function useParticleAnimation(
  options: UseParticleAnimationOptions = {}
): UseParticleAnimationReturn {
  const { fps = 60, autoStart = true, onFrame } = options;

  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  const frameInterval = 1000 / fps;

  const animate = useCallback(
    (currentTime: number) => {
      if (!isRunningRef.current) return;

      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastFrameTimeRef.current;

      if (deltaTime >= frameInterval) {
        currentTimeRef.current += deltaTime / 1000;

        onFrame?.(currentTimeRef.current, deltaTime);

        lastFrameTimeRef.current = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [frameInterval, onFrame]
  );

  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    isRunningRef.current = false;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    currentTimeRef.current = 0;
    lastFrameTimeRef.current = 0;
  }, [stop]);

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  return {
    isRunning: isRunningRef.current,
    start,
    stop,
    reset,
    currentTime: currentTimeRef.current,
  };
}
