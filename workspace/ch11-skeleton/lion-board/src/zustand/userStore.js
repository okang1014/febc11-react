import { create } from 'zustand';

// create 에 객체를 반환하는 함수를 전달
// 반환되는 객체는 상태값과 상태를 변경하는 함수를 포함
// set - 상태값을 변경하는 함수, get - 상태값을 사용하는 함수
const useUserStore = create((set) => ({
  // user 의 초기 상태는 null - 로그아웃 상태
  user: null,
  // user 상태 변경 코드, set 은 상태를 변경하는 함수
  setUser: (user) => set({ user }), // setUser 는 null 에서 새로운 User 로 변경하는 함수 - 로그인 상태로 변경
  resetUser: () => set({ user: null }), // resetUser 는 변경된 상태에서 초기 상태로 변경 - 로그아웃
}))

export default useUserStore;