import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollManager 컴포넌트 — 페이지 이동 시 스크롤 위치 관리
 * - 일반 이동: 맨 위로 이동
 * - state.scrollTo가 있으면 해당 id의 섹션으로 부드럽게 이동
 *
 * Example usage:
 * <ScrollManager />
 */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.key, location.state]);

  return null;
}

export default ScrollManager;
