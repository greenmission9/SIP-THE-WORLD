import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CountryFlag from '../ui/country-flag.jsx';
import DrinkCard from '../ui/drink-card.jsx';
import Reveal from '../ui/reveal.jsx';
import SectionHeading from '../ui/section-heading.jsx';
import WorldMap from './world-map.jsx';
import { getCountry, getDrinksByCountry } from '../../utils/drink-utils.js';
import { continents, countries } from '../../utils/drinks-data.js';
import { fonts } from '../../theme.js';

/**
 * WorldMapSection 컴포넌트 — 세계 음료 지도 + 대륙/국가 선택 메뉴 + 선택 국가 음료 카드
 *
 * Example usage:
 * <WorldMapSection />
 */
function WorldMapSection() {
  const [selectedId, setSelectedId] = useState('vn');
  const [continent, setContinent] = useState('all');
  const selectedCountry = getCountry(selectedId);
  const selectedDrinks = getDrinksByCountry(selectedId);
  const visibleCountries = countries.filter((country) => continent === 'all' || country.continent === continent);

  const selectCountry = (countryId) => {
    setSelectedId(countryId);
    const target = getCountry(countryId);
    if (continent !== 'all' && target.continent !== continent) setContinent(target.continent);
  };

  return (
    <Box component="section" id="world-map" sx={ { py: { xs: 10, md: 15 }, scrollMarginTop: { xs: 64, md: 76 } } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Reveal>
          <SectionHeading
            eyebrow="World Drink Map"
            title="지도를 펼치면, 새로운 맛이 시작됩니다."
            description="가고 싶은 나라를 선택하고 그곳의 특별한 음료를 발견하세요."
            align="center"
          />
        </Reveal>

        <Reveal delay={ 100 }>
          <WorldMap selectedId={ selectedId } onSelect={ selectCountry } />
        </Reveal>

        { /* 대륙·국가 선택 메뉴 (모바일에서 주요 탐색 수단) */ }
        <Box sx={ { mt: 3 } }>
          <Box
            role="tablist"
            aria-label="대륙 선택"
            sx={ { display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mx: { xs: -2, md: 0 }, px: { xs: 2, md: 0 }, justifyContent: { md: 'center' }, scrollbarWidth: 'none' } }
          >
            { continents.map((item) => (
              <Chip
                key={ item.id }
                role="tab"
                aria-selected={ continent === item.id }
                label={ item.label }
                onClick={ () => setContinent(item.id) }
                color={ continent === item.id ? 'primary' : 'default' }
                variant={ continent === item.id ? 'filled' : 'outlined' }
                sx={ { flexShrink: 0 } }
              />
            )) }
          </Box>
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5, justifyContent: { md: 'center' } } }>
            { visibleCountries.map((country) => (
              <Chip
                key={ country.id }
                icon={ <Box sx={ { display: 'flex', pl: 0.75 } }><CountryFlag countryId={ country.id } name={ country.name } size={ 12 } /></Box> }
                label={ country.name }
                onClick={ () => selectCountry(country.id) }
                aria-pressed={ country.id === selectedId }
                color={ country.id === selectedId ? 'secondary' : 'default' }
                variant={ country.id === selectedId ? 'filled' : 'outlined' }
                sx={ { bgcolor: country.id === selectedId ? undefined : '#FFFFFF' } }
              />
            )) }
          </Box>
        </Box>

        { /* 선택한 국가의 음료 */ }
        <Box key={ selectedId } sx={ { mt: { xs: 6, md: 8 }, animation: 'stw-pop .45s ease' } }>
          <Box sx={ { display: 'flex', alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'space-between', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } } }>
            <Box>
              <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, color: 'secondary.main', fontFamily: fonts.display, letterSpacing: '0.12em' } }>
                <CountryFlag countryId={ selectedCountry.id } name={ selectedCountry.name } size={ 16 } />
                { selectedCountry.en }
              </Box>
              <Typography variant="h3" component="h3" sx={ { color: 'primary.main', mt: 0.5 } }>
                { `${ selectedCountry.name }에서 마시는 한 잔` }
              </Typography>
            </Box>
            <Button component={ RouterLink } to={ `/drinks?continent=${ selectedCountry.continent }` } sx={ { px: 0, color: 'secondary.main' } }>
              같은 대륙 음료 더 보기 →
            </Button>
          </Box>
          <Grid container spacing={ 3 }>
            { selectedDrinks.map((drink) => (
              <Grid key={ drink.id } size={ { xs: 12, sm: 6, md: 4 } }>
                <DrinkCard drink={ drink } ctaLabel="상세보기" />
              </Grid>
            )) }
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default WorldMapSection;
