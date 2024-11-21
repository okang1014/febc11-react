// UI 요소를 렌더링하지 않기에 JSX 파일일 이유가 없음

import { useState } from "react";

// 상태 관련 함수는 useCounter 에서 관리
function useCounter(initCount) {
  const [count, setCount] = useState(initCount);
  const handleDown = (num) => {
    setCount(count - num);
  };

  const handleUp = (num) => {
    setCount(count + num);
  };

  const handleReset = (num) => {
    setCount(num);
  };

  // useCounter 커스텀 훅을 사용하는 컴포넌트에 객체로 전달
  return { count, down: handleDown, up: handleUp, reset: handleReset };
}

export default useCounter;