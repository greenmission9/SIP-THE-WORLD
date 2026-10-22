import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import HeroVisual from './hero-visual.jsx';
import { countries, drinks } from '../../utils/drinks-data.js';
import { colors, fonts } from '../../theme.js';

const stats = [
  { value: countries.length, label: '개국' },
  { value: drinks.length, label: '가지 음료' },
  { value: '∞', label: '새로운 이야기' },
];

/**
 * HeroSection 컴포넌트 — 메인 광고 배너 (좌측 텍스트 45% + 우측 비주얼 55%)
 *
 * Props:
 * @param {function} onRandomClick - '랜덤 음료 발견하기' 클릭 핸들러 [Required]
 *
 * Example usage:
 * <HeroSection onRandomClick={ scrollToRandom } />
 */
function HeroSection({ onRandomClick }) {
  const navigate = useNavigate();

  return (
    <Box component="section" sx={ { position: 'relative', pt: { xs: 4, md: 7 }, pb: { xs: 9, md: 12 }, overflow: 'hidden' } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Grid container spacing={ { xs: 6, md: 6 } } sx={ { alignItems: 'center' } }>
          <Grid size={ { xs: 12, md: 5.4 } }>
            <Box sx={ { animation: 'stw-pop .9s ease both' } }>
              <Box
                sx={ {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 999,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'rgba(255,255,255,0.6)',
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: 'primary.main',
                } }
              >
                <Box component="span" sx={ { width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' } } />
                DISCOVER THE WORLD THROUGH DRINKS
              </Box>
              <Typography
                variant="h1"
                component="h1"
                sx={ {
                  mt: 3,
                  color: 'primary.main',
                  fontFamily: fonts.serifKr,
                  fontWeight: 700,
                  lineHeight: 1.22,
                  wordBreak: 'keep-all',
                } }
              >
                한 잔의 음료로
                <br />
                <Box component="span" sx={ { position: 'relative', display: 'inline-block', color: 'secondary.main' } }>
                  세계 어디든.
                  <Box
                    component="svg"
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    aria-hidden
                    sx={ { position: 'absolute', left: 0, bottom: { xs: -6, md: -10 }, width: '100%', height: { xs: 10, md: 14 } } }
                  >
                    <path d="M4 14 C 80 2, 200 2, 296 10" fill="none" stroke={ colors.mustard } strokeWidth="5" strokeLinecap="round" />
                  </Box>
                </Box>
              </Typography>
              <Typography sx={ { mt: 4, fontSize: { xs: '1rem', md: '1.125rem' }, color: 'text.secondary', maxWidth: 460, wordBreak: 'keep-all' } }>
                익숙한 커피부터 처음 보는 신기한 음료까지. 세계의 맛과 이야기를 발견하는 특별한 여행이 시작됩니다.
              </Typography>
              <Box sx={ { mt: 4.5, display: 'flex', gap: 1.5, flexWrap: 'wrap' } }>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={ <ExploreOutlinedIcon /> }
                  onClick={ () => navigate('/', { state: { scrollTo: 'world-map' } }) }
                  sx={ { px: 3.5, py: 1.6 } }
                >
                  세계 음료 탐험하기
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={ <ShuffleIcon /> }
                  onClick={ onRandomClick }
                  sx={ { px: 3.5, py: 1.6, borderWidth: 1.5, '&:hover': { borderWidth: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText' } } }
                >
                  랜덤 음료 발견하기
                </Button>
              </Box>
              <Box sx={ { mt: { xs: 5, md: 7 }, display: 'flex', gap: { xs: 3, md: 5 } } }>
                { stats.map((stat) => (
                  <Box key={ stat.label }>
                    <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: 'primary.main', lineHeight: 1 } }>{ stat.value }</Box>
                    <Box sx={ { mt: 0.75, fontSize: '0.8125rem', color: 'text.secondary' } }>{ stat.label }</Box>
                  </Box>
                )) }
              </Box>
            </Box>
          </Grid>
          <Grid size={ { xs: 12, md: 6.6 } }>
            <Box sx={ { animation: 'stw-pop 1.1s ease .15s both' } }>
              <HeroVisual />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
