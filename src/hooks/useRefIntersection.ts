import { useState } from 'react';
import { useIntersection } from './useIntersection';

/**
 * Custom hook which wrap {@link useIntersection} hook and return ref
 * @param callback - function which called on intersecting
 * @param options - {@link IntersectionObserverInit} additional options for {@link IntersectionObserver}
 * @returns Ref used for referring on {@link HTMLElement}
 */
export function useRefIntersection(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  useIntersection(ref, callback, options);

  return setRef;
}
