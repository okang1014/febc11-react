// Array.prototype.reduce(callback[, initialValue]): 배열의 각 요소에 대해 콜백 함수 실행
// callback(accumulator - 누적값, currentValue - 현재값, currentIndex - 인덱스, array - 원본 배열)
// initialValue 가 주어지면 누적값의 초기값으로 사용
// initialValue 가 주어지지 않으면 배열의 첫번째 요소가 누적값의 초기값으로 사용, 두 번째 요소부터 callback 함수 호출

// 배열 요소 중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// sum = 0, num = 1 로 시작, 두 값을 더한 결과값이 다음 과정에서 sum 이 됨
// sum = 1, num = 2 의 합계, 3
// sum = 3, num = 3 의 합계, 6
// sum = 6, num = 4 의 합계, 10
// ...
var result = array.reduce((sum, num) => {
  return sum + num;
}, 0);

console.log(result); // 55


var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // num 이 홀수인 경우, sum 에 누적해서 반환
  } else {
    return sum; // num 이 짝수인 경우, sum 을 그대로 반환
  }
}, 0)

console.log(result); // 25

var result = array.reduce((sum, num) => {
  // num % 2 값이 1인 경우, sum + num 의 값 반환, 0인 경우 sum 반환
  // 삼항 연산자를 사용하면 간단하게 표시 가능, 하지만 직관성이 떨어짐
  return num % 2 ? (sum + num) : sum;
}, 0)

console.log(result); // 25

var result = array.reduce((sum, num) => num % 2 ? (sum + num) : sum, 0);

console.log(result); // 25

// num % 2 && num 은 논리곱 연산자로 둘 중 하나라도 false 인 경우(num % 2 이 0 인 경우는 짝수) 바로 sum 에 0 을 더함
// 반대로 num % 2 값이 1인 경우, && 다음의 num 을 sum 에 더함
// 즉 둘 중 하나라도 false 가 된다면 false 의 값을 즉시 반환
// 둘 다 true 인 경우, 최종적으로 true 임을 결정짓는 값 반환 
var result = array.reduce((sum, num) => sum += (num % 2 && num), 0);

console.log(result); // 25