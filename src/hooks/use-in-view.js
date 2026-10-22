import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 화면에 들어왔는지 감지하는 훅 (한 번 보이면 유지)
 * @param {number} threshold - 노출 비율 기준
 * @returns {[object, boolean]} ref, 노출 여부
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin: '0px 0px -40px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, isInView]);

  return [ref, isInView];
}
