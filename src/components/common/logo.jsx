import Box from '@mui/material/Box';
import { colors, fonts } from '../../theme.js';

/**
 * Logo 컴포넌트 — 지구본 + 물방울 심벌과 SIP THE WORLD 워드마크
 *
 * Props:
 * @param {string} variant - 색상 버전 'navy' | 'ivory' [Optional, 기본값: 'navy']
 * @param {number} size - 심벌 크기(px) [Optional, 기본값: 36]
 * @param {boolean} hasWordmark - 워드마크 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <Logo variant="ivory" />
 */
function Logo({ variant = 'navy', size = 36, hasWordmark = true }) {
  const main = variant === 'ivory' ? colors.ivory : colors.navy;

  return (
    <Box sx={ { display: 'inline-flex', alignItems: 'center', gap: 1.25, color: main } }>
      <Box component="svg" viewBox="0 0 48 48" sx={ { width: size, height: size, flexShrink: 0 } } aria-hidden>
        <circle cx="24" cy="26" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <ellipse cx="24" cy="26" rx="7.5" ry="17" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        <path d="M8 21 Q24 25 40 21" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        <path d="M8 31 Q24 35 40 31" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        <path d="M24 3 C28.5 10 31.5 14 31.5 18.5 a7.5 7.5 0 0 1 -15 0 C16.5 14 19.5 10 24 3 Z" fill={ colors.coral } stroke={ variant === 'ivory' ? colors.navy : colors.ivory } strokeWidth="1.6" />
      </Box>
      { hasWordmark && (
        <Box
          component="span"
          sx={ {
            fontFamily: fonts.display,
            fontSize: size * 0.56,
            letterSpacing: '0.06em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          } }
        >
          SIP THE WORLD
        </Box>
      ) }
    </Box>
  );
}

export default Logo;
