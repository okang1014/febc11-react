import { counterAtom } from "@jotai/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 리액트의 상태관리 훅 useState 와 유사함
  // 하지만 jotai 는 전역 상태 관리 라이브러리이기 때문에, 하나의 컴포넌트 외에 다른 컴포넌트에서 해당 상태를 사용할 수 있음
  // getter && setter, 자동으로 상태 값을 구독
  // const [count, setCount] = useAtom(counterAtom);
  // const countUp = function (step) {
  //   setCount(count + step);
  // };

  // setter 함수만 사용(상태 구독 X)
  const setCount = useSetAtom(counterAtom);

  const countUp = function (step) {
    // 이전의 count 값을 받아와서 상태값에 step 을 더해주는 방식
    setCount((count) => count + step);
    // setCount(count + step);
  };

  const countDown = function (step) {
    setCount((count) => count + step);
    // setCount(count - step);
  };

  const countReset = function (step) {
    setCount(0);
  };

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
