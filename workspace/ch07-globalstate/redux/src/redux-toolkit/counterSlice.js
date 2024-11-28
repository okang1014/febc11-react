import { createSlice } from "@reduxjs/toolkit";

// actionCreator 와 reducer 를 간단하게 작성 가능
// createSlice() 가 반환하는 값은 {reducer, actions, ...} 객체를 반환
// reducer - 리듀서 함수(reducers 에 정의한 함수), redux store 에 전달해야 함(Redux 의 reducer 가 포함)
// actions - 각 리듀서에 해당하는 action 생성자 객체(Redux 의 actionCreator 가 포함)
const counterSlice = createSlice({
  name: 'myCounter', // 슬라이스 식별자(actionCreator 타입에 접두사로 사용됨)
  initialState: { count: 10 }, // 상태 초기값(reducer 의 initialState 값)
  reducers: {
    countUp: (state, action) => {
      // Redux 에서는 불변성을 지키기 위해서는 새로운 객체를 생성해야하지만, redux toolkit 에서는 내부적으로 immer 라이브러리 사용
      state.count += action.payload;
    },
    countDown: (state, action) => {
      state.count -= action.payload;
    },
    countReset: (state) => {
      state.count = 0;
    },
  }
});

// action 생성자
// countUp(2) => {type: 'myCounter_countUp', payload: 2} 
export const { countUp, countDown, countReset } = counterSlice.actions;

export default counterSlice;