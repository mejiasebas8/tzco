import { useEffect, useRef, useCallback } from 'react';

interface UseResizeObserverOptions {
  debounceMs?: number;
  onResize?: (width: number, height: number) => void;
}

/**
 * Custom hook for observing element resize events with debouncing
 * More efficient than window resize listeners for specific elements
 */
export function useResizeObserver<T extends HTMLElement>(
  options: UseResizeObserverOptions = {}
): React.RefObject<T> {
  const { debounceMs = 250, onResize } = options;

  const elementRef = useRef<T>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!onResize) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const entry = entries[0];
        if (entry) {
          const { width, height } = entry.contentRect;
          onResize(width, height);
        }
      }, debounceMs);
    },
    [debounceMs, onResize]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !onResize) return;

    // Use ResizeObserver for modern browsers
    if (typeof ResizeObserver !== 'undefined') {
      observerRef.current = new ResizeObserver(handleResize);
      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [handleResize, onResize]);

  return elementRef;
}
