import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DrinkCard from '../components/ui/drink-card.jsx';
import PageBanner from '../components/ui/page-banner.jsx';
import { getDrink } from '../utils/drink-utils.js';
import { drinks, uniqueThemes } from '../utils/drinks-data.js';
import { colors, fonts } from '../theme.js';

const bannerDrinks = ['butterfly-pea', 'egg-coffee', 'ramune', 'chicha-morada'].map(getDrink);

/**
 * UniquePage 컴포넌트 — 이색 음료 컬렉션 (주제별 카테고리에 따라 카드가 바뀜)
 */
function UniquePage() {
  const [params, setParams] = useSearchParams();
  const themeId = uniqueThemes.some((theme) => theme.id === params.get('theme')) ? params.get('theme') : uniqueThemes[0].id;
  const activeTheme = uniqueThemes.find((theme) => theme.id === themeId);
  const themedDrinks = drinks.filter((drink) => drink.themes.includes(themeId));

  return (
    <Box sx={ { pb: { xs: 10, md: 14 } } }>
      <PageBanner
        eyebrow="CURIOUS DRINKS COLLECTION"
        title="Stranger Than You Think"
        subtitle="이색 음료 컬렉션"
        description="색이 변하고, 소금을 넣고, 구슬로 병을 막는 음료들. 세계의 신기한 한 잔을 주제별로 모았습니다."
        drinks={ bannerDrinks }
        accent={ colors.coral }
      />

      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 }, mt: { xs: 5, md: 7 } } }>
        <Box
          role="tablist"
          aria-label="이색 음료 주제"
          sx={ {
            display: 'grid',
            gridAutoFlow: { xs: 'column', md: 'row' },
            gridAutoColumns: { xs: '72%', sm: '40%' },
            gridTemplateColumns: { md: 'repeat(5, 1fr)' },
            gap: 1.5,
            overflowX: { xs: 'auto', md: 'visible' },
            mx: { xs: -2, md: 0 },
            px: { xs: 2, md: 0 },
            pb: 1,
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          } }
        >
          { uniqueThemes.map((theme, index) => {
            const isActive = theme.id === themeId;
            const count = drinks.filter((drink) => drink.themes.includes(theme.id)).length;
            return (
              <ButtonBase
                key={ theme.id }
                role="tab"
                aria-selected={ isActive }
                onClick={ () => setParams({ theme: theme.id }, { replace: true }) }
                sx={ {
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  p: 2.25,
                  borderRadius: '18px',
                  bgcolor: isActive ? theme.accent : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'primary.main',
                  border: '1px solid',
                  borderColor: isActive ? theme.accent : 'divider',
                  transition: 'transform .2s ease, background-color .25s ease',
                  '&:hover': { transform: 'translateY(-3px)' },
                } }
              >
                <Box sx={ { fontFamily: fonts.display, fontSize: '0.875rem', opacity: 0.75 } }>{ String(index + 1).padStart(2, '0') }</Box>
                <Box sx={ { mt: 1, fontWeight: 700, fontSize: '0.9375rem', wordBreak: 'keep-all', lineHeight: 1.4 } }>{ theme.label }</Box>
                <Box sx={ { mt: 1, fontSize: '0.75rem', opacity: 0.75 } }>{ `${ count }개의 음료` }</Box>
              </ButtonBase>
            );
          }) }
        </Box>

        <Box key={ themeId } sx={ { animation: 'stw-pop .45s ease' } }>
          <Box sx={ { mt: { xs: 6, md: 8 }, mb: { xs: 4, md: 5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1.5, md: 6 }, alignItems: { md: 'flex-end' } } }>
            <Box sx={ { flex: '0 0 auto' } }>
              <Box sx={ { fontFamily: fonts.display, letterSpacing: '0.1em', color: activeTheme.accent === colors.navy ? 'secondary.main' : activeTheme.accent } }>
                { activeTheme.en }
              </Box>
              <Typography variant="h2" component="h2" sx={ { color: 'primary.main', mt: 0.5, wordBreak: 'keep-all' } }>
                { activeTheme.label }
              </Typography>
            </Box>
            <Typography sx={ { color: 'text.secondary', maxWidth: 460, wordBreak: 'keep-all' } }>{ activeTheme.description }</Typography>
          </Box>
          <Grid container spacing={ { xs: 3, md: 4 } }>
            { themedDrinks.map((drink) => (
              <Grid key={ drink.id } size={ { xs: 12, sm: 6, md: 4 } }>
                <DrinkCard drink={ drink } />
              </Grid>
            )) }
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default UniquePage;
