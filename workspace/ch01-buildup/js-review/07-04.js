// Array.prototype.filter(callback): 배열의 각 요소에 대해 콜백 함수 실행
// true 를 반환하는 콜백 함수에 전달된 요소를 배열로 모아서 반환
// true 를 반환하는 콜백 함수가 없는 경우, 빈 배열 반환

// 배열 요소 중 홀수의 합계 구하기
var array = [2, 4, 7, 8, 9, 5, 3, 1, 6, 10];

var result = 0;

// 2 로 나눴을 때 0 이 아닌 값(true)를 반환하는 요소만 필터링
array.filter(num => num % 2 !== 0).forEach(num => result += num);

console.log(result); // 25