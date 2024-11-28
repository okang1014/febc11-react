import { create } from 'zustand'

// react custom hook 처럼 사용
// create 에는 setter 와 getter 를 매개변수로 갖고, 객체를 반환하는 함수를 전달
const useCounterState = create((set, get) => (
  {
    // 기초 상태 값
    count: 6,

    // get 함수를 통해서 기초 상태값을 추출, step 만큼 더해서 newState 에 대입, set 함수를 통해서 새로운 상태값으로 변경
    countUp: (step) => {
      const newState = { count: get().count + step };
      set(newState);
    },
    countDown: (step) => {
      const newState = { count: get().count - step };
      set(newState);
    },
    countReset: () => {
      const newState = { count: get().count = 0 }
      set(newState);
    }
  }
));

export default useCounterState;