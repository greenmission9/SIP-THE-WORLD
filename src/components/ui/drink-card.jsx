import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CountryFlag from './country-flag.jsx';
import DrinkVisual from './drink-visual.jsx';
import FavoriteButton from './favorite-button.jsx';
import { getCountry } from '../../utils/drink-utils.js';

/**
 * DrinkCard 컴포넌트 — 음료 카드 (사진, 국가, 이름, 특징, 맛 키워드, 자세히 보기)
 * - 카드 전체가 상세페이지 링크이며, 호버 시 사진 확대와 CTA가 나타납니다.
 *
 * Props:
 * @param {object} drink - 음료 데이터 [Required]
 * @param {boolean} isCompact - 키워드를 숨긴 간단한 카드 여부 [Optional, 기본값: false]
 * @param {string} ctaLabel - CTA 문구 [Optional, 기본값: '자세히 보기']
 *
 * Example usage:
 * <DrinkCard drink={ drink } />
 */
function DrinkCard({ drink, isCompact = false, ctaLabel = '자세히 보기' }) {
  const country = getCountry(drink.countryId);

  return (
    <Box
      component="article"
      sx={ {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 1px 0 rgba(24,50,71,0.06), 0 12px 32px -24px rgba(24,50,71,0.45)',
        transition: 'transform .35s ease, box-shadow .35s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 1px 0 rgba(24,50,71,0.06), 0 28px 48px -28px rgba(24,50,71,0.55)',
        },
        '&:hover .drink-visual__art': { transform: 'translateX(-50%) scale(1.08)' },
        '&:hover .drink-visual__photo': { transform: 'scale(1.06)' },
        '&:hover .drink-card__cta': { opacity: 1, transform: 'none' },
        '&:focus-within': { outline: '3px solid', outlineColor: 'secondary.main', outlineOffset: 3 },
      } }
    >
      <DrinkVisual drink={ drink } ratio={ isCompact ? '4 / 3' : '5 / 4' } />
      <FavoriteButton drink={ drink } sx={ { position: 'absolute', top: 14, right: 14, zIndex: 2 } } />
      <Box sx={ { p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 1.25, flexGrow: 1 } }>
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.8125rem', fontWeight: 600 } }>
          <CountryFlag countryId={ country.id } name={ country.name } size={ 14 } />
          { country.name }
          <Box component="span" sx={ { opacity: 0.5, letterSpacing: '0.08em', fontSize: '0.6875rem' } }>{ country.en }</Box>
        </Box>
        <Box>
          <Typography variant="h4" component="h3" sx={ { color: 'primary.main' } }>
            <Box
              component={ RouterLink }
              to={ `/drinks/${ drink.id }` }
              sx={ {
                color: 'inherit',
                textDecoration: 'none',
                outline: 'none',
                '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 1 },
              } }
            >
              { drink.name }
            </Box>
          </Typography>
          <Typography variant="body2" sx={ { color: 'text.secondary', fontStyle: 'italic', mt: 0.25 } }>
            { drink.local }
          </Typography>
        </Box>
        <Typography variant="body2" sx={ { color: 'text.primary', wordBreak: 'keep-all' } }>
          { drink.tagline }
        </Typography>
        { !isCompact && (
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.75 } }>
            { drink.keywords.slice(0, 3).map((keyword) => (
              <Chip key={ keyword } label={ `#${ keyword }` } size="small" sx={ { bgcolor: '#F7F3E9', color: 'primary.main', fontWeight: 600 } } />
            )) }
          </Box>
        ) }
        <Box
          className="drink-card__cta"
          aria-hidden
          sx={ {
            mt: 'auto',
            pt: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'secondary.main',
            fontWeight: 700,
            fontSize: '0.9375rem',
            transition: 'opacity .3s ease, transform .3s ease',
            '@media (hover: hover)': { opacity: 0, transform: 'translateY(8px)' },
          } }
        >
          { ctaLabel }
          <ArrowForwardIcon sx={ { fontSize: 18 } } />
        </Box>
      </Box>
    </Box>
  );
}

export default DrinkCard;
