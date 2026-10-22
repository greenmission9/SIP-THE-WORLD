import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fonts } from '../../theme.js';

/**
 * SectionHeading 컴포넌트 — 섹션 상단 제목 묶음 (영문 아이브로 + 제목 + 설명)
 *
 * Props:
 * @param {string} eyebrow - 영문 소제목 [Optional]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 설명 문구 [Optional]
 * @param {string} align - 정렬 'left' | 'center' [Optional, 기본값: 'left']
 * @param {boolean} isDark - 어두운 배경 위 사용 여부 [Optional, 기본값: false]
 * @param {node} action - 오른쪽에 둘 버튼 등 [Optional]
 *
 * Example usage:
 * <SectionHeading eyebrow="WORLD MAP" title="지도를 펼치면" description="..." />
 */
function SectionHeading({ eyebrow, title, description, align = 'left', isDark = false, action = null }) {
  const isCenter = align === 'center';

  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: { xs: 'column', md: isCenter ? 'column' : 'row' },
        alignItems: { xs: isCenter ? 'center' : 'flex-start', md: isCenter ? 'center' : 'flex-end' },
        justifyContent: 'space-between',
        gap: 3,
        textAlign: isCenter ? 'center' : 'left',
        mb: { xs: 4, md: 6 },
      } }
    >
      <Box sx={ { maxWidth: 720 } }>
        { eyebrow && (
          <Box
            sx={ {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              mb: 2,
              color: isDark ? 'warning.main' : 'secondary.main',
              fontFamily: fonts.display,
              fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              letterSpacing: '0.08em',
            } }
          >
            <Box component="span" sx={ { width: 28, height: '1.5px', bgcolor: 'currentColor' } } />
            { eyebrow }
          </Box>
        ) }
        <Typography variant="h2" component="h2" sx={ { color: isDark ? '#F7F3E9' : 'primary.main', wordBreak: 'keep-all' } }>
          { title }
        </Typography>
        { description && (
          <Typography
            sx={ {
              mt: 2,
              color: isDark ? 'rgba(247,243,233,0.75)' : 'text.secondary',
              fontSize: { xs: '1rem', md: '1.0625rem' },
              wordBreak: 'keep-all',
            } }
          >
            { description }
          </Typography>
        ) }
      </Box>
      { action }
    </Box>
  );
}

export default SectionHeading;
