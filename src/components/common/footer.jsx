import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from './logo.jsx';
import { useAppUi } from '../../hooks/use-app-ui.js';
import { colors, fonts } from '../../theme.js';

const exploreLinks = [
  { label: '브랜드 소개', to: '/story' },
  { label: '세계 음료 탐험', to: '/', state: { scrollTo: 'world-map' } },
  { label: '국가별 음료', to: '/drinks' },
  { label: '이색 음료', to: '/unique' },
  { label: '음료 여권', to: '/passport' },
];

const contactLinks = ['Contact', 'Instagram', 'YouTube', '이메일 문의'];

const linkSx = {
  display: 'inline-block',
  color: 'rgba(247,243,233,0.78)',
  textDecoration: 'none',
  fontSize: '0.9375rem',
  py: 0.6,
  background: 'none',
  border: 0,
  p: 0,
  cursor: 'pointer',
  fontFamily: 'inherit',
  textAlign: 'left',
  transition: 'color .2s ease, transform .2s ease',
  '&:hover': { color: colors.mustard, transform: 'translateX(3px)' },
};

const footerTitleSx = { fontFamily: fonts.display, fontSize: '1.125rem', color: colors.mustard, mb: 2, letterSpacing: '0.04em' };

/**
 * Footer 컴포넌트 — 딥 네이비 하단 정보 영역
 * - 실제 운영 정보(사업자 정보, 연락처, SNS 계정)가 없으므로 임의로 만들지 않고 '준비 중'으로 안내합니다.
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  const { notify } = useAppUi();

  return (
    <Box component="footer" sx={ { bgcolor: colors.navy, color: colors.ivory, pt: { xs: 8, md: 10 }, pb: 4, mt: 'auto' } }>
      <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
        <Grid container spacing={ { xs: 5, md: 4 } }>
          <Grid size={ { xs: 12, md: 5 } }>
            <Logo variant="ivory" size={ 38 } />
            <Typography sx={ { fontFamily: fonts.display, fontStyle: 'italic', fontSize: '1.375rem', mt: 3, color: colors.ivory } }>
              A World of Flavors in Every Sip.
            </Typography>
            <Typography sx={ { mt: 1.5, color: 'rgba(247,243,233,0.7)', maxWidth: 380, wordBreak: 'keep-all' } }>
              SIP THE WORLD는 세계의 음료를 통해 낯선 문화를 발견하는 글로벌 음료 아카이브입니다.
            </Typography>
          </Grid>
          <Grid size={ { xs: 6, md: 3 } } sx={ { ml: { md: 'auto' } } }>
            <Typography component="h2" sx={ footerTitleSx }>Explore</Typography>
            <Box component="ul" sx={ { listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 } }>
              { exploreLinks.map((link) => (
                <Box component="li" key={ link.label }>
                  <Box component={ RouterLink } to={ link.to } state={ link.state } sx={ linkSx }>{ link.label }</Box>
                </Box>
              )) }
            </Box>
          </Grid>
          <Grid size={ { xs: 6, md: 3 } }>
            <Typography component="h2" sx={ footerTitleSx }>Connect</Typography>
            <Box component="ul" sx={ { listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 } }>
              { contactLinks.map((label) => (
                <Box component="li" key={ label }>
                  <Box component="button" type="button" onClick={ () => notify(`${ label } 채널은 준비 중입니다.`) } sx={ linkSx }>
                    { label }
                    <Box component="span" sx={ { ml: 1, fontSize: '0.6875rem', color: 'rgba(247,243,233,0.45)' } }>준비 중</Box>
                  </Box>
                </Box>
              )) }
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={ {
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: '1px solid rgba(247,243,233,0.14)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            fontSize: '0.8125rem',
            color: 'rgba(247,243,233,0.6)',
          } }
        >
          <Box>© 2026 SIP THE WORLD. All rights reserved.</Box>
          <Box sx={ { display: 'flex', gap: 3 } }>
            { ['개인정보처리방침', '이용약관'].map((label) => (
              <Box
                key={ label }
                component="button"
                type="button"
                onClick={ () => notify(`${ label }은(는) 정식 서비스 오픈 시 공개됩니다.`) }
                sx={ { ...linkSx, fontSize: '0.8125rem', color: 'rgba(247,243,233,0.7)' } }
              >
                { label }
              </Box>
            )) }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
