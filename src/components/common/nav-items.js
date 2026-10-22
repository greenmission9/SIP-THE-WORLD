/** 고정 헤더 높이(px) — 본문 상단 여백 계산에 사용 */
export const HEADER_HEIGHT = { xs: 64, md: 76 };

/**
 * 헤더·푸터 공통 메뉴
 * - scrollTo가 있으면 해당 페이지로 이동한 뒤 섹션으로 스크롤합니다.
 */
export const navItems = [
  { label: '세계 음료 탐험', to: '/', scrollTo: 'world-map' },
  { label: '국가별 음료', to: '/drinks' },
  { label: '이색 음료', to: '/unique' },
  { label: '나의 음료 여권', to: '/passport' },
  { label: '브랜드 스토리', to: '/story' },
];
