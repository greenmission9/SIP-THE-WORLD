import Box from '@mui/material/Box';
import Logo from '../common/logo.jsx';
import { colors, fonts } from '../../theme.js';

/**
 * PassportCard 컴포넌트 — 여행 여권 형태의 그래픽 카드 (발견·마신 음료 수, 방문 국가 수)
 *
 * Props:
 * @param {number} discoveredCount - 발견한 음료 수 [Required]
 * @param {number} drunkCount - 실제 마셔본 음료 수 [Required]
 * @param {number} visitedCount - 방문한(스탬프를 받은) 국가 수 [Required]
 * @param {number} totalCountries - 전체 국가 수 [Required]
 *
 * Example usage:
 * <PassportCard discoveredCount={ 3 } drunkCount={ 1 } visitedCount={ 1 } totalCountries={ 15 } />
 */
function PassportCard({ discoveredCount, drunkCount, visitedCount, totalCountries }) {
  const stats = [
    { label: '발견한 음료', en: 'DISCOVERED', value: discoveredCount },
    { label: '마셔본 음료', en: 'TASTED', value: drunkCount },
    { label: '방문한 국가', en: 'COUNTRIES', value: `${ visitedCount }/${ totalCountries }` },
  ];

  return (
    <Box
      sx={ {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
        borderRadius: { xs: '24px', md: '28px' },
        overflow: 'hidden',
        boxShadow: '0 40px 60px -40px rgba(24,50,71,0.6)',
      } }
    >
      { /* 여권 표지 */ }
      <Box
        sx={ {
          position: 'relative',
          bgcolor: colors.navy,
          color: colors.mustard,
          p: { xs: 4, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: { xs: 260, md: 360 },
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(232,182,90,0.05) 0 2px, transparent 2px 12px)',
        } }
      >
        <Box sx={ { fontFamily: fonts.display, letterSpacing: '0.3em', fontSize: '0.875rem' } }>DRINK PASSPORT</Box>
        <Box sx={ { my: 3, p: 2.5, borderRadius: '50%', border: '1.5px solid', borderColor: colors.mustard } }>
          <Box sx={ { color: colors.mustard, display: 'flex' } }>
            <Logo variant="ivory" size={ 64 } hasWordmark={ false } />
          </Box>
        </Box>
        <Box sx={ { fontFamily: fonts.display, fontSize: '1.375rem', letterSpacing: '0.12em', color: colors.ivory } }>SIP THE WORLD</Box>
        <Box sx={ { mt: 0.5, fontSize: '0.8125rem', letterSpacing: '0.2em' } }>나의 음료 여권</Box>
      </Box>

      { /* 여권 내지 */ }
      <Box
        sx={ {
          position: 'relative',
          bgcolor: '#FFFDF7',
          p: { xs: 3, md: 5 },
          backgroundImage: 'radial-gradient(rgba(24,50,71,0.06) 1px, transparent 1.2px)',
          backgroundSize: '12px 12px',
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <Box sx={ { display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'text.secondary', fontWeight: 700 } }>
          <span>TYPE · P</span>
          <span>CODE · STW</span>
        </Box>
        <Box sx={ { mt: 2, fontSize: '0.75rem', color: 'text.secondary' } }>소지자 / Holder</Box>
        <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '1.5rem', md: '1.875rem' }, color: 'primary.main' } }>World Drink Explorer</Box>

        <Box sx={ { mt: { xs: 3, md: 4 }, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: { xs: 1, md: 2 } } }>
          { stats.map((stat) => (
            <Box key={ stat.en } sx={ { borderTop: '2px solid', borderColor: 'primary.main', pt: 1.5 } }>
              <Box sx={ { fontSize: { xs: '0.5625rem', sm: '0.6875rem' }, letterSpacing: '0.12em', color: 'text.secondary', fontWeight: 700 } }>{ stat.en }</Box>
              <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '1.875rem', md: '2.75rem' }, color: 'secondary.main', lineHeight: 1.1, mt: 0.5 } }>{ stat.value }</Box>
              <Box sx={ { fontSize: { xs: '0.75rem', md: '0.875rem' }, color: 'primary.main', fontWeight: 600 } }>{ stat.label }</Box>
            </Box>
          )) }
        </Box>

        <Box
          aria-hidden
          sx={ {
            mt: 'auto',
            pt: { xs: 3, md: 4 },
            fontFamily: 'ui-monospace, Consolas, monospace',
            fontSize: { xs: '0.625rem', sm: '0.8125rem' },
            letterSpacing: '0.12em',
            color: 'rgba(24,50,71,0.45)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          } }
        >
          P&lt;STW&lt;&lt;WORLD&lt;DRINK&lt;EXPLORER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </Box>
      </Box>
    </Box>
  );
}

export default PassportCard;
