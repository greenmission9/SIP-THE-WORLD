import { createContext, useContext } from 'react';

/**
 * 전역 UI 컨텍스트 (검색, 로그인, 취향 테스트 다이얼로그, 알림 메시지)
 */
export const AppUiContext = createContext({
  openSearch: () => {},
  openLogin: () => {},
  openQuiz: () => {},
  notify: () => {},
});

/**
 * 전역 UI 액션을 사용하는 훅
 * @returns {{ openSearch: function, openLogin: function, openQuiz: function, notify: function }}
 */
export function useAppUi() {
  return useContext(AppUiContext);
}
