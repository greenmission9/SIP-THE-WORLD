import { useCallback, useMemo, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import LoginDialog from './login-dialog.jsx';
import SearchDialog from './search-dialog.jsx';
import TasteQuizDialog from './taste-quiz-dialog.jsx';
import { AppUiContext } from '../../hooks/use-app-ui.js';

/**
 * AppUiProvider 컴포넌트 — 검색·로그인·취향 테스트 다이얼로그와 알림 메시지를 전역으로 제공
 *
 * Props:
 * @param {node} children - 앱 콘텐츠 [Required]
 *
 * Example usage:
 * <AppUiProvider><App /></AppUiProvider>
 */
function AppUiProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const [message, setMessage] = useState({ text: '', key: 0 });

  const notify = useCallback((text) => setMessage({ text, key: Date.now() }), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const value = useMemo(() => ({
    openSearch: () => setDialog('search'),
    openLogin: () => setDialog('login'),
    openQuiz: () => setDialog('quiz'),
    notify,
  }), [notify]);

  return (
    <AppUiContext.Provider value={ value }>
      { children }
      <SearchDialog isOpen={ dialog === 'search' } onClose={ closeDialog } />
      <LoginDialog isOpen={ dialog === 'login' } onClose={ closeDialog } onNotify={ notify } />
      <TasteQuizDialog isOpen={ dialog === 'quiz' } onClose={ closeDialog } />
      <Snackbar
        key={ message.key }
        open={ Boolean(message.text) }
        autoHideDuration={ 2600 }
        onClose={ (_, reason) => reason !== 'clickaway' && setMessage({ text: '', key: message.key }) }
        message={ message.text }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        slotProps={ { content: { sx: { bgcolor: '#183247', color: '#F7F3E9', borderRadius: 3, fontWeight: 500 } } } }
      />
    </AppUiContext.Provider>
  );
}

export default AppUiProvider;
