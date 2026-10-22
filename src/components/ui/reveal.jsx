import Box from '@mui/material/Box';
import { useInView } from '../../hooks/use-in-view.js';

/**
 * Reveal 컴포넌트 — 화면에 들어올 때 부드럽게 페이드 인
 *
 * Props:
 * @param {node} children - 감쌀 콘텐츠 [Required]
 * @param {number} delay - 애니메이션 지연(ms) [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <Reveal delay={ 120 }><Card /></Reveal>
 */
function Reveal({ children, delay = 0, sx = {} }) {
  const [ref, isInView] = useInView();

  return (
    <Box
      ref={ ref }
      sx={ {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : 'translateY(28px)',
        transition: `opacity .8s ease ${ delay }ms, transform .8s cubic-bezier(.2,.7,.2,1) ${ delay }ms`,
        ...sx,
      } }
    >
      { children }
    </Box>
  );
}

export default Reveal;
