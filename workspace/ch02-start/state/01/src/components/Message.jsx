import { useState } from "react";

// 2. 상태 모듈 변수로 선언 : 모듈 함수에서 변수를 선언하면 상태값이 함수 실행될 때마다 초기화되지 않음
// 컴포넌트가 리렌더링되더라도 모듈 스코프의 변수는 초기화되지 않음
// let count = 0;

// 다만 모듈 스코프의 변수 상태값은 모듈 전체가 공유하고 있기 때문에 동일한 컴포넌트를 다회 사용하게 된다면, 다수의 컴포넌트가 상태값을 공유하게 됨

export default function Message() {
  console.log("message rerender");

  // 1. 상태 지역변수로 선언 : 이벤트 함수 내부에서 상태값을 적용하게 된다면 함수가 호출될 때마다(상태가 변경될 때마다) count 값은 초기화된다
  // let count = 0;

  // 3. 상태 state 로 관리 : 동일한 컴포넌트를 다수회 사용하게 되어도, 컴포넌트별로 state 가 분리되어 있어서, 각자의 컴포넌트 state 에 영향을 미치지 않음
  const [count, setCount] = useState(0);

  // 최초 한 번만 useState 로 초기화
  // 이후에는 변경된 상태값 유지
  // msg 는 입력한 값
  // setMsg 초기 값은 빈 문자열

  const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    // event.target 은 event 가 발생한 요소
    const inputMsg = event.target.value;
    // setMsg 함수를 통해 state 를 변경시킴 -> 상태가 변경이 감지되는 즉시 화면 리렌더링(변경된 부분만)
    setMsg(inputMsg);
    setCount(count + 1);

    // 다수의 상태 변경이 있어서 상태변경이 있을 때마다 리렌더링하는 것이 아니라, 다수의 상태 변경을 감지한 이후, 최종 한 번만 렌더링 진행
  };

  return (
    <div>
      {/* change event 발생 시 handleChange 함수 실행 */}
      <input type="text" onChange={handleChange} />
      <br />
      <span>입력 메세지 : {msg}</span>
      <br />
      <span>입력 횟수 : {count}</span>
    </div>
  );
}
