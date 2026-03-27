
// ------- Simple Code -------
import React, {useCallback,useEffect,useRef} from "react";
export default function useDebounce(callback, delay) {
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debounceCall = useCallback(
    (...arg) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...arg);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCall;
}

-------------- App.js-------------->
import React from "react";
import useDebounce from "./useDebounce"
export default function App() {
  const debounce = useDebounce(callback,500);

  function callback(arg){
    console.log("sss",arg)
  }

  debounce("animesh");
  debounce("animesh-1");
  debounce("animesh22222");


  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}

// --------- optimized -----------
import { useCallback, useEffect, useRef } from 'react';

export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
}
