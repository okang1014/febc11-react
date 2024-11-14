import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h2>02 이벤트 핸들러에서 state 값을 여러번 변경했을 때 문제점</h2>
      <p>{number}</p>
      {/* html 코드와 js 코드는 분리하는 것을 권장 */}
      <button
        onClick={() => {
          // number 는 const 키워드로 선언되어 있기 때문에 물리적으로, 직접적으로 상수 값을 변경할 수 없음
          // 따라서 click event 함수가 실행되는 동안에는 number 은 변경되지 않음
          // 렌더링이 끝난 이후에야 number 의 값이 변경됨
          console.log("click start", number);

          // 2를 증가시키고자 setNumber 를 두 번 호출, 그런데... 되지 않는다.
          // setNumber 가 즉각적으로 값이 변경되는 것이 아님 - 즉 렌더링을 할 때 number 가 변경됨
          setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1

          // setter 함수가 호출되는 즉시 리렌더링되는 것이 아니라, 모아 두었다가 한 번에 반영됨(Batch)
          // -> 동일한 함수를 여러번 호출하는 경우에는 마지막의 setter 함수만 실행되는 것

          // setNumber 의 인자에 함수를 전달하게 된다면 콜백함수의 리턴값을 저장해두었다가 다음에 호출되는 콜백함수의 인자값으로 전달
          // 이 경우, setter 함수가 호출될 때 모두 실행 (왜냐면 num 의 값은 함수로 인해 변경되었기 때문에)
          // setNumber((num) => num + 1); // 0 + 1
          // setNumber((num) => num + 1); // 1 + 1
          // setNumber((num) => num + 1); // 2 + 1

          console.log("click end", number);
        }}
      >
        +2
      </button>
    </>
  );
}

export default App;
