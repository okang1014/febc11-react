import useCounterState from "@zustand/conter";
import { useEffect } from "react";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // useCounterState 의 호출 결과로 반환되는 객체를 구조 분해 할당을 통해 사용
  const { count } = useCounterState();

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
