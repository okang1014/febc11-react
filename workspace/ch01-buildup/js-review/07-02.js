// Array.prototype.map(callback): 배열의 각 요소에 대해 콜백 함수 실행
// 호출되는 콜백 함수가 반환하는 값을 요소로 하는 "새로운 배열"을 반환

// 배열 요소 중의 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// var newArray = array.map((number) => {
//   if (number % 2 !== 0) { // 홀수면 그 값을 그대로 return
//     return number;
//   } else {
//     return 0;
//   }
// });

// num % 2 결과 값이 1 이면 true, 0 이면 false
var newArray = array.map(number => number % 2 ? number : 0);

newArray.forEach(number => result += number)

console.log(result); // 25