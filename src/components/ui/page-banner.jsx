import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DrinkArt from './drink-art.jsx';
import { colors, fonts } from '../../theme.js';

/**
 * PageBanner 컴포넌트 — 서브페이지 상단 가로형 배너 (영문 대제목 + 한글 설명 + 음료 일러스트 행렬)
 *
 * Props:
 * @param {string} eyebrow - 작은 상단 문구 [Optional]
 * @param {string} title - 영문 대제목 [Required]
 * @param {string} subtitle - 한글 제목 [Optional]
 * @param {string} description - 한 줄 설명 [Optional]
 * @param {object[]} drinks - 배너에 보여 줄 음료 목록 [Optional, 기본값: []]
 * @param {string} accent - 강조 색 [Optional, 기본값: colors.mustard]
 *
 * Example usage:
 * <PageBanner title="DRINKS AROUND THE WORLD" description="..." drinks={ list } />
 */
function PageBanner({ eyebrow, title, subtitle, description, drinks = [], accent = colors.mustard }) {
  return (
    <Box component="section" sx={ { pt: { xs: 3, md: 5 } } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Box
          sx={ {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: '24px', md: '32px' },
            bgcolor: colors.navy,
            color: colors.ivory,
            px: { xs: 3, md: 7 },
            py: { xs: 5, md: 7 },
            minHeight: { md: 340 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            gap: 4,
            backgroundImage: `radial-gradient(circle at 85% 30%, ${ accent }33, transparent 45%)`,
          } }
        >
          <Box component="svg" viewBox="0 0 1200 340" preserveAspectRatio="none" aria-hidden sx={ { position: 'absolute', inset: 0, width: '100%', height: '100%' } }>
            <path d="M-20 300 C 260 120, 520 360, 820 160 S 1120 40, 1240 90" fill="none" stroke={ accent } strokeOpacity="0.6" strokeWidth="2" strokeDasharray="6 10" />
          </Box>
          <Box sx={ { position: 'relative', flex: '1 1 55%', minWidth: 0 } }>
            { eyebrow && (
              <Box sx={ { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', color: accent, mb: 2 } }>{ eyebrow }</Box>
            ) }
            <Typography
              component="h1"
              sx={ { fontFamily: fonts.display, fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' }, lineHeight: 1.04, letterSpacing: '0.01em', wordBreak: 'break-word' } }
            >
              { title }
            </Typography>
            { subtitle && (
              <Typography component="p" sx={ { mt: 2, fontSize: { xs: '1.125rem', md: '1.375rem' }, fontWeight: 700, wordBreak: 'keep-all' } }>
                { subtitle }
              </Typography>
            ) }
            { description && (
              <Typography sx={ { mt: 1.5, color: 'rgba(247,243,233,0.75)', maxWidth: 520, wordBreak: 'keep-all' } }>
                { description }
              </Typography>
            ) }
          </Box>
          { drinks.length > 0 && (
            <Box aria-hidden sx={ { position: 'relative', flex: '1 1 45%', display: 'flex', alignItems: 'flex-end', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: { xs: 1, md: 1.5 } } }>
              { drinks.slice(0, 4).map((drink, index) => (
                <Box
                  key={ drink.id }
                  sx={ {
                    width: { xs: 64, sm: 90, md: 108 },
                    height: { xs: 96, sm: 132, md: index % 2 ? 150 : 176 },
                    borderRadius: '999px 999px 14px 14px',
                    bgcolor: drink.visual.bg,
                    border: '2px solid rgba(247,243,233,0.85)',
                    p: 1,
                    pt: 2,
                    animation: `stw-float 6s ease-in-out ${ index * 0.5 }s infinite`,
                  } }
                >
                  <DrinkArt visual={ drink.visual } hasShadow={ false } />
                </Box>
              )) }
            </Box>
          ) }
        </Box>
      </Container>
    </Box>
  );
}

export default PageBanner;
