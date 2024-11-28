import counterActionCreator from "@redux/counterActionCreator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 상태값을 수정하기 위한 작업
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => dispatch(counterActionCreator.countUp(1))}>
        +1
      </button>
      {/* counterActionCreator.countUp 을 사용하면 action 객체가 반환됨, 결국 아래의 코드처럼 내부적으로 작동 */}
      {/* <button onClick={() => dispatch({type: 'countUp', payload: {step:2}})}>+2</button> */}
      <button onClick={() => dispatch(counterActionCreator.countReset(0))}>
        0
      </button>
      <button onClick={() => dispatch(counterActionCreator.countDown(1))}>
        -1
      </button>
    </div>
  );
}

export default Right3;
