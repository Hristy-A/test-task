import { useEffect } from 'react';

/**
 * Custom hook used to subscribe on intersection document with provided (ref) element
 * @param triggerElement - {@link HTMLElement} viewed for intersecting
 * @param callback - function which called on intersecting
 * @param options - {@link IntersectionObserverInit} additional options for {@link IntersectionObserver}
 */
export function useIntersection(
  triggerElement: HTMLElement | null,
  callback: () => void,
  options?: IntersectionObserverInit
): void {
  useEffect(() => {
    if (!triggerElement) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && callback(),
      options
    );
    intersectionObserver.observe(triggerElement);

    return () => {
      intersectionObserver.unobserve(triggerElement);
      intersectionObserver.disconnect();
    };
  }, [triggerElement, callback, options]);
}
