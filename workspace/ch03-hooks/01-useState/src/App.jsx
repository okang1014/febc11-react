import { useState } from "react";

// 상태 관리
function App() {
  // 상태 관리
  const [text, setText] = useState(""); // 초기값은 빈 문자열로 지정

  // text 상태값을 변경하는 함수
  // const handleText = (event) => {
  //   setText(event.target.value);
  // };

  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input
          type="text"
          value={text}
          // event 를 전달받아서 event.target.value 를 그대로 setText 가 가능
          onChange={(event) => setText(event.target.value)}
        />
        <br />
        <span>입력 메세지: {text}</span>
      </div>
    </>
  );
}

export default App;
