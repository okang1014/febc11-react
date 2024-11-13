// 06-02.js 복사

function f1(callback) {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`4. f1 작업 종료.`);
    // 작업이 끝나는 시점에서 매개변수로 전달받은 함수를 실행
    callback(`f1의 결과물`); // test() 가 전달한 함수 () => {} 실행
  }, 1000);
}

function f2(f1Result, callback) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);

  setTimeout(() => {
    // ......
    console.log(`7. f2 작업 종료.`);
    callback(`최종 결과물`);
  }, Math.random() * 2000);
}

function test() {
  // f1, f2 에 함수를 매개변수로 전달 => 업무가 끝나는대로 매개변수에 전달된 함수를 실행
  f1((f1Result) => { // f1 callback 에 인수 'f1의 결과물'을 매개변수로 전달
    f2(f1Result, (result) => { // f2 callback 에 인수 '최종 결과물'을 매개변수로 전달
      console.log(`8. ${result}`);
    })
  }); // return 값이 없기 때문에 함수 실행 결과값을 변수에 할당 X
}

console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');