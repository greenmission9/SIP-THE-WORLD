import { useRef } from 'react';
import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import RandomDrinkSection from '../components/landing/random-drink-section.jsx';
import UniqueDrinksSection from '../components/landing/unique-drinks-section.jsx';
import WorldMapSection from '../components/landing/world-map-section.jsx';

/**
 * HomePage 컴포넌트 — 메인페이지 (히어로 → 세계 음료 지도 → 이색 음료 → 랜덤 음료)
 */
function HomePage() {
  const randomRef = useRef(null);

  const scrollToRandom = () => {
    randomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box>
      <HeroSection onRandomClick={ scrollToRandom } />
      <WorldMapSection />
      <UniqueDrinksSection />
      <RandomDrinkSection sectionRef={ randomRef } />
    </Box>
  );
}

export default HomePage;
