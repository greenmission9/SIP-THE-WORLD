import { useSyncExternalStore } from 'react';

/**
 * 나의 음료 여권 저장소
 * - 브라우저 localStorage에 저장되는 프로토타입용 기록입니다.
 * - favorites: 관심 음료 id 목록
 * - drunk: 사용자가 직접 '마셔봤어요'로 표시한 음료 { id: 기록일 }
 * - discovered: 상세페이지를 열어 본 음료 id 목록 (마신 것으로 처리하지 않음)
 */
const STORAGE_KEY = 'stw-passport-v1';
const emptyState = { favorites: [], drunk: {}, discovered: [] };
const listeners = new Set();

function readStorage() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return saved ? { ...emptyState, ...saved } : emptyState;
  } catch {
    return emptyState;
  }
}

let state = readStorage();

function setState(next) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /** 저장소를 사용할 수 없는 환경(시크릿 모드 등)에서는 메모리에만 유지합니다. */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export const passportActions = {
  toggleFavorite(id) {
    const favorites = state.favorites.includes(id)
      ? state.favorites.filter((item) => item !== id)
      : [...state.favorites, id];
    setState({ ...state, favorites });
    return favorites.includes(id);
  },
  toggleDrunk(id) {
    const drunk = { ...state.drunk };
    if (drunk[id]) {
      delete drunk[id];
    } else {
      drunk[id] = new Date().toISOString();
    }
    setState({ ...state, drunk });
    return Boolean(drunk[id]);
  },
  markDiscovered(id) {
    if (state.discovered.includes(id)) return;
    setState({ ...state, discovered: [...state.discovered, id] });
  },
  reset() {
    setState(emptyState);
  },
};

/**
 * 여권 상태를 구독하는 훅
 * @returns {{ favorites: string[], drunk: object, discovered: string[] }}
 */
export function usePassport() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
