import { COUNTER_ACTION } from "@redux/counterActionCreator";

// 초기 상태, count 라는 속성을 가진 객체
const initialState = { count: 5 };

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 상태가 복합 객체인 경우, 불변성이 유지되지 않음 - immer 라이브러리 사용을 통해 불변성 유지
// state: 이전 상태(store 가 내부적으로 관리, 이전의 리턴값이 다음의 state 로 전달)
// action: 동작을 정의한 객체(type 속성에 동작을, payload 속성에 값을 지정) -> {type: 'countUp', payload: {step: 2}} 이런 객체 전달
// 리턴값: 새로운 상태

// 초기값은 undefined 이기 때문에 defaultValue 지정하여 0 부터 시작하도록
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_ACTION.UP:
      // action 객체의 payload 의 step 값을 기존 state 내의 count 에 더한다
      // state.count += action.payload.step; // 불변성을 지키지 않는 코드
      // return state;

      // ...state 는 state 내의 다른 속성이 있을 것을 대비하여 state 와 동일한 값을 갖는 새로운 객체 생성
      // 새로운 상태 객체를 만들어서 반환
      return { ...state, count: state.count + action.payload.step };

    case COUNTER_ACTION.RESET:
      return { ...state, count: 0 };

    case COUNTER_ACTION.DOWN:
      return { ...state, count: state.count - action.payload.step };

    default:
      return state;
  };
}

export default counterReducer;