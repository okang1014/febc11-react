import { useCallback, useEffect, useState } from "react";
import Left1 from "@components/Left1";
import Right1 from "@components/Right1";

// props drilling 을 통해 하위 컴포넌트에게 props(count 및 countUp 함수) 전달
function App() {
  // 최초 상태 => Left 3 에 전달
  const [count, setCount] = useState(0);

  // 이벤트 핸들러 => Right 3 에 전달
  const countUp = function (step) {
    setCount(count + step);
  };
  const reset = function (step) {
    setCount(0);
  };
  const countDown = function (step) {
    setCount(count - step);
  };

  // Dependencies 지정되지 않음, 따라서 마운트될 때와 리렌더링될 때도 호출
  useEffect(() => {
    console.log("# App 렌더링.");
  });

  return (
    <>
      <h1>Context API - Props Drilling</h1>
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          <Left1 count={count} />
          <Right1 countUp={countUp} reset={reset} countDown={countDown} />
        </div>
      </div>
    </>
  );
}

export default App;
