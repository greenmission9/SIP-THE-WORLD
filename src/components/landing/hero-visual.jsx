import Box from '@mui/material/Box';
import DrinkArt from '../ui/drink-art.jsx';
import { getCountry, getDrink } from '../../utils/drink-utils.js';
import { heroDrinkIds } from '../../utils/drinks-data.js';
import { colors, fonts } from '../../theme.js';

/** 히어로 음료 배치 (패널 기준 % 좌표) */
const layout = [
  { left: '5%', top: '14%', width: '29%', height: '52%', shape: 'arch', delay: 0 },
  { left: '36%', top: '6%', width: '30%', height: '58%', shape: 'arch', delay: 0.6 },
  { left: '68%', top: '18%', width: '27%', height: '50%', shape: 'arch', delay: 1.2 },
  { left: '15%', top: '73%', width: '21%', height: '21%', shape: 'circle', delay: 0.9 },
  { left: '60%', top: '74%', width: '19%', height: '20%', shape: 'circle', delay: 1.6 },
];

/**
 * HeroVisual 컴포넌트 — 세계 음료가 입체적으로 배치된 히어로 비주얼
 * (지구본 라인, 비행경로, 여행 스탬프 그래픽 포함)
 *
 * Example usage:
 * <HeroVisual />
 */
function HeroVisual() {
  const heroDrinks = heroDrinkIds.map(getDrink);

  return (
    <Box
      sx={ {
        position: 'relative',
        width: '100%',
        aspectRatio: { xs: '1 / 1.08', md: '1 / 0.98' },
        borderRadius: { xs: '24px', md: '32px' },
        overflow: 'hidden',
        bgcolor: colors.navy,
        backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(232,182,90,0.22), transparent 45%), radial-gradient(circle at 15% 90%, rgba(243,107,74,0.25), transparent 40%)',
      } }
    >
      { /* 지구본 & 비행경로 */ }
      <Box component="svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden sx={ { position: 'absolute', inset: 0, width: '100%', height: '100%' } }>
        <g fill="none" stroke="#F7F3E9" strokeOpacity="0.12" strokeWidth="1.2">
          <circle cx="300" cy="310" r="250" />
          <ellipse cx="300" cy="310" rx="110" ry="250" />
          <ellipse cx="300" cy="310" rx="190" ry="250" />
          <ellipse cx="300" cy="310" rx="250" ry="90" />
          <ellipse cx="300" cy="310" rx="250" ry="170" />
          <line x1="50" y1="310" x2="550" y2="310" />
          <line x1="300" y1="60" x2="300" y2="560" />
        </g>
        <path
          d="M40 520 C 160 380, 260 600, 380 420 S 560 160, 590 80"
          fill="none"
          stroke="#E8B65A"
          strokeWidth="2"
          strokeDasharray="6 9"
          style={ { animation: 'stw-dash 9s linear infinite' } }
        />
        <g transform="translate(560 112) rotate(-35)">
          <path d="M0 -9 L4 -2 L14 2 L14 5 L4 3 L3 10 L6 13 L6 15 L0 13 L-6 15 L-6 13 L-3 10 L-4 3 L-14 5 L-14 2 L-4 -2 Z" fill="#E8B65A" />
        </g>
      </Box>

      { /* 여행 스탬프 */ }
      <Box
        aria-hidden
        sx={ {
          position: 'absolute',
          right: { xs: '4%', md: '5%' },
          top: { xs: '3%', md: '4%' },
          width: { xs: 74, md: 104 },
          height: { xs: 74, md: 104 },
          borderRadius: '50%',
          border: '2px solid',
          borderColor: colors.coral,
          color: colors.coral,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-12deg)',
          fontFamily: fonts.display,
          lineHeight: 1.1,
          textAlign: 'center',
          outline: '1px dashed',
          outlineOffset: 4,
          opacity: 0.92,
        } }
      >
        <Box sx={ { fontSize: { xs: 9, md: 11 }, letterSpacing: '0.18em' } }>PASSPORT</Box>
        <Box sx={ { fontSize: { xs: 18, md: 26 } } }>15</Box>
        <Box sx={ { fontSize: { xs: 8, md: 10 }, letterSpacing: '0.14em' } }>COUNTRIES</Box>
      </Box>

      { heroDrinks.map((drink, index) => {
        const position = layout[index];
        const country = getCountry(drink.countryId);
        const isArch = position.shape === 'arch';
        return (
          <Box
            key={ drink.id }
            sx={ {
              position: 'absolute',
              left: position.left,
              top: position.top,
              width: position.width,
              height: position.height,
              animation: `stw-float 6s ease-in-out ${ position.delay }s infinite`,
            } }
          >
            <Box
              sx={ {
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: isArch ? '999px 999px 18px 18px' : '50%',
                bgcolor: drink.visual.bg,
                boxShadow: '0 30px 50px -30px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                border: '3px solid rgba(247,243,233,0.9)',
              } }
            >
              <Box sx={ { position: 'absolute', left: '50%', bottom: isArch ? '4%' : '8%', height: isArch ? '74%' : '78%', aspectRatio: '200 / 240', transform: 'translateX(-50%)' } }>
                <DrinkArt visual={ drink.visual } title={ `${ country.name } ${ drink.name } 일러스트` } />
              </Box>
            </Box>
            <Box
              sx={ {
                position: 'absolute',
                left: '50%',
                bottom: isArch ? -14 : -10,
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                bgcolor: colors.ivory,
                color: colors.navy,
                borderRadius: 999,
                px: { xs: 1, md: 1.5 },
                py: 0.5,
                fontSize: { xs: 9, sm: 11, md: 12 },
                fontWeight: 700,
                letterSpacing: '0.06em',
                boxShadow: '0 6px 16px -8px rgba(0,0,0,0.5)',
              } }
            >
              { country.en }
              <Box component="span" sx={ { display: { xs: 'none', sm: 'inline' }, fontWeight: 500, color: colors.coral, ml: 0.75, letterSpacing: 0 } }>
                { drink.name }
              </Box>
            </Box>
          </Box>
        );
      }) }
    </Box>
  );
}

export default HeroVisual;
