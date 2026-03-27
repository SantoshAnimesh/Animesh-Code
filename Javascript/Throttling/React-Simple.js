
import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook for throttling a function.
 * @param callback - The function to throttle.
 * @param delay - The delay in milliseconds between calls.
 * @returns A throttled version of the callback function.
 */
export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);

  const throttledFunction = useCallback((...args) => {
    const now = Date.now();

    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);

  return throttledFunction;
};

// Example usage
import React, { useEffect } from 'react';
import { useThrottle } from './useThrottle';

const ThrottledScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useThrottle(() => {
    setScrollPosition(window.scrollY);
    console.log('Current Scroll Position:', window.scrollY);
  }, 200); // Adjust delay as needed

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="h-[2000px] p-4">
      <div className="fixed top-0 left-0 right-0 p-4 bg-white shadow-md">
        <p>Current Scroll Position: {scrollPosition}px</p>
      </div>
      <div className="mt-20">
        <p>Scroll down to see the throttling effect in action!</p>
      </div>
    </div>
  );
};

export default ThrottledScroll;
