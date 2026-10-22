import Box from '@mui/material/Box';
import DrinkArt from './drink-art.jsx';

/**
 * DrinkVisual 컴포넌트 — 음료 사진 영역
 * - drink.image가 있으면 실제 사진을, 없으면 음료 특징을 표현한 일러스트를 보여 줍니다.
 *
 * Props:
 * @param {object} drink - 음료 데이터 [Required]
 * @param {string} ratio - 영역 비율 (CSS aspect-ratio) [Optional, 기본값: '4 / 3']
 * @param {number} artHeight - 일러스트 높이 비율(%) [Optional, 기본값: 82]
 * @param {boolean} hasLabel - '일러스트' 표기 노출 여부 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <DrinkVisual drink={ drink } ratio="1 / 1" hasLabel />
 */
function DrinkVisual({ drink, ratio = '4 / 3', artHeight = 82, hasLabel = false, sx = {} }) {
  const bg = drink.visual?.bg ?? '#EDE5D3';

  return (
    <Box
      sx={ {
        position: 'relative',
        aspectRatio: ratio,
        width: '100%',
        overflow: 'hidden',
        bgcolor: bg,
        backgroundImage: `radial-gradient(circle at 50% 42%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 58%), radial-gradient(rgba(24,50,71,0.08) 1px, transparent 1.4px)`,
        backgroundSize: '100% 100%, 14px 14px',
        ...sx,
      } }
    >
      <Box
        aria-hidden
        sx={ {
          position: 'absolute',
          inset: '12% auto auto 50%',
          width: '64%',
          aspectRatio: '1 / 1',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          border: '1.5px dashed rgba(24,50,71,0.16)',
        } }
      />
      { drink.image ? (
        <Box
          component="img"
          className="drink-visual__photo"
          src={ drink.image }
          alt={ `${ drink.name } 사진` }
          loading="lazy"
          sx={ { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s cubic-bezier(.2,.7,.2,1)' } }
        />
      ) : (
        <Box
          className="drink-visual__art"
          sx={ {
            position: 'absolute',
            left: '50%',
            bottom: '4%',
            height: `${ artHeight }%`,
            aspectRatio: '200 / 240',
            transform: 'translateX(-50%)',
            transformOrigin: '50% 90%',
            transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
          } }
        >
          <DrinkArt visual={ drink.visual } title={ `${ drink.name } 일러스트` } />
        </Box>
      ) }
      { hasLabel && (
        <Box
          sx={ {
            position: 'absolute',
            right: 12,
            bottom: 12,
            px: 1,
            py: 0.25,
            borderRadius: 1,
            bgcolor: 'rgba(255,255,255,0.7)',
            color: 'rgba(36,49,58,0.7)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
          } }
        >
          { drink.image ? drink.imageCredit ?? 'PHOTO' : 'ILLUSTRATION' }
        </Box>
      ) }
    </Box>
  );
}

export default DrinkVisual;
