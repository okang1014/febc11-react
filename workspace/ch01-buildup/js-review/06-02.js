// 06-01.js 복사

function f1() {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`4. f1 작업 종료.`);
    return (`f1의 결과물`);
  }, 1000); // 1000 ms 뒤에 콜백 함수 실행
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`7. f2 작업 종료.`);
    return (`최종 결과물`);
  }, Math.random() * 2000); // Math.random() * 2000 ms 뒤에 콜백함수 실행
}

function test() {
  // f1 의 실행 결과를 f2 의 매개변수로 전달
  const f1Result = f1();
  const result = f2(f1Result);
  console.log(`8. ${result}`);
}

// 비동기 방식으로 코드 실행 
console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');