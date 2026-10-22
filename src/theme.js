import { createTheme } from '@mui/material/styles';

/**
 * SIP THE WORLD 디자인 토큰
 * - 브랜드 컬러, 폰트, 타이포그래피 스케일을 한곳에서 관리합니다.
 */
export const colors = {
  navy: '#183247',
  ivory: '#F7F3E9',
  coral: '#F36B4A',
  mustard: '#E8B65A',
  green: '#2A8068',
  charcoal: '#24313A',
  white: '#FFFFFF',
  sand: '#EDE5D3',
  line: 'rgba(24, 50, 71, 0.12)',
};

export const fonts = {
  display: '"DM Serif Display", "Noto Serif KR", Georgia, serif',
  sans: '"Pretendard Variable", Pretendard, -apple-system, "Segoe UI", "Malgun Gothic", sans-serif',
  serifKr: '"Noto Serif KR", "DM Serif Display", serif',
};

const theme = createTheme({
  palette: {
    primary: { main: colors.navy, contrastText: colors.ivory },
    secondary: { main: colors.coral, contrastText: colors.white },
    warning: { main: colors.mustard },
    success: { main: colors.green },
    background: { default: colors.ivory, paper: colors.white },
    text: { primary: colors.charcoal, secondary: 'rgba(36, 49, 58, 0.72)' },
    divider: colors.line,
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: fonts.sans,
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.35, letterSpacing: '-0.01em' },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontSize: '1rem', fontWeight: 600, textTransform: 'none' },
    overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 24px',
          transition: 'transform .2s ease, background-color .2s ease, box-shadow .2s ease, color .2s ease',
          '&:hover': { transform: 'translateY(-2px)' },
          '&:active': { transform: 'translateY(0) scale(0.97)' },
        },
        sizeSmall: { padding: '6px 14px', fontSize: '0.875rem' },
        containedSecondary: {
          '&:hover': { boxShadow: '0 10px 24px -10px rgba(243, 107, 74, 0.8)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 999 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 18 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 },
      },
    },
  },
});

theme.typography.h1 = { ...theme.typography.h1, [theme.breakpoints.up('md')]: { fontSize: '3.75rem' } };
theme.typography.h2 = { ...theme.typography.h2, [theme.breakpoints.up('md')]: { fontSize: '2.5rem' } };
theme.typography.h3 = { ...theme.typography.h3, [theme.breakpoints.up('md')]: { fontSize: '1.75rem' } };
theme.typography.h4 = { ...theme.typography.h4, [theme.breakpoints.up('md')]: { fontSize: '1.375rem' } };

export default theme;
