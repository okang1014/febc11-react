// Array.prototype.forEach(callback); 배열의 각 요소에 대해 콜백 함수를 실행
// 반환값은 없음 (return 값이 없음)

// 배열 요소 중의 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// 내 코드 if 문 ver
array.forEach((item, index) => {
  if (item % 2 === 1) {
    result += item;
  }
});

// 내 코드 삼항 연산자 ver
// array.forEach(item => item % 2 === 1 ? result += item : result);

console.log(result);