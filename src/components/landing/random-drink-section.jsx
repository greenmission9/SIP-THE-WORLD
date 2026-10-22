import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import CountryFlag from '../ui/country-flag.jsx';
import DrinkVisual from '../ui/drink-visual.jsx';
import Reveal from '../ui/reveal.jsx';
import SectionHeading from '../ui/section-heading.jsx';
import { useAppUi } from '../../hooks/use-app-ui.js';
import { passportActions } from '../../hooks/use-passport.js';
import { getCountry, getDrink, pickRandomDrink } from '../../utils/drink-utils.js';
import { drinks } from '../../utils/drinks-data.js';
import { colors, fonts } from '../../theme.js';

const SHUFFLE_STEPS = 12;

/**
 * RandomDrinkSection 컴포넌트 — '오늘의 음료 랜덤 여행'
 * - 버튼을 누르면 등록된 음료가 빠르게 바뀌다가 하나가 무작위로 선택됩니다.
 *
 * Props:
 * @param {object} sectionRef - 히어로 버튼에서 스크롤하기 위한 ref [Optional]
 *
 * Example usage:
 * <RandomDrinkSection sectionRef={ randomRef } />
 */
function RandomDrinkSection({ sectionRef = null }) {
  const { openQuiz } = useAppUi();
  const [drink, setDrink] = useState(() => getDrink('butterfly-pea'));
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const timerRef = useRef(null);
  const country = getCountry(drink.countryId);

  useEffect(() => () => window.clearInterval(timerRef.current), []);

  const draw = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let step = 0;
    let current = drink;
    timerRef.current = window.setInterval(() => {
      current = pickRandomDrink(current.id);
      setDrink(current);
      step += 1;
      if (step >= SHUFFLE_STEPS) {
        window.clearInterval(timerRef.current);
        setIsSpinning(false);
        setDrawCount((count) => count + 1);
        passportActions.markDiscovered(current.id);
      }
    }, 80);
  };

  return (
    <Box component="section" id="random-drink" ref={ sectionRef } sx={ { py: { xs: 10, md: 15 }, scrollMarginTop: { xs: 64, md: 76 } } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Reveal>
          <SectionHeading
            eyebrow="Today's Random Trip"
            title="오늘은 어느 나라를 마셔볼까요?"
            description="선택하기 어렵다면 운명에 맡겨보세요."
          />
        </Reveal>

        <Grid container spacing={ { xs: 3, md: 4 } } sx={ { alignItems: 'stretch' } }>
          { /* 왼쪽: 인터랙티브 영역 */ }
          <Grid size={ { xs: 12, md: 5 } }>
            <Box
              sx={ {
                position: 'relative',
                height: '100%',
                minHeight: { xs: 400, md: 520 },
                borderRadius: '24px',
                bgcolor: colors.navy,
                color: colors.ivory,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: { xs: 4, md: 5 },
                backgroundImage: 'radial-gradient(circle at 50% 38%, rgba(232,182,90,0.18), transparent 55%)',
              } }
            >
              <Box sx={ { position: 'relative', width: { xs: 170, md: 210 }, height: { xs: 170, md: 210 } } }>
                <Box
                  component="svg"
                  viewBox="0 0 200 200"
                  aria-hidden
                  sx={ { width: '100%', height: '100%', animation: `stw-spin ${ isSpinning ? '0.9s' : '28s' } linear infinite` } }
                >
                  <circle cx="100" cy="100" r="86" fill="#21405A" stroke={ colors.ivory } strokeWidth="2" />
                  <g fill="none" stroke={ colors.ivory } strokeOpacity="0.35" strokeWidth="1.2">
                    <ellipse cx="100" cy="100" rx="36" ry="86" />
                    <ellipse cx="100" cy="100" rx="66" ry="86" />
                    <ellipse cx="100" cy="100" rx="86" ry="30" />
                    <ellipse cx="100" cy="100" rx="86" ry="60" />
                  </g>
                  <g fill={ colors.mustard } fillOpacity="0.85">
                    <path d="M58 58 q14 -10 30 -4 q6 12 -6 20 q-10 4 -12 14 q-12 -2 -16 -12 q-4 -10 4 -18 Z" />
                    <path d="M112 70 q16 -8 30 2 q8 14 -2 22 q-10 -2 -16 6 q-10 -6 -14 -16 q-2 -8 2 -14 Z" />
                    <path d="M96 118 q12 2 18 12 q2 16 -8 24 q-10 -6 -12 -18 q-2 -10 2 -18 Z" />
                    <path d="M140 124 q10 0 14 8 q-2 8 -10 8 q-6 -6 -4 -16 Z" />
                  </g>
                </Box>
                <Box sx={ { position: 'absolute', inset: -14, borderRadius: '50%', border: '1.5px dashed rgba(247,243,233,0.35)' } } />
              </Box>

              <Typography sx={ { mt: 4, fontFamily: fonts.display, fontSize: { xs: '1.5rem', md: '1.75rem' }, color: colors.ivory } }>
                Spin the Globe
              </Typography>
              <Typography sx={ { mt: 1, color: 'rgba(247,243,233,0.72)', fontSize: '0.9375rem' } }>
                { `${ drinks.length }가지 세계 음료 중 한 잔이 당신을 기다려요.` }
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={ <CasinoOutlinedIcon /> }
                onClick={ draw }
                disabled={ isSpinning }
                sx={ { mt: 3.5, px: 4, py: 1.6, '&.Mui-disabled': { bgcolor: colors.coral, color: '#FFFFFF', opacity: 0.85 } } }
              >
                { isSpinning ? '지구본을 돌리는 중…' : '랜덤 음료 뽑기' }
              </Button>

              { /* 여행 스탬프 */ }
              <Box
                key={ drawCount }
                aria-hidden
                sx={ {
                  position: 'absolute',
                  right: { xs: 18, md: 26 },
                  bottom: { xs: 18, md: 26 },
                  width: 86,
                  height: 86,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: colors.mustard,
                  color: colors.mustard,
                  outline: '1px dashed',
                  outlineOffset: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.display,
                  lineHeight: 1.1,
                  transform: 'rotate(-12deg)',
                  animation: drawCount > 0 ? 'stw-stamp .5s ease both' : 'none',
                } }
              >
                <Box sx={ { fontSize: 9, letterSpacing: '0.16em' } }>ARRIVED</Box>
                <Box sx={ { fontSize: 11, letterSpacing: '0.06em', maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>{ country.en }</Box>
                <Box sx={ { fontSize: 9, letterSpacing: '0.16em' } }>{ `No.${ String(drawCount).padStart(3, '0') }` }</Box>
              </Box>
            </Box>
          </Grid>

          { /* 오른쪽: 결과 카드 */ }
          <Grid size={ { xs: 12, md: 7 } }>
            <Box
              aria-live="polite"
              sx={ {
                height: '100%',
                bgcolor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                boxShadow: '0 20px 40px -32px rgba(24,50,71,0.5)',
              } }
            >
              <DrinkVisual drink={ drink } ratio="auto" sx={ { minHeight: { xs: 280, sm: '100%' }, height: '100%' } } artHeight={ 72 } />
              <Box sx={ { p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: isSpinning ? 0.45 : 1, transition: 'opacity .2s ease' } }>
                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem', fontWeight: 700, color: 'secondary.main' } }>
                  <CountryFlag countryId={ country.id } name={ country.name } size={ 15 } />
                  { country.name }
                  <Box component="span" sx={ { color: 'text.secondary', fontWeight: 500, letterSpacing: '0.08em', fontSize: '0.75rem' } }>{ country.en }</Box>
                </Box>
                <Typography variant="h2" component="h3" sx={ { mt: 1.5, color: 'primary.main', fontSize: { xs: '1.75rem', md: '2.25rem' } } }>
                  { drink.name }
                </Typography>
                <Typography sx={ { color: 'text.secondary', fontStyle: 'italic', mt: 0.5 } }>{ drink.local }</Typography>
                <Typography sx={ { mt: 2.5, wordBreak: 'keep-all' } }>{ drink.intro }</Typography>
                <Box sx={ { mt: 3.5 } }>
                  <Button component={ RouterLink } to={ `/drinks/${ drink.id }` } variant="contained" color="primary" disabled={ isSpinning }>
                    이 음료 탐험하기 →
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={ { mt: { xs: 5, md: 6 }, textAlign: 'center' } }>
          <Button
            onClick={ openQuiz }
            sx={ {
              fontSize: { xs: '1.0625rem', md: '1.25rem' },
              fontWeight: 700,
              color: 'primary.main',
              px: 3,
              borderBottom: '2px solid',
              borderColor: 'secondary.main',
              borderRadius: 0,
              '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
            } }
          >
            나의 음료 취향 찾기 →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default RandomDrinkSection;
