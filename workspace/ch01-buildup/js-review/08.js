// Memoization
// 매개변수에 관계 없이 항상 동일한 결과가 반환되는 함수(순수 함수)라는 전제 하에 메모이제이션 적용 가능
// 함수 외부의 변경사항이 함수 내부에 영향을 미치지 않는 함수에만 memoization 적용 가능

// 지정한 수가 소수인지 여부를 반환
var isPrime = function (num) {
  console.time('소요 시간');
  console.log('소수 판별 시작.', num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1이 소수가 아니기 때문에 1인 경우는 false 로 시작, 그 외 값은 모두 소수로 시작

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
      break; // i 에 전달하는 값으로 나누어 떨어지는 경우 소수가 아니기 때문에 조건문 종료
    }
  }

  console.log('소수 판별 결과.', prime);
  console.timeEnd('소요 시간');
  return prime;
};

// var isPrime = function (num) {
//   // 캐시를 위한 코드
//   isPrime._cache = isPrime._cache || {};
//   // 캐시에 저장할 객체를 빈 객체로 저장

//   if (isPrime._cache[num] !== undefined) { // 캐시 되어있는 경우(cache hit)
//     // 캐시 되어 있는 경우, 캐시에 저장된 값을 그대로 출력
//     console.log('cache hit', num, isPrime._cache[num]);
//     return isPrime._cache[num];
//   } else { // 캐시 되어있지 않은 경우
//     // 소수 판별 코드 실행
//     return isPrime._cache[num] = isPrime2(num);
//   }
// };

// 지정한 함수에 memoization 기능 추가
function memo(fn) {
  return function (args) {
    fn._cache = fn._cache || {};

    if (fn._cache[args] !== undefined) {
      console.log('cache hit', args, fn._cache[args]);
      return fn._cache[args];
    } else {
      return fn._cache[args] = fn(args);
    }
  };
}

var isPrime = memo(isPrime); // memoization 기능 추가

isPrime(1);
isPrime(2);
isPrime(3);
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007); // 한 번 실행되는 시간이 1~2초 걸림
// 이러한 기능을 캐시로 추가한다면 조금 더 빨리 실행될 듯
isPrime(1000000007);
isPrime(1000000007);
