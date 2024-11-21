import { useMemo, useState } from "react";

// 지정한 수가 소수인지 여부를 반환
var isPrime = function (num) {
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // 소수 판별 코드
  let prime = num > 1;

  // for (let i = 2; i < num; i++) {
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
};

function App() {
  console.log("App 렌더링");
  // 초기값 세팅, 상태 변화에 따라 UI 가 변하기 때문에 useState 사용
  const [name, setName] = useState("GD");
  const [num, setNum] = useState(1);

  // const result = isPrime(num); // isPrime 함수 실행 결과 result 에 저장, true 또는 false 를 반환, 하지만 매번 소수 판별 함수가 실행
  const result = useMemo(() => isPrime(num), [num]); // num 값이 변경되면 소수 판별 함수 실행, 바로 이전 결과 값과 비교해서 실행
  // num 이 변경될 때마다 리렌더, 그렇지 않다면 memoization 된 값 반환

  return (
    <>
      <h1>05 useMemo - 함수의 반환값을 memoize</h1>
      <div>
        {/* 상태의 변경에 따라 화면이 변경되는 것이기 때문에 제어 컴포넌트로 지정*/}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* change 이벤트 변경 시, setter 함수로 state 값 변경, 그리고 event 가 발생한 요소의 값을 지정 */}
        가 좋아하는 숫자:
        <input
          type="number"
          min="1"
          max="1000000007"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <div>
          {name}가 좋아하는 숫자 {num}: 소수가
          {result ? (
            <span style={{ color: "blue" }}> 맞습니다.</span>
          ) : (
            <span style={{ color: "red" }}> 아닙니다.</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
