import useCounterState from "@zustand/conter";
import { useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // useCounterstate 가 하나의 객체를 반환하기 때문에 count 를 사용하지 않더라도 구독하고 있기 때문에 리렌더링 발생
  // const countUp = useCounterState();

  // 렌더링 최적화를 위해 필요한 부분만 지정, state 객체를 전달하고, state 내부의 countUp 만 반환하도록 지정
  const countUp = useCounterState((state) => state.countUp);
  const countDown = useCounterState((state) => state.countDown);
  const countReset = useCounterState((state) => state.countReset);

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
      <button onClick={() => countReset()}>0</button>
      <button onClick={() => countDown(1)}>-1</button>
    </div>
  );
}

export default Right3;
