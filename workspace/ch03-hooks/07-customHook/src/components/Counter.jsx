import { useRef } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import useCounter from "@hooks/useCounter";

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = "0" }) {
  const initCount = Number(children);
  const step = useRef(1);

  // useCounter 에서 상태와 setter 함수를 가지고 있음
  // 직접 state 를 사용하지 않음
  // up down reset 내부적으로 useState 를 사용한다
  const { count, up, down, reset } = useCounter(initCount);
  // useCounter 함수 호출 결과 구조 분해 할당

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* 비제어 컴포넌트 value, onChange 사용, 리액트에서 제어하지 않음 */}
      <input
        id="step"
        type="number"
        style={{ width: "40px" }}
        defaultValue={step.current}
        onChange={(e) => (step.current = Number(e.target.value))}
      />
      <Button type="button" color="red" onClick={() => down(step.current)}>
        -
      </Button>
      <Button type="button" onClick={() => reset(initCount)}>
        {initCount}
      </Button>
      <Button type="button" color="blue" onClick={() => up(step.current)}>
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
