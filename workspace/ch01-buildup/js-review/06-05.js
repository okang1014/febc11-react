// 06-04.js 복사

function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);

      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생'));
    }, 1000);
  });
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

// ESC2017 에 추가된 문법
// async 는 test() 가 비동기로 실행되는 것처럼 실행
async function test() {
  // await 함수를 실행하면 동기함수처럼 실행됨
  // 동기 함수를 호출하는 방식 그대로 작성하는 것이 Promise ... then ... catch 보다 가독성이 좋음
  const f1Result = await f1();
  const result = await f2(f1Result); // 내부적으로는 Promise ... then ... catch 를 실행
  console.log(`8. ${result}`);
  // 내부적으로 Promise 를 return 한다
  // 동기 처리의 error 처리는 try{} catch{} 사용
  // 주로 API 를 통해 data 를 불러오는 경우 많이 사용됨
}

console.log('1. 테스트 시작.');
test(); // .then() 을 사용하거나 await 를 사용할 수 있음. 함수의 리턴값이 결국 Promise 객체이기 때문에
console.log('9. 테스트 완료.');