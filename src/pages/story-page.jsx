import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DrinkVisual from '../components/ui/drink-visual.jsx';
import Reveal from '../components/ui/reveal.jsx';
import { getCountry, getDrink } from '../utils/drink-utils.js';
import { colors, fonts } from '../theme.js';

const chapters = [
  {
    no: '01',
    en: 'Where it began',
    title: '브랜드 탄생 배경',
    body: '여행지에서 처음 마신 낯선 음료 한 잔이 그 나라를 가장 오래 기억하게 만들 때가 있습니다. 골목 카페의 달콤한 커피, 시장에서 건네받은 시원한 곡물 음료처럼요. SIP THE WORLD는 그 기억을 더 많은 사람과 나누고 싶다는 마음에서 시작했습니다.',
    drinkId: 'egg-coffee',
  },
  {
    no: '02',
    en: 'Why drinks',
    title: '왜 세계 음료인가?',
    body: '음료는 그 지역의 기후와 농작물, 사람들이 하루를 보내는 방식을 가장 가까이에서 보여 줍니다. 추운 초원의 짭짤한 밀크티, 더운 나라의 꽃차와 과일 음료처럼, 한 잔에는 그곳의 환경과 생활이 담겨 있습니다.',
    drinkId: 'suutei-tsai',
  },
  {
    no: '03',
    en: 'People & stories',
    title: '음료에 담긴 문화와 사람들의 이야기',
    body: '손님에게 차를 내는 환대, 높이 들어 따르는 숙련된 손길, 하나의 잔을 돌려 마시는 친밀함. 우리는 음료 자체만큼이나 그것을 만들고 나누는 사람들의 이야기에 귀 기울입니다.',
    drinkId: 'atay',
  },
];

const values = [
  { title: '정확하게', en: 'Honest', body: '확인된 사실은 간결하게, 확실하지 않은 이야기는 \'전해진다\'고 구분해 소개합니다.' },
  { title: '존중하며', en: 'Respectful', body: '각 나라의 음료 문화를 과장하거나 희화화하지 않고 있는 그대로 존중합니다.' },
  { title: '즐겁게', en: 'Joyful', body: '새로운 맛을 발견하는 설렘이 일상의 작은 여행이 되도록 만듭니다.' },
];

/**
 * StoryPage 컴포넌트 — 브랜드 스토리 (여행 다큐멘터리 + 프리미엄 매거진 레이아웃)
 */
function StoryPage() {
  return (
    <Box>
      { /* 메인 카피 */ }
      <Box component="section" sx={ { pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } } }>
        <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
          <Box sx={ { fontFamily: fonts.display, color: 'secondary.main', letterSpacing: '0.14em', fontSize: { xs: '0.9375rem', md: '1.0625rem' } } }>
            OUR STORY
          </Box>
          <Typography
            component="h1"
            sx={ {
              mt: 2,
              fontFamily: fonts.serifKr,
              fontWeight: 700,
              color: 'primary.main',
              fontSize: { xs: '2.25rem', sm: '3rem', md: '4.5rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              wordBreak: 'keep-all',
              maxWidth: 980,
            } }
          >
            우리는 음료를 통해
            <br />
            세상을 <Box component="span" sx={ { color: 'secondary.main' } }>발견합니다.</Box>
          </Typography>
          <Grid container spacing={ 4 } sx={ { mt: { xs: 4, md: 6 } } }>
            <Grid size={ { xs: 12, md: 5 } } sx={ { ml: { md: 'auto' } } }>
              <Typography sx={ { fontSize: { xs: '1.0625rem', md: '1.1875rem' }, color: 'text.secondary', wordBreak: 'keep-all', lineHeight: 1.8 } }>
                SIP THE WORLD는 세계의 음료를 통해 낯선 문화를 발견하는 글로벌 음료 아카이브입니다. 한 잔의 음료에 담긴 지역의 역사, 사람들의 일상, 흥미로운 이야기를 소개합니다.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      { /* 와이드 비주얼 띠 */ }
      <Box aria-hidden sx={ { display: 'grid', gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' } } }>
        { ['butterfly-pea', 'chicha-morada', 'matcha', 'ramune', 'salep', 'inca-kola'].map((id, index) => (
          <Box key={ id } sx={ { display: { xs: index > 2 ? 'none' : 'block', md: 'block' } } }>
            <DrinkVisual drink={ getDrink(id) } ratio="3 / 4" artHeight={ 66 } />
          </Box>
        )) }
      </Box>

      { /* 챕터 */ }
      <Box component="section" sx={ { py: { xs: 10, md: 15 } } }>
        <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
          { chapters.map((chapter, index) => {
            const drink = getDrink(chapter.drinkId);
            const country = getCountry(drink.countryId);
            const isReverse = index % 2 === 1;
            return (
              <Reveal key={ chapter.no }>
                <Grid
                  container
                  spacing={ { xs: 4, md: 8 } }
                  sx={ { alignItems: 'center', flexDirection: { md: isReverse ? 'row-reverse' : 'row' }, mb: { xs: 10, md: 14 } } }
                >
                  <Grid size={ { xs: 12, md: 6 } }>
                    <Box sx={ { position: 'relative', borderRadius: '28px', overflow: 'hidden' } }>
                      <DrinkVisual drink={ drink } ratio="4 / 3.4" artHeight={ 76 } />
                      <Box sx={ { position: 'absolute', left: 16, bottom: 16, px: 1.5, py: 0.75, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 2, fontSize: '0.8125rem', fontWeight: 600, color: 'primary.main' } }>
                        { `${ country.name } · ${ drink.name }` }
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={ { xs: 12, md: 6 } }>
                    <Box sx={ { display: 'flex', alignItems: 'baseline', gap: 2 } }>
                      <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '3rem', md: '4.5rem' }, color: colors.mustard, lineHeight: 1 } }>{ chapter.no }</Box>
                      <Box sx={ { fontFamily: fonts.display, fontStyle: 'italic', color: 'secondary.main', fontSize: { xs: '1.0625rem', md: '1.25rem' } } }>{ chapter.en }</Box>
                    </Box>
                    <Typography variant="h2" component="h2" sx={ { mt: 2, color: 'primary.main', wordBreak: 'keep-all' } }>{ chapter.title }</Typography>
                    <Typography sx={ { mt: 3, fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.85, wordBreak: 'keep-all' } }>{ chapter.body }</Typography>
                  </Grid>
                </Grid>
              </Reveal>
            );
          }) }
        </Container>
      </Box>

      { /* 추구하는 가치 */ }
      <Box component="section" sx={ { py: { xs: 10, md: 15 }, bgcolor: colors.navy, color: colors.ivory } }>
        <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
          <Box sx={ { fontFamily: fonts.display, color: colors.mustard, letterSpacing: '0.14em' } }>OUR VALUES</Box>
          <Typography variant="h2" component="h2" sx={ { mt: 1.5, color: colors.ivory } }>우리가 추구하는 가치</Typography>
          <Grid container spacing={ { xs: 3, md: 4 } } sx={ { mt: { xs: 4, md: 6 } } }>
            { values.map((value, index) => (
              <Grid key={ value.en } size={ { xs: 12, md: 4 } }>
                <Reveal delay={ index * 120 } sx={ { height: '100%' } }>
                  <Box sx={ { height: '100%', p: { xs: 3, md: 4 }, borderRadius: '20px', border: '1px solid rgba(247,243,233,0.18)', bgcolor: 'rgba(247,243,233,0.04)' } }>
                    <Box sx={ { fontFamily: fonts.display, fontStyle: 'italic', color: colors.mustard, fontSize: '1.25rem' } }>{ value.en }</Box>
                    <Typography variant="h3" component="h3" sx={ { mt: 1, color: colors.ivory } }>{ value.title }</Typography>
                    <Typography sx={ { mt: 2, color: 'rgba(247,243,233,0.75)', wordBreak: 'keep-all' } }>{ value.body }</Typography>
                  </Box>
                </Reveal>
              </Grid>
            )) }
          </Grid>
        </Container>
      </Box>

      { /* CTA */ }
      <Box component="section" sx={ { py: { xs: 10, md: 15 }, textAlign: 'center' } }>
        <Container maxWidth="md" sx={ { px: { xs: 2, md: 3 } } }>
          <Reveal>
            <Typography sx={ { fontFamily: fonts.display, fontStyle: 'italic', color: 'secondary.main', fontSize: { xs: '1.25rem', md: '1.5rem' } } }>
              A World of Flavors in Every Sip.
            </Typography>
            <Typography variant="h2" component="h2" sx={ { mt: 2, color: 'primary.main', wordBreak: 'keep-all' } }>
              세상에는 당신이 아직 마셔보지 못한 수천 가지 맛이 있습니다.
            </Typography>
            <Box sx={ { mt: 5, display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' } }>
              <Button component={ RouterLink } to="/" state={ { scrollTo: 'world-map' } } variant="contained" color="secondary" size="large" sx={ { px: 4, py: 1.6 } }>
                세계 음료 탐험 시작하기
              </Button>
              <Button component={ RouterLink } to="/passport" variant="outlined" size="large" sx={ { px: 4, py: 1.6, borderWidth: 1.5 } }>
                나의 음료 여권 보기
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
}

export default StoryPage;
