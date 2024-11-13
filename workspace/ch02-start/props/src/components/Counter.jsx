import React from "react";
import Button from "./Button";

function Counter() {
  let [count, setCount] = React.useState(0);

  const handleDown = () => {
    setCount(count - 1);
  };

  const handleUp = () => {
    setCount(count + 1);
  };

  const handleReset = (event) => {
    setCount(0);
  };

  return (
    // 하위 컴포넌트인 Button 컴포넌트에게 type, onClick props 를 전달
    // button type 을 별도로 지정해야 하는 경우에만 명시. 지정하지 않는 경우, 하위 컴포넌트에서 default 값 지정, 해당 속성이 적용
    <div id="counter">
      <Button color="red" onClick={handleDown}>
        -
      </Button>
      <Button onClick={(event) => handleReset(event)}>0</Button>
      <Button color="dodgerblue" onClick={handleUp}>
        +
      </Button>
      <span style={{ marginLeft: 10 }}>{count}</span>
    </div>
  );
}

export default Counter;
