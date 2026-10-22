import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CountryFlag from '../ui/country-flag.jsx';
import DrinkArt from '../ui/drink-art.jsx';
import FavoriteButton from '../ui/favorite-button.jsx';
import { useAppUi } from '../../hooks/use-app-ui.js';
import { passportActions } from '../../hooks/use-passport.js';
import { getCountry } from '../../utils/drink-utils.js';

/**
 * PassportDrinkItem 컴포넌트 — 여권 목록의 음료 한 줄 (관심 저장/마셔봤어요 토글 포함)
 *
 * Props:
 * @param {object} drink - 음료 데이터 [Required]
 * @param {string} drunkAt - 마신 기록일(ISO) [Optional]
 *
 * Example usage:
 * <PassportDrinkItem drink={ drink } drunkAt="2026-10-21T..." />
 */
function PassportDrinkItem({ drink, drunkAt }) {
  const { notify } = useAppUi();
  const country = getCountry(drink.countryId);
  const isDrunk = Boolean(drunkAt);

  const toggleDrunk = () => {
    const isRecorded = passportActions.toggleDrunk(drink.id);
    notify(isRecorded ? `${ country.name } 스탬프가 찍혔어요!` : '마셔본 기록을 취소했어요.');
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        pr: { xs: 1.5, sm: 2 },
        borderRadius: '18px',
        bgcolor: '#FFFFFF',
        border: '1px solid',
        borderColor: 'divider',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      } }
    >
      <Box
        component={ RouterLink }
        to={ `/drinks/${ drink.id }` }
        sx={ { display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit' } }
      >
        <Box sx={ { width: 72, height: 72, borderRadius: '14px', bgcolor: drink.visual.bg, p: 0.75, flexShrink: 0 } }>
          <DrinkArt visual={ drink.visual } hasShadow={ false } title={ `${ drink.name } 일러스트` } />
        </Box>
        <Box sx={ { minWidth: 0 } }>
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.8125rem', color: 'text.secondary' } }>
            <CountryFlag countryId={ country.id } name={ country.name } size={ 12 } />
            { country.name }
          </Box>
          <Box sx={ { fontWeight: 700, fontSize: '1.0625rem', color: 'primary.main' } }>{ drink.name }</Box>
          <Box sx={ { fontSize: '0.8125rem', color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
            { isDrunk ? `${ new Date(drunkAt).toLocaleDateString('ko-KR') }에 기록` : drink.tagline }
          </Box>
        </Box>
      </Box>
      <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 'auto', sm: 0 } } }>
        <Button
          size="small"
          variant={ isDrunk ? 'contained' : 'outlined' }
          color="success"
          startIcon={ isDrunk ? <CheckCircleIcon /> : <CheckCircleOutlineIcon /> }
          onClick={ toggleDrunk }
          aria-pressed={ isDrunk }
          sx={ { whiteSpace: 'nowrap' } }
        >
          마셔봤어요
        </Button>
        <FavoriteButton drink={ drink } sx={ { border: '1px solid', borderColor: 'divider' } } />
      </Box>
    </Box>
  );
}

export default PassportDrinkItem;
