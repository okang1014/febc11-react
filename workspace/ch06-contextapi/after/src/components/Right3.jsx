import CounterContext from "@context/CounterContext";
import { useContext, useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 어떤 컨텍스트를 사용하는 것인지로 인해 결정, 가까운 컨텍스트, 먼 컨텍스트와 상관 없음
  // useContext 를 이용하여 CounterContext 의 value 를 전달 받음
  // CounterContext 를 구독 => CouterContext 의 상태 변경이 리렌더링을 유발하게 됨
  const {
    // CounterContext 내에서 선언된 value 를 구조 분해 할당
    actions: { countUp, reset, countDown },
  } = useContext(CounterContext);
  // CounterContext 를 구독하고 있다는 것만으로 해당 컨텍스트를 참조하고 있기에 리렌더링됨

  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          countDown(1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          reset(1);
        }}
      >
        0
      </button>
      <button
        onClick={() => {
          countUp(1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default Right3;
