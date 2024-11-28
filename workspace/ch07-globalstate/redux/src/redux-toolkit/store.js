
import counterSlice from '@redux-toolkit/counterSlice';
import { configureStore } from '@reduxjs/toolkit';

// configureStore 함수에 counterSlice 객체의 reducer 속성 추가
const store = configureStore({
  reducer: {
    counterStore: counterSlice.reducer
  }
});

export default store;