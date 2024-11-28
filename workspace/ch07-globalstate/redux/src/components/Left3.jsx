import { useEffect } from "react";
import { useSelector } from "react-redux";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // useSelector() 훅으로 store 의 상태값 접근 가능(자동으로 store 의 상태를 구독 => 상태가 변경되면 화면이 리렌더링)
  // useSelector 는 counterReducer 의 실행 결과(상태값)를 반환하는 redux Hook
  // counterReducer 이 호출되어 반환된 값
  // count 값은 counterReducer 가 호출된 최초 값인 0 이 대입됨
  const count = useSelector((state) => state.count); // state 를 전달받고 state.count 를 반환

  // 만일 state 객체에 count 외에 다른 상태가 있고, state 자체를 전달받는다면, 다른 상태값이 변경되어도 state 전체를 return 받았기 때문에 새로운 상태로 간주, 리렌더링
  // state 전체를 구독하고 있기 때문에 state 외의 다른 상태가 변경되면 결국 state 가 변경된 것으로 간주됨
  // 전체 state 를 전달받기 보다, state 내부의 세부 상태 값을 받는 것이 좋음
  // 만일 컴포넌트 내부에서 state 내부의 다른 상태값을 사용하게 된다면, 한 번 더 useSelector 를 사용하여, store 에서 사용하고자 하는 상태값만 추출 => 불필요한 렌더링을 피해서 렌더링 최적화 가능
  // const count = useSelector((state) => state.anotherState);
  // anotherState 는 state 내부의 count 상태가 아닌 다른 상태 값

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
