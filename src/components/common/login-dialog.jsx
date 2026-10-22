import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './logo.jsx';

/**
 * LoginDialog 컴포넌트 — 로그인/회원가입 데모 UI
 * - 실제 인증 시스템이 연결되어 있지 않으며, 입력값은 저장·전송되지 않습니다.
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 * @param {function} onNotify - 알림 메시지 표시 함수 [Required]
 *
 * Example usage:
 * <LoginDialog isOpen={ isOpen } onClose={ handleClose } onNotify={ notify } />
 */
function LoginDialog({ isOpen, onClose, onNotify }) {
  const [tab, setTab] = useState('login');
  const isSignup = tab === 'signup';

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
    onNotify(isSignup ? '데모 화면입니다. 실제 회원가입은 진행되지 않았어요.' : '데모 화면입니다. 실제 로그인은 진행되지 않았어요.');
  };

  return (
    <Dialog open={ isOpen } onClose={ onClose } fullWidth maxWidth="xs">
      <Box component="form" onSubmit={ handleSubmit } sx={ { p: { xs: 3, md: 4 } } }>
        <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
          <Logo size={ 28 } />
          <IconButton onClick={ onClose } aria-label="닫기"><CloseIcon /></IconButton>
        </Box>
        <Typography variant="h4" component="h2" sx={ { color: 'primary.main', mt: 1 } }>
          { isSignup ? '여권을 만들어 볼까요?' : '다시 만나서 반가워요' }
        </Typography>
        <Tabs value={ tab } onChange={ (_, value) => setTab(value) } textColor="secondary" indicatorColor="secondary" sx={ { mt: 2, mb: 2 } }>
          <Tab value="login" label="로그인" />
          <Tab value="signup" label="회원가입" />
        </Tabs>
        <Alert severity="info" sx={ { mb: 2.5, borderRadius: 2 } }>
          데모 기능입니다. 실제 인증이 연결되어 있지 않으며 입력한 정보는 저장되거나 전송되지 않습니다.
        </Alert>
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
          { isSignup && <TextField label="닉네임" autoComplete="off" fullWidth /> }
          <TextField label="이메일" type="email" autoComplete="off" fullWidth />
          <TextField label="비밀번호" type="password" autoComplete="new-password" fullWidth />
          <Button type="submit" variant="contained" color="secondary" size="large" fullWidth>
            { isSignup ? '회원가입 (데모)' : '로그인 (데모)' }
          </Button>
        </Box>
        <Typography variant="body2" sx={ { mt: 2, color: 'text.secondary', textAlign: 'center' } }>
          로그인 없이도 음료 여권 기록은 이 브라우저에 저장돼요.
        </Typography>
      </Box>
    </Dialog>
  );
}

export default LoginDialog;
