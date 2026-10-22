import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CoffeeOutlinedIcon from '@mui/icons-material/CoffeeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CountryFlag from '../components/ui/country-flag.jsx';
import DrinkCard from '../components/ui/drink-card.jsx';
import DrinkVisual from '../components/ui/drink-visual.jsx';
import Reveal from '../components/ui/reveal.jsx';
import NotFoundPage from './not-found-page.jsx';
import { useAppUi } from '../hooks/use-app-ui.js';
import { passportActions, usePassport } from '../hooks/use-passport.js';
import { getCategoryLabel, getCountry, getDrink } from '../utils/drink-utils.js';
import { colors, fonts } from '../theme.js';

const tasteItems = [
  { key: 'sweet', label: '달콤함', en: 'SWEET', icon: CakeOutlinedIcon, color: '#F36B4A' },
  { key: 'sour', label: '산미', en: 'SOUR', icon: WbSunnyOutlinedIcon, color: '#E8B65A' },
  { key: 'bitter', label: '쓴맛', en: 'BITTER', icon: CoffeeOutlinedIcon, color: '#6A3D22' },
  { key: 'creamy', label: '크리미함', en: 'CREAMY', icon: OpacityOutlinedIcon, color: '#2A8068' },
];

const sectionTitleSx = { color: 'primary.main', fontSize: { xs: '1.375rem', md: '1.75rem' }, fontWeight: 700, wordBreak: 'keep-all' };
const bodySx = { fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.8, wordBreak: 'keep-all' };

/**
 * DrinkDetailPage 컴포넌트 — 음료 상세페이지
 * - 상세페이지를 열면 '발견한 음료'로 기록되며, 마신 기록은 사용자가 직접 버튼으로 표시합니다.
 */
function DrinkDetailPage() {
  const { drinkId } = useParams();
  const navigate = useNavigate();
  const { notify } = useAppUi();
  const passport = usePassport();
  const drink = getDrink(drinkId);

  useEffect(() => {
    if (drink) passportActions.markDiscovered(drink.id);
  }, [drink]);

  if (!drink) return <NotFoundPage />;

  const country = getCountry(drink.countryId);
  const isFavorite = passport.favorites.includes(drink.id);
  const isDrunk = Boolean(passport.drunk[drink.id]);
  const related = drink.related.map(getDrink).filter(Boolean);

  const goBack = () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate('/drinks');
  };

  const toggleFavorite = () => {
    const isSaved = passportActions.toggleFavorite(drink.id);
    notify(isSaved ? '관심 음료에 저장했어요. 음료 여권에서 확인할 수 있어요.' : '관심 음료에서 뺐어요.');
  };

  const toggleDrunk = () => {
    const isRecorded = passportActions.toggleDrunk(drink.id);
    notify(isRecorded ? `${ country.name } 스탬프가 여권에 찍혔어요!` : '마셔본 기록을 취소했어요.');
  };

  const sections = [
    { title: '이 음료는 무엇인가요?', content: <Typography sx={ bodySx }>{ drink.intro }</Typography> },
    {
      title: '어떤 맛이 날까요?',
      content: (
        <>
          <Grid container spacing={ 2 }>
            { tasteItems.map((item) => {
              const Icon = item.icon;
              return (
                <Grid key={ item.key } size={ { xs: 6, md: 3 } }>
                  <Box sx={ { height: '100%', p: 2.5, borderRadius: '18px', bgcolor: '#FFFFFF', border: '1px solid', borderColor: 'divider' } }>
                    <Box sx={ { width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: `${ item.color }1F`, color: item.color } }>
                      <Icon fontSize="small" />
                    </Box>
                    <Box sx={ { mt: 2, fontSize: '0.6875rem', letterSpacing: '0.14em', fontWeight: 700, color: 'text.secondary' } }>{ item.en }</Box>
                    <Box sx={ { fontWeight: 700, color: 'primary.main' } }>{ item.label }</Box>
                    <Box sx={ { mt: 0.75, fontSize: '0.9375rem', color: 'text.primary', wordBreak: 'keep-all' } }>{ drink.taste[item.key] }</Box>
                  </Box>
                </Grid>
              );
            }) }
          </Grid>
          <Box sx={ { mt: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' } }>
            { drink.keywords.map((keyword) => (
              <Chip key={ keyword } label={ `#${ keyword }` } sx={ { bgcolor: colors.navy, color: colors.ivory } } />
            )) }
          </Box>
        </>
      ),
    },
    {
      title: '주요 재료는 무엇인가요?',
      content: (
        <Box component="ul" sx={ { listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1.25 } }>
          { drink.ingredients.map((ingredient, index) => (
            <Box
              component="li"
              key={ ingredient }
              sx={ { display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderRadius: 999, bgcolor: '#FFFFFF', border: '1px solid', borderColor: 'divider', fontWeight: 600, color: 'primary.main' } }
            >
              <Box component="span" sx={ { fontFamily: fonts.display, color: 'secondary.main' } }>{ String(index + 1).padStart(2, '0') }</Box>
              { ingredient }
            </Box>
          )) }
        </Box>
      ),
    },
    { title: '어떻게 만들어질까요?', content: <Typography sx={ bodySx }>{ drink.method }</Typography> },
    {
      title: '탄생 배경과 현지 문화',
      content: (
        <Box sx={ { position: 'relative', pl: { xs: 2.5, md: 3.5 }, borderLeft: '3px solid', borderColor: 'warning.main' } }>
          <Typography sx={ { ...bodySx, fontFamily: fonts.serifKr, fontSize: { xs: '1.0625rem', md: '1.1875rem' } } }>{ drink.culture }</Typography>
        </Box>
      ),
    },
    {
      title: '어디에서 주로 즐길까요?',
      content: (
        <Box sx={ { display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 2.5, borderRadius: '18px', bgcolor: '#FFFFFF', border: '1px solid', borderColor: 'divider' } }>
          <PlaceOutlinedIcon sx={ { color: 'secondary.main', mt: 0.25 } } />
          <Typography sx={ bodySx }>{ drink.where }</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={ { pb: { xs: 10, md: 14 } } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 }, pt: { xs: 2, md: 4 } } }>
        <Button onClick={ goBack } startIcon={ <ArrowBackIcon /> } sx={ { px: 1, color: 'primary.main', '&:hover': { transform: 'translateX(-3px)' } } }>
          뒤로가기
        </Button>

        { /* 상단: 큰 음료 사진 + 기본 정보 */ }
        <Grid container spacing={ { xs: 4, md: 7 } } sx={ { mt: 1, alignItems: 'center' } }>
          <Grid size={ { xs: 12, md: 6 } }>
            <Box sx={ { borderRadius: { xs: '24px', md: '32px' }, overflow: 'hidden', animation: 'stw-pop .6s ease' } }>
              <DrinkVisual drink={ drink } ratio="1 / 1" artHeight={ 80 } hasLabel />
            </Box>
          </Grid>
          <Grid size={ { xs: 12, md: 6 } }>
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.25 } }>
              <CountryFlag countryId={ country.id } name={ country.name } size={ 22 } />
              <Box sx={ { fontWeight: 700, color: 'primary.main' } }>{ country.name }</Box>
              <Box sx={ { color: 'text.secondary', letterSpacing: '0.12em', fontSize: '0.8125rem' } }>{ country.en }</Box>
            </Box>
            <Typography variant="h1" component="h1" sx={ { mt: 2, color: 'primary.main', wordBreak: 'keep-all' } }>
              { drink.name }
            </Typography>
            <Typography sx={ { mt: 1, fontFamily: fonts.display, fontStyle: 'italic', fontSize: { xs: '1.25rem', md: '1.5rem' }, color: 'secondary.main' } }>
              { drink.local }
            </Typography>
            <Typography sx={ { mt: 3, fontSize: { xs: '1.0625rem', md: '1.25rem' }, wordBreak: 'keep-all' } }>
              { drink.tagline }
            </Typography>
            <Box sx={ { mt: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' } }>
              { drink.categories.map((id) => (
                <Chip
                  key={ id }
                  label={ getCategoryLabel(id) }
                  component={ RouterLink }
                  to={ `/drinks?category=${ id }` }
                  clickable
                  variant="outlined"
                  color="primary"
                />
              )) }
            </Box>
            <Box sx={ { mt: 4, display: 'flex', gap: 1.5, flexWrap: 'wrap' } }>
              <Button
                variant={ isFavorite ? 'contained' : 'outlined' }
                color="secondary"
                size="large"
                startIcon={ isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                onClick={ toggleFavorite }
                aria-pressed={ isFavorite }
                sx={ { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } } }
              >
                { isFavorite ? '관심 음료 저장됨' : '관심 음료 저장' }
              </Button>
              <Button
                variant={ isDrunk ? 'contained' : 'outlined' }
                color="success"
                size="large"
                startIcon={ isDrunk ? <CheckCircleIcon /> : <CheckCircleOutlineIcon /> }
                onClick={ toggleDrunk }
                aria-pressed={ isDrunk }
                sx={ { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } } }
              >
                { isDrunk ? '마셔봤어요 ✓' : '마셔봤어요' }
              </Button>
            </Box>
            <Typography variant="body2" sx={ { mt: 1.5, color: 'text.secondary' } }>
              실제로 마셔 본 음료만 직접 표시해 주세요. 표시하면 음료 여권에 국가 스탬프가 찍혀요.
            </Typography>
          </Grid>
        </Grid>

        { /* 하단 콘텐츠 */ }
        <Box sx={ { mt: { xs: 8, md: 12 } } }>
          { sections.map((section, index) => (
            <Reveal key={ section.title }>
              <Grid container spacing={ { xs: 2, md: 4 } } sx={ { py: { xs: 4, md: 5 }, borderTop: '1px solid', borderColor: 'divider' } }>
                <Grid size={ { xs: 12, md: 4 } }>
                  <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: 'secondary.main' } }>{ String(index + 1).padStart(2, '0') }</Box>
                  <Typography component="h2" sx={ sectionTitleSx }>{ section.title }</Typography>
                </Grid>
                <Grid size={ { xs: 12, md: 8 } }>{ section.content }</Grid>
              </Grid>
            </Reveal>
          )) }

          <Reveal>
            <Box sx={ { pt: { xs: 4, md: 5 }, borderTop: '1px solid', borderColor: 'divider' } }>
              <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: 'secondary.main' } }>07</Box>
              <Typography component="h2" sx={ { ...sectionTitleSx, mb: 4 } }>비슷한 취향의 다른 나라 음료 추천</Typography>
              <Grid container spacing={ 3 }>
                { related.map((item) => (
                  <Grid key={ item.id } size={ { xs: 12, sm: 6, md: 4 } }>
                    <DrinkCard drink={ item } />
                  </Grid>
                )) }
              </Grid>
            </Box>
          </Reveal>

          <Typography variant="body2" sx={ { mt: 6, color: 'text.secondary' } }>
            * 이미지는 음료의 특징을 표현한 일러스트입니다. 음료의 맛과 재료는 지역과 가게마다 다를 수 있어요.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default DrinkDetailPage;
