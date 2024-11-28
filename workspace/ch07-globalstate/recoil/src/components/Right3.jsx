import { counterState } from "@recoil/atoms";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // useRecoilState 는 counterState atom 의 상태값과 setter 함수 반환
  // getter 함수도 있기 때문에 atom 구독, 리렌더링 발생
  // const [count, setCount] = useRecoilState(counterState); // useState 와 매우 흡사

  // const countUp = (step) => {
  //   setCount(count + step);
  // };
  // const countDown = (step) => {
  //   setCount(count - step);
  // };
  // const countReset = () => {
  //   setCount(0);
  // };

  // setter 함수만
  const setCount = useSetRecoilState(counterState);
  const countUp = (step) => {
    setCount((count) => count + step);
  };

  const countDown = (step) => {
    setCount((count) => count - step);
  };

  const countReset = () => {
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
