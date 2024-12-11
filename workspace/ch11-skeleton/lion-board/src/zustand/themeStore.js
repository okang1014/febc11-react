import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const ThemeStore = (set) => ({
  // 무조건 라이트 모드로 시작
  // isDarkMode: false,
  // 사용자 OS 설정값과 일치하는지 여부 판단 후 true, false 결정
  // prefers-color-scheme(사용자 OS 설정) 이 다크인지 비교 후 상태값 지정
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark').matches ? true : false,
  // set 함수로 state 를 받아서 해당 객체를 수정할 것이다
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
});

// 테마 정보는 로컬 스토리지에 저장
// 테마를 적용하면 모든 컴포넌트가 적용되어야 하기 때문에 전역 상태로 관리
// 로그인은 보안 관련 문제가 있을 수 있기 때문에
const useThemeStore = create(persist(ThemeStore, {
  name: 'themeStore',
  // 스토리지에 설정을 전달하지 않으면 기본으로 localStorage 에 저장
}));



export default useThemeStore;