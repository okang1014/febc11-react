import CounterContext from "@context/CounterContext";
import { useContext, useEffect } from "react";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // CounterContext 에서 useContext 라는 훅을 통해 count 값을 받아올 수 있음
  const {
    state: { count },
  } = useContext(CounterContext);
  // useContext 의 반환 값은 CounterProvider 에서 정의한 value 값을 반환함

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
