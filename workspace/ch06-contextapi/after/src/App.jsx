import { useEffect, useState } from "react";
import Left1 from "@components/Left1";
import Right1 from "@components/Right1";
import { CounterProvider } from "@context/CounterContext";

function App() {
  // 🚨 CounterProvider 에서 상태 및 상태 관리 함수를 관리하고 있기 때문에 App 에서 정의할 필요 없음
  // const [count, setCount] = useState(0);

  // const countUp = function (step) {
  //   setCount(count + step);
  // };

  useEffect(() => {
    console.log("# App 렌더링.");
  });

  return (
    <>
      <h1>Context API - Props Drilling 대신 Context API 사용</h1>
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          {/* 필요한 최소한의 범위만 감싸는 것이 좋음 */}
          <CounterProvider>
            <Left1 />
            <Right1 />
          </CounterProvider>
        </div>
      </div>
    </>
  );
}

export default App;
