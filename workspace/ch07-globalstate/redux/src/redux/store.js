import counterReducer from '@redux/counterReducer';
import { legacy_createStore as createStore } from 'redux'

// store 는 redux 가 제공해주는 store 를 사용
// Reducer 에서 전달받는 새로운 상태값을 store 에 저장
// 모든 상태 변경 관련 사항은 store 를 거친다
// 중간에 함수를 삽입하여 사용하는 경우가 많음 - 이를 미들웨어라고 부름
// 가장 첫번째 함수는 log 로 출력하는 경우가 많음
// 그 다음 API 서버를 거쳐 비동기 통신을 할 수도 있음
const store = createStore(counterReducer);

export default store;