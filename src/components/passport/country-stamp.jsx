import Box from '@mui/material/Box';
import { fonts } from '../../theme.js';

const stampColors = ['#F36B4A', '#2A8068', '#183247', '#C98A1E', '#7B4FC9'];

/**
 * CountryStamp 컴포넌트 — 나라별 음료 스탬프 (마셔본 음료가 있으면 찍힘)
 *
 * Props:
 * @param {object} country - 국가 데이터 [Required]
 * @param {number} index - 색상·각도 변주용 순번 [Required]
 * @param {boolean} isStamped - 스탬프 획득 여부 [Required]
 * @param {number} drunkCount - 해당 국가에서 마신 음료 수 [Optional, 기본값: 0]
 *
 * Example usage:
 * <CountryStamp country={ country } index={ 0 } isStamped />
 */
function CountryStamp({ country, index, isStamped, drunkCount = 0 }) {
  const color = stampColors[index % stampColors.length];
  const rotate = ((index * 37) % 24) - 12;

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 } }>
      <Box
        aria-label={ isStamped ? `${ country.name } 스탬프 획득` : `${ country.name } 스탬프 미획득` }
        role="img"
        sx={ {
          width: { xs: 84, md: 100 },
          height: { xs: 84, md: 100 },
          borderRadius: index % 3 === 1 ? '18px' : '50%',
          border: '2.5px solid',
          borderColor: isStamped ? color : 'rgba(24,50,71,0.18)',
          borderStyle: isStamped ? 'solid' : 'dashed',
          outline: isStamped ? '1px dashed' : 'none',
          outlineColor: color,
          outlineOffset: 3,
          color: isStamped ? color : 'rgba(24,50,71,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: isStamped ? `rotate(${ rotate }deg)` : 'none',
          fontFamily: fonts.display,
          lineHeight: 1.1,
          bgcolor: isStamped ? `${ color }0D` : 'transparent',
          transition: 'transform .3s ease',
        } }
      >
        <Box sx={ { fontSize: { xs: 9, md: 10 }, letterSpacing: '0.14em' } }>{ isStamped ? 'VISITED' : 'NOT YET' }</Box>
        <Box sx={ { fontSize: { xs: 11, md: 13 }, letterSpacing: '0.04em', px: 0.5, wordBreak: 'break-word' } }>{ country.en }</Box>
        { isStamped && <Box sx={ { fontSize: 9, letterSpacing: '0.12em', mt: 0.25 } }>{ `× ${ drunkCount }` }</Box> }
      </Box>
      <Box sx={ { fontSize: '0.8125rem', fontWeight: 600, color: isStamped ? 'primary.main' : 'text.secondary' } }>{ country.name }</Box>
    </Box>
  );
}

export default CountryStamp;
