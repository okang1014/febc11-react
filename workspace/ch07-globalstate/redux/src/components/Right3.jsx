import { useEffect } from "react";
import { useDispatch } from "react-redux";
// 직접 redux 를 사용하는 경우
// import counterActionCreator from "@redux/counterActionCreator";
// counterSlice 로 부터 전달받은 action 객체
import { countDown, countReset, countUp } from "@redux-toolkit/counterSlice";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 상태값을 수정하기 위한 작업
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3</h3>
      {/* Redux 버전 */}
      {/* <button onClick={() => dispatch(counterActionCreator.countUp(1))}>
        +1
      </button> */}
      {/* counterActionCreator.countUp 을 사용하면 action 객체가 반환됨, 결국 아래의 코드처럼 내부적으로 작동 */}
      {/* <button onClick={() => dispatch({type: 'countUp', payload: {step:2}})}>+2</button> */}
      {/* <button onClick={() => dispatch(counterActionCreator.countReset(0))}>
        0
      </button>
      <button onClick={() => dispatch(counterActionCreator.countDown(1))}>
        -1
      </button> */}

      {/* Redux-toolkit 버전 */}
      <button onClick={() => dispatch(countUp(1))}>+1</button>
      <button onClick={() => dispatch(countReset(0))}>0</button>
      <button onClick={() => dispatch(countDown(1))}>-1</button>
    </div>
  );
}

export default Right3;
