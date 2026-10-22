import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * EmptyState 컴포넌트 — 결과가 없을 때 안내 영역
 *
 * Props:
 * @param {string} title - 안내 제목 [Required]
 * @param {string} description - 보조 설명 [Optional]
 * @param {node} action - 버튼 등 액션 [Optional]
 *
 * Example usage:
 * <EmptyState title="검색 결과가 없어요" action={ <Button>필터 초기화</Button> } />
 */
function EmptyState({ title, description, action = null }) {
  return (
    <Box
      sx={ {
        py: { xs: 7, md: 9 },
        px: 3,
        textAlign: 'center',
        borderRadius: '20px',
        border: '1.5px dashed',
        borderColor: 'rgba(24,50,71,0.2)',
        bgcolor: 'rgba(255,255,255,0.5)',
      } }
    >
      <Box component="svg" viewBox="0 0 64 64" aria-hidden sx={ { width: 56, height: 56, color: 'secondary.main', mb: 2 } }>
        <path d="M14 18 L50 18 L46 52 Q45 56 41 56 L23 56 Q19 56 18 52 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 10 q4 -4 0 -8 M32 10 q4 -4 0 -8 M40 10 q4 -4 0 -8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </Box>
      <Typography variant="h4" component="p" sx={ { color: 'primary.main' } }>{ title }</Typography>
      { description && <Typography sx={ { mt: 1, color: 'text.secondary', wordBreak: 'keep-all' } }>{ description }</Typography> }
      { action && <Box sx={ { mt: 3 } }>{ action }</Box> }
    </Box>
  );
}

export default EmptyState;
