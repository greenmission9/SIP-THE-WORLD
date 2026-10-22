import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { passportActions, usePassport } from '../../hooks/use-passport.js';
import { useAppUi } from '../../hooks/use-app-ui.js';

/**
 * FavoriteButton 컴포넌트 — 관심 음료 저장/해제 아이콘 버튼
 *
 * Props:
 * @param {object} drink - 음료 데이터 [Required]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <FavoriteButton drink={ drink } />
 */
function FavoriteButton({ drink, sx = {} }) {
  const { favorites } = usePassport();
  const { notify } = useAppUi();
  const isFavorite = favorites.includes(drink.id);

  const handleClick = (event) => {
    event.stopPropagation();
    const isSaved = passportActions.toggleFavorite(drink.id);
    notify(isSaved ? `'${ drink.name }'을(를) 관심 음료에 저장했어요.` : `'${ drink.name }'을(를) 관심 음료에서 뺐어요.`);
  };

  return (
    <Tooltip title={ isFavorite ? '관심 음료 해제' : '관심 음료 저장' }>
      <IconButton
        onClick={ handleClick }
        aria-label={ isFavorite ? `${ drink.name } 관심 음료 해제` : `${ drink.name } 관심 음료 저장` }
        aria-pressed={ isFavorite }
        sx={ {
          bgcolor: 'rgba(255,255,255,0.9)',
          color: isFavorite ? 'secondary.main' : 'primary.main',
          backdropFilter: 'blur(6px)',
          transition: 'transform .2s ease, background-color .2s ease',
          '&:hover': { bgcolor: '#FFFFFF', transform: 'scale(1.08)' },
          '&:active': { transform: 'scale(0.92)' },
          ...sx,
        } }
      >
        { isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" /> }
      </IconButton>
    </Tooltip>
  );
}

export default FavoriteButton;
