let callCount = 0;

function f1() {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);
  // ......
  callCount = 1;
  console.log(`4. f1 작업 종료.`);
  return (`f1의 결과물`);
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);
  // ......
  console.log(`7. f2 작업 종료.`);
  return (`최종 결과물`);
}

function test() {
  // f1 의 실행 결과를 f2 의 매개변수로 전달
  const f1Result = f1();
  console.log(callCount);
  const result = f2(f1Result);
  console.log(`8. ${result}`);
}

// 동기 방식으로 코드 실행 - 코드의 흐름 순서로 실행됨
console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');