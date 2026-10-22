import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { fonts } from '../theme.js';

/**
 * NotFoundPage 컴포넌트 — 존재하지 않는 페이지 / 음료 안내
 */
function NotFoundPage() {
  return (
    <Box sx={ { width: '100%', minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 2, md: 4 } } }>
      <Container maxWidth="sm" sx={ { py: 4, textAlign: 'center' } }>
        <Box sx={ { fontFamily: fonts.display, fontSize: { xs: '4.5rem', md: '6rem' }, color: 'secondary.main', lineHeight: 1 } }>404</Box>
        <Typography variant="h3" component="h1" sx={ { mt: 2, color: 'primary.main' } }>길을 잃은 여행자님, 반가워요</Typography>
        <Typography sx={ { mt: 1.5, color: 'text.secondary' } }>찾으시는 페이지나 음료가 아직 지도에 없어요.</Typography>
        <Box sx={ { mt: 4, display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' } }>
          <Button component={ RouterLink } to="/" variant="contained" color="secondary">홈으로</Button>
          <Button component={ RouterLink } to="/drinks" variant="outlined">국가별 음료 보기</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
