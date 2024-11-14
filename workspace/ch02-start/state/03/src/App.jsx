import { useState } from "react";

function App() {
  // 마우스 커서의 위치에 따라 div 위치가 변경
  // useState 의 초기값은 마우스의 좌표이기 때문에 x, y 를 매개변수로 전달
  const [position, setPosition] = useState({ x: 100, y: 100 });

  return (
    <>
      <h1>03 상태관리 대상이 객체일 경우 주의 사항</h1>
      <div
        onPointerMove={(event) => {
          // clientX, Y 는 마우스의 위치를 의미
          // event 는 event 가 발생하는 객체
          position.x = event.clientX;
          position.y = event.clientY;
          // 리액트가 화면을 리렌더링하는 기준은 상태 변경
          // 기존의 상태값과 새로운 상태값을 비교한 이후 변경된 부분만 리렌더링

          // 리액트는 얕은 비교를 함 -> position 은 객체임으로 참조 주소는 동일
          // 따라서 속성을 수정하더라도 리렌더링하지 않음
          // setPosition(position);

          // 그래서 새로운 객체를 생성하여 객체 주소를 변경해주어야 상태 변경을 인식하고, 리렌더링됨
          const newPosition = { x: event.clientX, y: event.clientY - 80 };
          setPosition(newPosition);

          console.log(position);
        }}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: "50%",
            transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      </div>
    </>
  );
}

export default App;
