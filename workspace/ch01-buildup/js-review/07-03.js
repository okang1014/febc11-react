// Array.prototype.find(callback): 배열의 각 요소에 대해 콜백 함수 실행
// true 를 반환하는 첫번째 콜백 함수에 전달된 요소를 반환
// true 를 반환하는 콜백 함수가 없는 경우, undefined 반환

// 배열 요소 중 2와 3의 최소공배수 구하기
var array = [2, 4, 7, 8, 9, 5, 3, 1, 6, 10];
// sort 는 기본적으로 문자열을 기준으로 정렬

// 음수 값을 반환하는 경우 a, b 정렬
// 양수 값을 반환하는 경우 b, a 정렬
// 0 을 반환하는 경우 그대로
array.sort((a, b) => a - b);

console.log(array);

var result = 0;

// array.find(num => {
//   if (num % 2 === 0 && num % 3 === 0) {
//     result = num;
//   }
// });

// 함수의 조건을 만족하는 하나의 요소를 반환
// num % 2 === 0 && num % 3 === 0 의 평가 값이 true 를 반환하는 최초의 값을 return
var result = array.find(num => num % 2 === 0 && num % 3 === 0);


console.log(result); // 6