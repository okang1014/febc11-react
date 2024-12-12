import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// 브라우저 새로고침 시 로그인 상태 정보를 포함한 메모리에 저장된 모든 정보는 초기화됨
// 새로고침하는 경우, 서버에 새로운 요청을 하게 되고, 완전 새로운 응답을 받게 됨
// 쿠키나 스토리지에 저장해야함
// zuztand 에서 persist 와 createJSONStorage 라는 상태값을 자동으로 저장하는 기능을 제공

// create 에 객체를 반환하는 함수를 전달
// 반환되는 객체는 상태값과 상태를 변경하는 함수를 포함
// set - 상태값을 변경하는 함수, get - 상태값을 사용하는 함수
const UserStore = (set) => ({
  // user 의 초기 상태는 null - 로그아웃 상태
  user: null,
  // user 상태 변경 코드, set 은 상태를 변경하는 함수
  setUser: (user) => set({ user }), // setUser 는 null 에서 새로운 User 로 변경하는 함수 - 로그인 상태로 변경
  resetUser: () => set({ user: null }), // resetUser 는 변경된 상태에서 초기 상태로 변경 - 로그아웃
});

// persist 사용하지 않은 버전
// const useUserStore = create(UserStore);

// persist - 영구적인 스토리지 사용
// persist 함수에 의해 해당 데이터(사용자 정보)를 스토리지에 저장
// persist 함수의 첫번째 인자로 함수, 두번째 인자로 함수 전달 - 함수 외부에 전달하는 경우, 별도 값 지정하지 않은 것으로 작동하여 localStorage 에 저장
const useUserStore = create(persist(UserStore, {
  // option 은 persist 함수 내에 인자로 추가
  name: 'user', // user 라는 이름으로 저장
  storage: createJSONStorage(() => sessionStorage),
  // 데이터를 어디에 저장할 것인지? default 는 localStorage
}));



export default useUserStore;