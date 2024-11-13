// 06-03.js 복사

function f1() {
  // new Promise 생성자 함수를 통해 promise 객체를 생성
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);

      // resolve - 작업 성공 시 실행 함수, bbb - 작업 실패 시 실행 함수
      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생')); // 새로운 에러 객체를 생성하여 반환
    }, 1000);
  }); // Promise 객체 생성, () 에 실행 예정인 함수를 추가  
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
      // reject(new Error('에러 발생'));
    }, Math.random() * 2000);
  })
}

// Promise 기본 사용법 then().catch()
function test() {
  // 함수를 호출하면 Promise 객체 생성
  f1()
    .then(f2) // f2 자체를 콜백 함수로 지정
    .then(result => console.log(`8. ${result}`))
    .catch((err) => console.error(err)); // f1, f2 에서 발생하는 모든 오류를 catch 가능

  // resolve 호출 시 then 에 있는 함수 호출
  // reject 호출 시 catch 에 있는 함수 호출

  // f1((f1Result) => {
  //   f2(f1Result, (result) => {
  //     console.log(`8. ${result}`);
  //   })
  // });
}

console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');