import { useEffect, useReducer, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = "0" }) {
  console.log("Component Rerender");
  const initCount = Number(children);

  const [count, countDispatch] = useReducer(counterReducer, initCount); // useReducer 훅 사용, 첫 번째 매개변수는 state 를 변경하는 함수, 두 번째 매개변수는 초기 상태값
  // counterReducer 는 setState 처럼 직접 호출해서 상태 변경을 하지 않음
  // countDispatch 는 내부적으로 counterReducer 를 호출
  // 컴포넌트 내에서는 상태 관리 action 만 reducer 에 전달
  const [step, setStep] = useState(1);

  const handleDown = () => {
    // setCount(count - step);
    countDispatch({ type: "DOWN", value: step });
  };

  const handleUp = () => {
    // setCount(count + step);
    countDispatch({ type: "UP", value: step });
  };

  const handleReset = (event) => {
    // setCount(initCount);
    countDispatch({ type: "RESET", value: initCount });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [step]);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input
        id="step"
        type="number"
        style={{ width: "40px" }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
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

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 로직을 컴포넌트 내부에서 직접 구현하는 것이 않고 외부에서 구현
// state: 이전 상태값이 넘어옴(useReducer 가 내부적으로 관리, 이전의 리턴값이 다음의 state 값으로 전달)
// action: 동작을 정의한 객체(개발자 의도 작성 코드, 일반적으로 많이 사용되는 속성이 type 에 동작을, value 속성에 값을 지정)
// return: 새로운 상태

function counterReducer(state, action) {
  // Counter 에서 counterReducer 를 호출할 때 count 상태, action{type: 'UP', 그리고 value: 1 를 전달}
  // 현재 상태로 지정한 동작을 하도록 지시
  let newState; // 새로운 상태

  // case 이름은 개발자 작성 코드
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
      newState = state; // 아무것도 전달받지 않는 경우, 기존의 상태값 지정
  }

  return newState;
}

export default Counter;
