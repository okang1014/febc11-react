import { useEffect, useReducer, useRef, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = "0" }) {
  console.log("Component Rerender");
  const initCount = Number(children);

  const [count, countDispatch] = useReducer(counterReducer, initCount);

  // step 은 변경되어도 리렌더링 필요가 없음, 데이터만 저장
  // 리액트에서 리렌더링될 필요가 없고, 브라우저에서 처리해줌
  // const [step, setStep] = useState(1);
  const step = useRef(1); // {current : 1} 반환
  // 별도의 setter 함수 없음, 조작하기 위해 step.current 에 값을 지정하기만 하면 됨
  // 값이 변경되어도 렌더링이 필요가 없지만 언젠가는 값을 사용해야하는 경우 useRef 사용

  const handleDown = () => {
    // setCount(count - step);
    countDispatch({ type: "DOWN", value: step.current });
  };

  const handleUp = () => {
    // setCount(count + step);
    countDispatch({ type: "UP", value: step.current });
  };

  const handleReset = (event) => {
    // setCount(initCount);
    countDispatch({ type: "RESET", value: initCount });
  };

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* 비제어 컴포넌트 value, onChange 사용, 리액트에서 제어하지 않음 */}
      <input
        id="step"
        type="number"
        style={{ width: "40px" }}
        defaultValue={step.current}
        // 브라우저에서 사용하는 input 요소는 그대로, 그리고 값이 변경되는 경우 변경된 값을 적용하는 코드만 지정
        onChange={(e) => (step.current = Number(e.target.value))}
      />
      <Button type="button" color="red" onClick={handleDown}>
        -
      </Button>
      <Button type="button" onClick={handleReset}>
        {initCount}
      </Button>
      <Button type="button" color="blue" onClick={handleUp}>
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

function counterReducer(state, action) {
  let newState;

  switch (action.type) {
    case "DOWN":
      newState = state - action.value;
      break;
    case "UP":
      newState = state + action.value;
      break;
    case "RESET":
      newState = 0;
      break;
    default:
      newState = state;
  }

  return newState;
}

export default Counter;
