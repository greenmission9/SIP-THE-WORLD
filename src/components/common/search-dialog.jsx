import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CountryFlag from '../ui/country-flag.jsx';
import DrinkArt from '../ui/drink-art.jsx';
import { getCountry, searchDrinks } from '../../utils/drink-utils.js';

const suggestions = ['커피', '보라색', '민트', '소금', '일본', '탄산'];

/**
 * SearchDialog 컴포넌트 — 음료 통합 검색 (음료명·국가·재료·맛 키워드)
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 *
 * Example usage:
 * <SearchDialog isOpen={ isOpen } onClose={ handleClose } />
 */
function SearchDialog({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const results = searchDrinks(query);

  const close = () => {
    onClose();
    setQuery('');
  };

  const goTo = (path) => {
    navigate(path);
    close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    goTo(`/drinks?q=${ encodeURIComponent(query.trim()) }`);
  };

  return (
    <Dialog open={ isOpen } onClose={ close } fullWidth maxWidth="sm" slotProps={ { paper: { sx: { alignSelf: 'flex-start', mt: { xs: 2, md: 10 }, mx: 2, width: 'calc(100% - 32px)' } } } }>
      <Box component="form" onSubmit={ handleSubmit } sx={ { p: { xs: 2, md: 3 }, pb: 1 } }>
        <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 } }>
          <Typography variant="h5" component="h2" sx={ { color: 'primary.main' } }>어떤 음료를 찾고 있나요?</Typography>
          <IconButton onClick={ close } aria-label="검색 닫기"><CloseIcon /></IconButton>
        </Box>
        <TextField
          autoFocus
          fullWidth
          value={ query }
          onChange={ (event) => setQuery(event.target.value) }
          placeholder="음료 이름, 나라, 재료로 검색해 보세요"
          slotProps={ {
            input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
            htmlInput: { 'aria-label': '음료 검색어' },
          } }
        />
      </Box>
      <Box sx={ { px: { xs: 2, md: 3 }, pb: 3, minHeight: 160 } }>
        { !query.trim() && (
          <Box sx={ { pt: 1 } }>
            <Typography variant="body2" sx={ { color: 'text.secondary', mb: 1.5 } }>이런 키워드는 어때요?</Typography>
            <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1 } }>
              { suggestions.map((word) => (
                <Chip key={ word } label={ word } onClick={ () => setQuery(word) } variant="outlined" color="primary" />
              )) }
            </Box>
          </Box>
        ) }
        { query.trim() && results.length === 0 && (
          <Typography sx={ { pt: 3, textAlign: 'center', color: 'text.secondary' } }>
            '{ query }'에 해당하는 음료가 아직 없어요. 다른 키워드로 찾아보세요.
          </Typography>
        ) }
        { results.length > 0 && (
          <>
            <List sx={ { mx: -1 } }>
              { results.slice(0, 6).map((drink) => {
                const country = getCountry(drink.countryId);
                return (
                  <ListItemButton key={ drink.id } onClick={ () => goTo(`/drinks/${ drink.id }`) } sx={ { borderRadius: 2, gap: 2 } }>
                    <Box sx={ { width: 48, height: 48, borderRadius: 2, bgcolor: drink.visual.bg, p: 0.5, flexShrink: 0 } }>
                      <DrinkArt visual={ drink.visual } hasShadow={ false } />
                    </Box>
                    <Box sx={ { minWidth: 0 } }>
                      <Box sx={ { fontWeight: 700, color: 'primary.main' } }>{ drink.name }</Box>
                      <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.8125rem', color: 'text.secondary' } }>
                        <CountryFlag countryId={ country.id } name={ country.name } size={ 11 } />
                        { country.name } · { drink.local }
                      </Box>
                    </Box>
                  </ListItemButton>
                );
              }) }
            </List>
            <Box component="button" type="button" onClick={ handleSubmit } sx={ { mt: 1, border: 0, background: 'none', color: 'secondary.main', fontWeight: 700, cursor: 'pointer', fontSize: '0.9375rem', p: 0, fontFamily: 'inherit' } }>
              검색 결과 { results.length }개 모두 보기 →
            </Box>
          </>
        ) }
      </Box>
    </Dialog>
  );
}

export default SearchDialog;
