import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Logo from './logo.jsx';
import { HEADER_HEIGHT, navItems } from './nav-items.js';
import { useAppUi } from '../../hooks/use-app-ui.js';
import { colors } from '../../theme.js';

function isNavActive(item, location) {
  if (item.scrollTo) return false;
  return location.pathname === item.to || location.pathname.startsWith(`${ item.to }/`);
}

/**
 * Header 컴포넌트 — 고정 상단 내비게이션 (스크롤 시 흰 배경 + 그림자, 모바일 햄버거 메뉴)
 *
 * Example usage:
 * <Header />
 */
function Header() {
  const location = useLocation();
  const { openSearch, openLogin } = useAppUi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 12 });

  const closeMenu = () => setIsMenuOpen(false);

  const linkProps = (item) => ({
    component: RouterLink,
    to: item.to,
    state: item.scrollTo ? { scrollTo: item.scrollTo } : undefined,
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={ 0 }
        sx={ {
          bgcolor: isScrolled ? colors.white : colors.ivory,
          color: 'primary.main',
          boxShadow: isScrolled ? '0 1px 0 rgba(24,50,71,0.08), 0 8px 24px -16px rgba(24,50,71,0.35)' : 'none',
          transition: 'background-color .3s ease, box-shadow .3s ease',
        } }
      >
        <Container maxWidth="lg" sx={ { px: { xs: 2, md: 3 } } }>
          <Toolbar disableGutters sx={ { minHeight: HEADER_HEIGHT, gap: 2 } }>
            <Box component={ RouterLink } to="/" aria-label="SIP THE WORLD 홈" sx={ { display: 'flex', textDecoration: 'none', mr: 'auto' } }>
              <Logo size={ 34 } />
            </Box>

            <Box component="nav" aria-label="주요 메뉴" sx={ { display: { xs: 'none', lg: 'flex' }, gap: 0.5 } }>
              { navItems.map((item) => {
                const isActive = isNavActive(item, location);
                return (
                  <Button
                    key={ item.label }
                    { ...linkProps(item) }
                    aria-current={ isActive ? 'page' : undefined }
                    sx={ {
                      position: 'relative',
                      px: 1.5,
                      py: 1,
                      fontSize: '0.9375rem',
                      color: isActive ? 'secondary.main' : 'primary.main',
                      '&:hover': { bgcolor: 'transparent', color: 'secondary.main', transform: 'none' },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 2,
                        borderRadius: 1,
                        bgcolor: 'secondary.main',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform .25s ease',
                      },
                      '&:hover::after': { transform: 'scaleX(1)' },
                    } }
                  >
                    { item.label }
                  </Button>
                );
              }) }
            </Box>

            <Box sx={ { display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, ml: { lg: 2 } } }>
              <Tooltip title="음료 검색">
                <IconButton onClick={ openSearch } aria-label="음료 검색" sx={ { color: 'primary.main' } }>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Button onClick={ openLogin } sx={ { display: { xs: 'none', md: 'inline-flex' }, px: 1.5, color: 'primary.main', '&:hover': { transform: 'none' } } }>
                로그인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={ RouterLink }
                to="/drinks"
                sx={ { display: { xs: 'none', sm: 'inline-flex' }, px: 2.5, py: 1.1, fontSize: '0.9375rem', whiteSpace: 'nowrap' } }
              >
                음료 탐험 시작하기
              </Button>
              <IconButton
                onClick={ () => setIsMenuOpen(true) }
                aria-label="메뉴 열기"
                aria-expanded={ isMenuOpen }
                sx={ { display: { xs: 'inline-flex', lg: 'none' }, color: 'primary.main' } }
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={ isMenuOpen }
        onClose={ closeMenu }
        slotProps={ { paper: { sx: { width: { xs: '86vw', sm: 380 }, bgcolor: colors.ivory, p: 3, display: 'flex', flexDirection: 'column' } } } }
      >
        <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 } }>
          <Logo size={ 30 } />
          <IconButton onClick={ closeMenu } aria-label="메뉴 닫기" sx={ { color: 'primary.main' } }>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="모바일 메뉴" sx={ { display: 'flex', flexDirection: 'column' } }>
          { navItems.map((item, index) => (
            <Button
              key={ item.label }
              { ...linkProps(item) }
              onClick={ closeMenu }
              sx={ {
                justifyContent: 'space-between',
                px: 0,
                py: 2,
                borderRadius: 0,
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: isNavActive(item, location) ? 'secondary.main' : 'primary.main',
                fontSize: '1.25rem',
                fontWeight: 700,
                '&:hover': { bgcolor: 'transparent', transform: 'translateX(4px)' },
              } }
            >
              { item.label }
              <Box component="span" sx={ { fontSize: '0.75rem', opacity: 0.4, fontWeight: 600 } }>{ `0${ index + 1 }` }</Box>
            </Button>
          )) }
        </Box>
        <Divider sx={ { my: 3, borderColor: 'transparent' } } />
        <Box sx={ { mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 } }>
          <Button variant="contained" color="secondary" component={ RouterLink } to="/drinks" onClick={ closeMenu } fullWidth>
            음료 탐험 시작하기
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={ () => {
              closeMenu();
              openLogin();
            } }
          >
            로그인
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
