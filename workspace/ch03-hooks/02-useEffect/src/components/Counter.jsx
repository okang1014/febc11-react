import { useEffect, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

// HTML 에서 요소를 꺼내게 된다면(elemet 의 값, input 의 value 등) 대부분 string 이라고 생각하면 됩니다.

Counter.propTypes = {
  children: PropTypes.string,
};

// Counter 컴포넌트에 children props 를 전달하지만, 만일 아무것도 전달받지 않는 경우, 0 으로 기본값 지정
function Counter({ children = "0" }) {
  console.log("Component Rerender");

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

  // 1초 후에 자동으로 값 한 번만 증가
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);
  // 하지만 위의 경우 state 값이 변경됨에 따라 리렌더링 반복 실행, 다시 컴포넌트를 불러옴

  // 마운트된 후에 한 번만 값 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependecies 에 빈 배열을 지정하면 컴포넌트가 마운트된 후에 한 번만 호출(업데이트 시 호출 X)"
  //   );
  // }, []);
  // 두 번째 dependency 에 빈 배열을 전달하면 마운트 단계에서만 실행

  // 마운트된 후와 업데이트 이후 값 증가
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependecies 에 빈 배열을 지정하면 컴포넌트가 마운트된 후에 한 번 호출, 그리고 업데이트된 이후에 호출"
  //   );
  // });
  // 아무 매개변수도 전달하지 않는 경우, 마운트 + 업데이트 단계에서 실행, useEffect 사용하기 전과 동일하게 작동

  // dependencies 에 값을 지정한 경우
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     "dependecies 에 값을 지정하면 컴포넌트가 업데이트 될 때 지정한 값 중 하나라도 수정되었을 경우 호출됨"
  //   );
  // }, [step]);
  // dependency 배열에 주로 state 값을 지정, 상태가 변경된 경우에만 새로 렌더링 가능
  // 리렌더링 된 이전과 이후의 dependency 값을 비교한 이후, 변경되었다면 setup 함수 호출
  // 만일 dependency 에 이벤트 핸들러 함수를 추가하는 경우, 컴포넌트가 렌더링되는 과정에서 매번 동일한 내용의 새로운 함수(객체)가 생성되어 계속 리렌더링됨

  // useEffect(() => {
  //   console.log("setup 함수 호출");
  // }, []);
  // dependency 가 없으면 mount, update 시 호출
  // dependency 에 빈배열이면 mount 시에만 호출
  // dependency 에 값을 지정하면, 해당 값이 변경된 경우에만 호출

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // cleanup 함수가 없는 경우, 순수함수가 아니기 때문에 strict mode 를 통해 미리 확인, 더 안전한 코드를 작성할 수 있도록 유도
  }, [step]);

  /* useEffect(() => {
    console.log(step, "setup 함수 호출");
    const timer = setInterval(() => {
      console.log(step, new Date());
      // 클로저 생성, 함수가 생성될 당시에 참조한 변수(최초 step 값인 1) 값을 계속 참조하고 있음. 따라서 step 값을 변경하여도 계속 동일한 값을 참조하게 됨
      // 만일 dependency 에 step 을 추가하고, step 을 변경하는 경우, 기존 step 값과 변경된 step 이 계속 누적됨
      // 따라서 cleanup 함수가 필요
    }, 1000);
    // 특정 시간(1초)을 간격으로 반복적으로 호출
    return () => {
      console.log(step, "cleanup 함수 호출");
      clearInterval(timer);
    }; // cleanup 함수
  }, [step]); */
  // mount 단계에서 딱 한번만 호출

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
