import { useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

// HTML 에서 요소를 꺼내게 된다면(elemet 의 값, input 의 value 등) 대부분 string 이라고 생각하면 됩니다.

Counter.propTypes = {
  children: PropTypes.string,
};

// Counter 컴포넌트에 children props 를 전달하지만, 만일 아무것도 전달받지 않는 경우, 0 으로 기본값 지정
function Counter({ children = "0" }) {
  const initCount = Number(children); // number type 으로 변환
  const [count, setCount] = useState(initCount); // 상위 요소로부터 전달 받은 children 요소를 초기 상태값으로 지정
  const [step, setStep] = useState(1); // 증감치의 최초 상태

  // count 를 증감치만큼 증가하도록 지정
  const handleDown = () => {
    setCount(count - step);
  };

  const handleUp = () => {
    setCount(count + step);
  };

  const handleReset = (event) => {
    setCount(initCount);
  };

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      {/* input 요소에 value 지정하면 리액트에서 해당 값을 제어함(제어 컴포넌트), 
      value 속성 미지정 시 브라우저 기본으로 동작(비제어 컴포넌트) */}
      {/* input 태그에 value(초기값) 를 추가하면 onChange 속성 필수 */}
      <input
        id="step"
        type="number"
        style={{ width: "40px" }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        // input 요소의 값의 type 은 string, 따라서 type 변환을 해주어야함
      />
      {/* 제어 컴포넌트를 사용하는 경우, state, setState 와 value, onChange event 로 상태 제어 가능 */}
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

export default Counter;
