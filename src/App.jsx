import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AppUiProvider from './components/common/app-ui-provider.jsx';
import Footer from './components/common/footer.jsx';
import Header from './components/common/header.jsx';
import { HEADER_HEIGHT } from './components/common/nav-items.js';
import ScrollManager from './components/common/scroll-manager.jsx';
import HomePage from './pages/home-page.jsx';

/** 서브페이지는 필요할 때 불러와 첫 화면 로딩을 가볍게 합니다. */
const DrinksPage = lazy(() => import('./pages/drinks-page.jsx'));
const DrinkDetailPage = lazy(() => import('./pages/drink-detail-page.jsx'));
const UniquePage = lazy(() => import('./pages/unique-page.jsx'));
const PassportPage = lazy(() => import('./pages/passport-page.jsx'));
const StoryPage = lazy(() => import('./pages/story-page.jsx'));
const NotFoundPage = lazy(() => import('./pages/not-found-page.jsx'));

const pageFallback = (
  <Box sx={ { minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
    <CircularProgress color="secondary" aria-label="페이지 불러오는 중" />
  </Box>
);

/**
 * App 컴포넌트 — 전체 레이아웃(헤더, 본문, 푸터)과 페이지 라우팅
 */
function App() {
  return (
    <AppUiProvider>
      <ScrollManager />
      <Box sx={ { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' } }>
        <Header />
        <Box component="main" sx={ { flexGrow: 1, pt: { xs: `${ HEADER_HEIGHT.xs }px`, md: `${ HEADER_HEIGHT.md }px` } } }>
          <Suspense fallback={ pageFallback }>
            <Routes>
              <Route path="/" element={ <HomePage /> } />
              <Route path="/drinks" element={ <DrinksPage /> } />
              <Route path="/drinks/:drinkId" element={ <DrinkDetailPage /> } />
              <Route path="/unique" element={ <UniquePage /> } />
              <Route path="/passport" element={ <PassportPage /> } />
              <Route path="/story" element={ <StoryPage /> } />
              <Route path="*" element={ <NotFoundPage /> } />
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </AppUiProvider>
  );
}

export default App;
