import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import DrinkCard from '../components/ui/drink-card.jsx';
import EmptyState from '../components/ui/empty-state.jsx';
import PageBanner from '../components/ui/page-banner.jsx';
import { filterDrinks, getContinentLabel, getDrink } from '../utils/drink-utils.js';
import { categories, continents } from '../utils/drinks-data.js';

const bannerDrinks = ['matcha', 'agua-jamaica', 'yerba-mate', 'ramune'].map(getDrink);

/**
 * DrinksPage 컴포넌트 — 국가별 음료 탐색 (대륙 필터, 종류 필터, 검색)
 * - 필터와 검색어는 URL 쿼리(?continent=&category=&q=)에 저장되어 뒤로가기·공유가 가능합니다.
 */
function DrinksPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const continent = params.get('continent') ?? 'all';
  const category = params.get('category') ?? '';
  const results = filterDrinks({ query, continent, category });
  const hasFilter = Boolean(query || category || continent !== 'all');

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: key === 'q' });
  };

  return (
    <Box sx={ { pb: { xs: 10, md: 14 } } }>
      <PageBanner
        eyebrow="EXPLORE BY COUNTRY"
        title="DRINKS AROUND THE WORLD"
        subtitle="국가별 음료 탐색"
        description="대륙과 음료 종류를 골라 세계 곳곳의 한 잔을 찾아보세요."
        drinks={ bannerDrinks }
      />

      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 }, mt: { xs: 5, md: 7 } } }>
        { /* 검색 + 필터 */ }
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2.5 } }>
          <TextField
            value={ query }
            onChange={ (event) => updateParam('q', event.target.value) }
            placeholder="음료 이름, 나라, 재료, 맛 키워드로 검색"
            fullWidth
            sx={ { maxWidth: { md: 560 }, '& .MuiOutlinedInput-root': { bgcolor: '#FFFFFF', borderRadius: 3 } } }
            slotProps={ {
              htmlInput: { 'aria-label': '음료 검색' },
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton onClick={ () => updateParam('q', '') } aria-label="검색어 지우기" size="small"><CloseIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ) : null,
              },
            } }
          />

          <Box role="tablist" aria-label="대륙 필터" sx={ { display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, mx: { xs: -2, md: 0 }, px: { xs: 2, md: 0 }, scrollbarWidth: 'none' } }>
            { continents.map((item) => (
              <Chip
                key={ item.id }
                role="tab"
                aria-selected={ continent === item.id }
                label={ item.label }
                onClick={ () => updateParam('continent', item.id) }
                color={ continent === item.id ? 'primary' : 'default' }
                variant={ continent === item.id ? 'filled' : 'outlined' }
                sx={ { flexShrink: 0, px: 0.5, height: 38, fontSize: '0.9375rem', bgcolor: continent === item.id ? undefined : '#FFFFFF' } }
              />
            )) }
          </Box>

          <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' } }>
            <Box component="span" sx={ { fontSize: '0.8125rem', fontWeight: 700, color: 'text.secondary', mr: 0.5 } }>음료 종류</Box>
            { categories.map((item) => {
              const isActive = category === item.id;
              return (
                <Chip
                  key={ item.id }
                  label={ item.label }
                  size="small"
                  onClick={ () => updateParam('category', isActive ? '' : item.id) }
                  aria-pressed={ isActive }
                  color={ isActive ? 'secondary' : 'default' }
                  variant={ isActive ? 'filled' : 'outlined' }
                  sx={ { height: 32, px: 0.5 } }
                />
              );
            }) }
          </Box>
        </Box>

        <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4, mb: 3, gap: 2 } }>
          <Typography sx={ { color: 'text.secondary' } } aria-live="polite">
            { continent !== 'all' && <Box component="strong" sx={ { color: 'primary.main' } }>{ `${ getContinentLabel(continent) } · ` }</Box> }
            { `${ results.length }개의 음료` }
          </Typography>
          { hasFilter && (
            <Button size="small" onClick={ () => setParams(new URLSearchParams()) } sx={ { color: 'secondary.main' } }>
              필터 초기화
            </Button>
          ) }
        </Box>

        { results.length > 0 ? (
          <Grid container spacing={ { xs: 3, md: 3.5 } }>
            { results.map((drink) => (
              <Grid key={ drink.id } size={ { xs: 12, sm: 6, md: 4, lg: 3 } }>
                <DrinkCard drink={ drink } isCompact />
              </Grid>
            )) }
          </Grid>
        ) : (
          <EmptyState
            title="조건에 맞는 음료가 아직 없어요"
            description="새로운 나라의 음료가 계속 추가될 예정이에요. 다른 대륙이나 키워드로 찾아보세요."
            action={ <Button variant="contained" color="secondary" onClick={ () => setParams(new URLSearchParams()) }>전체 음료 보기</Button> }
          />
        ) }
      </Container>
    </Box>
  );
}

export default DrinksPage;
