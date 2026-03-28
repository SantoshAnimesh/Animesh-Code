// Path: hook/usePagination

import { useCallback, useEffect, useRef } from "react";

function usePagination({ callback, loading, hasMore }) {
  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  const lastElement = useCallback(
    (node) => {
      if (!node) return;

      // Disconnect previous observer
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasMore &&
            !loading &&
            !isFetchingRef.current
          ) {
            isFetchingRef.current = true;
            callback();
          }
        },
        {
          rootMargin: "100px", // 🔥 better than threshold
        }
      );

      observerRef.current.observe(node);
    },
    [callback, loading, hasMore]
  );

  // Reset fetch lock when loading changes
  useEffect(() => {
    if (!loading) {
      isFetchingRef.current = false;
    }
  }, [loading]);

  // Cleanup
  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { lastElement };
}

export default usePagination;
