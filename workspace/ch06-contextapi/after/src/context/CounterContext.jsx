// counter context API 전용 파일 생성

import PropTypes from "prop-types";
import { createContext, useState } from "react";

// 1. Context 객체 생성
const CounterContext = createContext();

CounterProvider.propTypes = {
  children: PropTypes.node,
};

// 3. Provider 컴포넌트 작성, export(named export)
export function CounterProvider({ children }) {
  // 4. 데이터, 상태, 상태를 관리하는 함수를 정의

  // 상태
  const [count, setCount] = useState(10);

  // 상태 변경하는 함수
  const countUp = function (step) {
    setCount(count + step);
  };
  const reset = function (step) {
    setCount(0);
  };
  const countDown = function (step) {
    setCount(count - step);
  };

  // 하위 컴포넌트에 전달할 객체
  const values = {
    // 상태 관련 props
    state: { count },
    // 상태 관리 관련 props
    actions: { countUp, reset, countDown },
    hello: "counter",
  };

  // 5. Context 객체의 Provider 로 자식 컴포넌트를 감싸서 return
  // value 속성에 전달할 Context 값 지정
  return (
    <CounterContext.Provider value={values}>{children}</CounterContext.Provider>
  );
}

// 반환 값 => CounterProvider 컴포넌트 사이에 App 을 삽입하면, App 하위의 컴포넌트가 모두 value 를 사용할 수 있음
// 전역 상태 관리 : 여러 컴포넌트가 사용할 상태를 사용할 수 있도록 just like 보급 창고
// <CounterProvider>
//   <App>
// <CounterProvider>

// 2. Context 객체를 export
export default CounterContext;
