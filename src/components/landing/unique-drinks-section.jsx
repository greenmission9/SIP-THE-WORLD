import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DrinkCard from '../ui/drink-card.jsx';
import Reveal from '../ui/reveal.jsx';
import SectionHeading from '../ui/section-heading.jsx';
import { getDrink } from '../../utils/drink-utils.js';
import { featuredDrinkIds } from '../../utils/drinks-data.js';

/**
 * UniqueDrinksSection 컴포넌트 — '이런 음료, 본 적 있나요?' 3열 카드 그리드
 *
 * Example usage:
 * <UniqueDrinksSection />
 */
function UniqueDrinksSection() {
  const featured = featuredDrinkIds.map(getDrink);

  return (
    <Box component="section" sx={ { py: { xs: 10, md: 15 }, bgcolor: '#FFFFFF' } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Reveal>
          <SectionHeading
            eyebrow="Curious Drinks"
            title="이런 음료, 본 적 있나요?"
            description="재료부터 제조법까지 상상을 뛰어넘는 세계의 이색 음료."
            action={ (
              <Button component={ RouterLink } to="/unique" variant="outlined" sx={ { flexShrink: 0, borderWidth: 1.5 } }>
                이색 음료 컬렉션 보기
              </Button>
            ) }
          />
        </Reveal>
        <Grid container spacing={ { xs: 3, md: 4 } }>
          { featured.map((drink, index) => (
            <Grid key={ drink.id } size={ { xs: 12, sm: 6, md: 4 } }>
              <Reveal delay={ (index % 3) * 120 } sx={ { height: '100%' } }>
                <DrinkCard drink={ drink } />
              </Reveal>
            </Grid>
          )) }
        </Grid>
      </Container>
    </Box>
  );
}

export default UniqueDrinksSection;
