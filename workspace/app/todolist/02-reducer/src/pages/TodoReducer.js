import { produce } from 'immer';

// state 와 action 객체를 전달받고 새로운 state 를 반환하는 순수 함수로 만들어야 함

function TodoReducer(state, action) {
  // 여기서 전달받는 state 는 TodoReducer 를 사용하는 곳에서 전달하는 state 가 되겠네요
  // state 에는 itemList 배열이 전달, type 은 아래에 지정, value 는 배열 내의 item 중 하나

  const targetIndex = state.findIndex(item => item._id === action.value._id);
  // itemList 의 _id 와 선택된 value 의 _id 가 일치하는 항목 조회
  // action.value 가 

  let newState;
  // 기존 state 를 복제한 새로운 State 생성
  // 새로운 배열로 복제하였지만 깊은 복사는 안된 상태, 따라서 상태 불변성을 지키지 못해 => immer 라이브러리 사용

  switch (action.type) {
    case 'ADD':
      // state 에는 itemList 가 대입되는건가❓
      newState = produce(state, draft => {
        draft.push(action.value);
        // 객체(또는 배열)일 경우 새로운 객체(주소가 변경된)로 만들어야 화면이 갱신된다
      })
      break;
    case 'TOGGLE':
      // 아래처럼 하는 경우 상태의 불변성을 지킬 수 없음 - 배열 내부의 속성을 수정한다고 해도, 기존 상태값까지 변경되기 때문
      // newState[targetIndex].done = !newState[targetIndex].done;
      // 따라서 immer 라이브러리 사용
      newState = produce(state, draft => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;
    case 'DELETE':
      newState = produce(state, draft => {
        draft.splice(targetIndex, 1);
        // 새로운 state 에서 targetIndex 기준 1개의 항목 삭제
      })
      break;
    default:
      newState = state;
  }
  return newState;
}

export default TodoReducer;