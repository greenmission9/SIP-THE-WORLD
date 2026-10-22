import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import CountryStamp from '../components/passport/country-stamp.jsx';
import PassportCard from '../components/passport/passport-card.jsx';
import PassportDrinkItem from '../components/passport/passport-drink-item.jsx';
import EmptyState from '../components/ui/empty-state.jsx';
import Reveal from '../components/ui/reveal.jsx';
import SectionHeading from '../components/ui/section-heading.jsx';
import { useAppUi } from '../hooks/use-app-ui.js';
import { passportActions, usePassport } from '../hooks/use-passport.js';
import { getDrink } from '../utils/drink-utils.js';
import { countries, drinks } from '../utils/drinks-data.js';

const tabs = [
  { id: 'favorites', label: '관심 음료' },
  { id: 'drunk', label: '마셔본 음료' },
  { id: 'wish', label: '마시고 싶은 음료' },
];

const emptyMessages = {
  favorites: { title: '아직 저장한 관심 음료가 없어요', description: '음료 카드의 하트를 눌러 관심 음료를 모아 보세요.' },
  drunk: { title: '아직 마셔본 음료 기록이 없어요', description: '실제로 마셔 본 음료의 상세페이지에서 \'마셔봤어요\'를 눌러 주세요.' },
  wish: { title: '마시고 싶은 음료가 비어 있어요', description: '관심 음료 중 아직 마셔보지 않은 음료가 이곳에 모여요.' },
};

/**
 * PassportPage 컴포넌트 — 나의 음료 여권 (통계, 국가 스탬프, 관심·마신·위시 목록)
 * - 프로토타입: 기록은 현재 브라우저(localStorage)에만 저장됩니다.
 */
function PassportPage() {
  const { notify } = useAppUi();
  const { favorites, drunk, discovered } = usePassport();
  const [tab, setTab] = useState('favorites');
  const [isResetOpen, setIsResetOpen] = useState(false);

  const drunkDrinks = Object.keys(drunk).map(getDrink).filter(Boolean)
    .sort((a, b) => drunk[b.id].localeCompare(drunk[a.id]));
  const favoriteDrinks = favorites.map(getDrink).filter(Boolean);
  const wishDrinks = favoriteDrinks.filter((drink) => !drunk[drink.id]);
  const lists = { favorites: favoriteDrinks, drunk: drunkDrinks, wish: wishDrinks };
  const activeList = lists[tab];

  const drunkCountByCountry = drunkDrinks.reduce((acc, drink) => ({ ...acc, [drink.countryId]: (acc[drink.countryId] ?? 0) + 1 }), {});
  const visitedCount = Object.keys(drunkCountByCountry).length;
  const discoveredCount = new Set([...discovered, ...favorites, ...Object.keys(drunk)]).size;

  const handleReset = () => {
    passportActions.reset();
    setIsResetOpen(false);
    notify('여권 기록을 모두 초기화했어요.');
  };

  return (
    <Box sx={ { pb: { xs: 10, md: 14 } } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 }, pt: { xs: 4, md: 7 } } }>
        <SectionHeading
          eyebrow="My Drink Passport"
          title="나의 음료 여권"
          description="발견하고, 저장하고, 직접 마셔 본 세계의 음료를 기록하세요. 마셔본 음료가 생길 때마다 그 나라의 스탬프가 찍혀요."
        />
        <Reveal>
          <PassportCard
            discoveredCount={ Math.min(discoveredCount, drinks.length) }
            drunkCount={ drunkDrinks.length }
            visitedCount={ visitedCount }
            totalCountries={ countries.length }
          />
        </Reveal>
        <Typography variant="body2" sx={ { mt: 2, color: 'text.secondary' } }>
          * 발견한 음료는 상세페이지를 열어 보거나 저장한 음료예요. 마셔본 기록은 직접 표시한 음료만 포함됩니다. 기록은 이 브라우저에만 저장돼요.
        </Typography>

        { /* 나라별 스탬프 */ }
        <Box sx={ { mt: { xs: 8, md: 12 } } }>
          <Reveal>
            <Typography variant="h3" component="h2" sx={ { color: 'primary.main' } }>나라별 음료 스탬프</Typography>
            <Typography sx={ { mt: 1, color: 'text.secondary' } }>{ `${ countries.length }개국 중 ${ visitedCount }개국의 스탬프를 모았어요.` }</Typography>
          </Reveal>
          <Box
            sx={ {
              mt: 4,
              p: { xs: 3, md: 5 },
              borderRadius: '24px',
              bgcolor: '#FFFDF7',
              border: '1px solid',
              borderColor: 'divider',
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' },
              rowGap: { xs: 3, md: 4 },
              columnGap: 2,
            } }
          >
            { countries.map((country, index) => (
              <CountryStamp
                key={ country.id }
                country={ country }
                index={ index }
                isStamped={ Boolean(drunkCountByCountry[country.id]) }
                drunkCount={ drunkCountByCountry[country.id] ?? 0 }
              />
            )) }
          </Box>
        </Box>

        { /* 관심·마신·위시 목록 */ }
        <Box sx={ { mt: { xs: 8, md: 12 } } }>
          <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid', borderColor: 'divider' } }>
            <Tabs
              value={ tab }
              onChange={ (_, value) => setTab(value) }
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              allowScrollButtonsMobile
              aria-label="여권 기록 목록"
            >
              { tabs.map((item) => (
                <Tab key={ item.id } value={ item.id } label={ `${ item.label } ${ lists[item.id].length }` } sx={ { fontWeight: 700, fontSize: '1rem' } } />
              )) }
            </Tabs>
          </Box>

          <Box key={ tab } sx={ { mt: 3, animation: 'stw-pop .35s ease' } }>
            { activeList.length > 0 ? (
              <Box sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 } }>
                { activeList.map((drink) => (
                  <PassportDrinkItem key={ drink.id } drink={ drink } drunkAt={ drunk[drink.id] } />
                )) }
              </Box>
            ) : (
              <EmptyState
                title={ emptyMessages[tab].title }
                description={ emptyMessages[tab].description }
                action={ <Button component={ RouterLink } to="/drinks" variant="contained" color="secondary">음료 탐험하러 가기</Button> }
              />
            ) }
          </Box>
        </Box>

        <Box sx={ { mt: 6, textAlign: 'right' } }>
          <Button size="small" onClick={ () => setIsResetOpen(true) } sx={ { color: 'text.secondary' } }>여권 기록 초기화</Button>
        </Box>
      </Container>

      <Dialog open={ isResetOpen } onClose={ () => setIsResetOpen(false) }>
        <DialogTitle sx={ { fontWeight: 700 } }>여권 기록을 초기화할까요?</DialogTitle>
        <DialogContent>
          <Typography sx={ { color: 'text.secondary' } }>관심 음료, 마셔본 기록, 스탬프가 모두 지워지며 되돌릴 수 없어요.</Typography>
        </DialogContent>
        <DialogActions sx={ { px: 3, pb: 2.5 } }>
          <Button onClick={ () => setIsResetOpen(false) }>취소</Button>
          <Button onClick={ handleReset } variant="contained" color="secondary">초기화</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PassportPage;
